import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Check, MessageCircle, ShieldCheck, X } from 'lucide-react'
import { useMultiStepForm, type StepDefinition } from '../../lib/useMultiStepForm'
import { quoteSchema, STEP_FIELDS } from '../../lib/quote'
import { buildQuoteMessage, buildWhatsAppUrl, sendQuoteToApi } from '../../lib/whatsapp'
import { QUOTE_API_ENDPOINT } from '../../config'
import { packages } from '../../data/packages'
import { getBasket } from '../../lib/basket'
import type { QuoteFormData } from '../../types'
import { StepContact } from './StepContact'
import { StepEvent } from './StepEvent'
import { StepServices } from './StepServices'
import { StepSummary } from './StepSummary'

const STEPS: StepDefinition[] = [
  { id: 'contacto', title: 'Tus datos', subtitle: '¿Cómo te contactamos?' },
  { id: 'evento', title: 'Tu evento', subtitle: 'Cuéntanos los detalles' },
  { id: 'servicios', title: 'Personaliza', subtitle: 'Arma tu experiencia' },
  { id: 'resumen', title: 'Resumen', subtitle: 'Revisa y envía' },
]

const DEFAULT_PACKAGE_ID = packages.find((pkg) => pkg.recommended)?.id ?? packages[0].id

type ApiStatus = 'idle' | 'sending' | 'sent' | 'error'

function buildDefaultValues(): QuoteFormData {
  const basket = getBasket()
  return {
    nombre: '',
    whatsapp: '',
    email: '',
    eventType: '',
    date: '',
    location: '',
    packageId: basket.packageId ?? DEFAULT_PACKAGE_ID,
    addons: [...basket.addons],
  }
}

export function QuoteWizard() {
  const [isOpen, setIsOpen] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [waUrl, setWaUrl] = useState('')
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle')
  const panelRef = useRef<HTMLDivElement>(null)

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
    defaultValues: buildDefaultValues(),
  })

  const stepper = useMultiStepForm(STEPS)

  const closeQuote = useCallback(() => setLeaving(true), [])

  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => {
      setLeaving(false)
      setIsOpen(false)
    }, 260)
    return () => window.clearTimeout(timer)
  }, [leaving])

  useEffect(() => {
    const onOpen = () => {
      form.reset(buildDefaultValues())
      setSubmitted(false)
      setApiStatus('idle')
      setLeaving(false)
      setIsOpen(true)
    }
    window.addEventListener('spa:open-quote', onOpen)
    return () => window.removeEventListener('spa:open-quote', onOpen)
  }, [form])

  useEffect(() => {
    if (!isOpen) return
    panelRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeQuote()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeQuote])

  const handleNext = async () => {
    const fields = STEP_FIELDS[stepper.currentStep]
    const valid = fields.length === 0 || (await form.trigger(fields, { shouldFocus: true }))
    if (valid) stepper.next()
  }

  const onSubmit = form.handleSubmit(async (values) => {
    const message = buildQuoteMessage(values)
    const url = buildWhatsAppUrl(message)
    setWaUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')

    if (QUOTE_API_ENDPOINT) {
      setApiStatus('sending')
      const ok = await sendQuoteToApi(QUOTE_API_ENDPOINT, values)
      setApiStatus(ok ? 'sent' : 'error')
    }
    setSubmitted(true)
  })

  const renderStep = () => {
    switch (stepper.current.id) {
      case 'contacto':
        return <StepContact form={form} />
      case 'evento':
        return <StepEvent form={form} />
      case 'servicios':
        return <StepServices form={form} />
      default:
        return <StepSummary form={form} />
    }
  }

  if (!isOpen) return null

  return (
    <div role="dialog" aria-modal="true" aria-label="Cotizador de eventos" className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        onClick={closeQuote}
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm ${leaving ? 'animate-fade-out' : 'animate-fade-in'}`}
        aria-label="Cerrar cotizador"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative z-10 flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-night-900/95 shadow-2xl outline-none backdrop-blur-2xl sm:max-h-[90vh] sm:rounded-3xl ${
          leaving ? 'animate-sheet-out' : 'animate-sheet-in'
        }`}
      >
        {submitted ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <span className="flex h-16 w-16 animate-fade-up items-center justify-center rounded-full bg-purple-500/20 text-purple-300">
              <Check className="h-8 w-8" strokeWidth={3} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-white">¡Tu cotización está lista!</h2>
            <p className="mt-2 max-w-sm text-sm text-beige-300">
              Abrimos WhatsApp con tu resumen completo. Si no se abrió automáticamente, usa el botón de abajo.
            </p>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-base font-bold text-night-950 transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" /> Enviar por WhatsApp
            </a>

            {apiStatus !== 'idle' && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-beige-300">
                <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
                {apiStatus === 'sending' && 'Registrando tu solicitud...'}
                {apiStatus === 'sent' && 'Solicitud registrada en nuestro sistema.'}
                {apiStatus === 'error' && 'Envío por WhatsApp disponible como respaldo.'}
              </p>
            )}

            <button
              type="button"
              onClick={closeQuote}
              className="mt-4 text-sm font-semibold text-beige-300 transition-colors hover:text-white"
            >
              Volver al sitio
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex max-h-[94vh] flex-col sm:max-h-[90vh]" noValidate>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-purple-300">
                  Cotiza tu evento
                </p>
                <h2 className="font-display text-lg font-bold text-white">{stepper.current.title}</h2>
                <p className="text-xs text-beige-300">{stepper.current.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={closeQuote}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-beige-200 transition-colors hover:text-white"
                aria-label="Cerrar cotizador"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 pt-5">
              <ol className="flex items-center justify-between gap-1" aria-label="Progreso de la cotización">
                {STEPS.map((step, index) => {
                  const isDone = index < stepper.currentStep
                  const isActive = index === stepper.currentStep
                  const clickable = index < stepper.currentStep
                  return (
                    <li key={step.id} className="flex flex-1 flex-col items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => clickable && stepper.goTo(index)}
                        disabled={!clickable}
                        aria-current={isActive ? 'step' : undefined}
                        aria-label={`Paso ${index + 1}: ${step.title}`}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                          isActive
                            ? 'border-orange-400 bg-gradient-to-r from-orange-500 to-red-500 text-white'
                            : isDone
                              ? 'border-orange-400/40 bg-orange-500/15 text-orange-300'
                              : 'border-white/15 bg-white/5 text-beige-300'
                        }`}
                      >
                        {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : index + 1}
                      </button>
                      <span
                        className={`hidden text-[11px] font-medium sm:block ${
                          isActive ? 'text-white' : 'text-beige-300'
                        }`}
                      >
                        {step.title}
                      </span>
                    </li>
                  )
                })}
              </ol>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-red-500 transition-all duration-500 ease-out"
                  style={{ width: `${stepper.progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div key={stepper.current.id} className={stepper.direction > 0 ? 'animate-slide-step' : 'animate-slide-step-left'}>
                {renderStep()}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
              {!stepper.isFirst ? (
                <button
                  type="button"
                  onClick={stepper.back}
                  className="press inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25"
                >
                  <ArrowLeft className="h-4 w-4" /> Atrás
                </button>
              ) : (
                <span className="text-xs text-beige-300">
                  Paso {stepper.currentStep + 1} de {stepper.totalSteps}
                </span>
              )}

              {stepper.isLast ? (
                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="press inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-night-950 transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  <MessageCircle className="h-4 w-4" /> Enviar cotización
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="press group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-bold text-white shadow-glow-warm transition-transform hover:scale-[1.02]"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}