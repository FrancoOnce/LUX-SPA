import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Check, MessageCircle, ShieldCheck, X } from 'lucide-react'
import { useQuote } from '../../context/QuoteContext'
import { useMultiStepForm, type StepDefinition } from '../../hooks/useMultiStepForm'
import { quoteSchema, STEP_FIELDS } from '../../lib/quote'
import { buildQuoteMessage, buildWhatsAppUrl, sendQuoteToApi } from '../../lib/whatsapp'
import { QUOTE_API_ENDPOINT } from '../../config'
import { packages } from '../../data/packages'
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

const stepVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -48 : 48, opacity: 0 }),
}

type ApiStatus = 'idle' | 'sending' | 'sent' | 'error'

export function QuoteWizard() {
  const { closeQuote, presetPackageId, presetAddons } = useQuote()
  const [submitted, setSubmitted] = useState(false)
  const [waUrl, setWaUrl] = useState('')
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle')
  const panelRef = useRef<HTMLDivElement>(null)

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
    defaultValues: {
      nombre: '',
      whatsapp: '',
      email: '',
      eventType: '',
      date: '',
      location: '',
      packageId: presetPackageId ?? DEFAULT_PACKAGE_ID,
      addons: presetAddons,
    },
  })

  const stepper = useMultiStepForm(STEPS)

  useEffect(() => {
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
  }, [closeQuote])

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

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Cotizador de eventos"
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeQuote}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Cerrar cotizador"
      />

      <motion.div
        ref={panelRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 48, scale: 0.97 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-midnight-900 shadow-2xl outline-none sm:max-h-[90vh] sm:rounded-3xl"
      >
        {submitted ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/20 text-gold-300"
            >
              <Check className="h-8 w-8" strokeWidth={3} />
            </motion.span>
            <h2 className="mt-5 font-display text-2xl font-bold text-white">¡Tu cotización está lista!</h2>
            <p className="mt-2 max-w-sm text-sm text-zinc-400">
              Abrimos WhatsApp con tu resumen completo. Si no se abrió automáticamente, usa el botón de abajo.
            </p>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-base font-bold text-midnight-950 transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" /> Enviar por WhatsApp
            </a>

            {apiStatus !== 'idle' && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                {apiStatus === 'sending' && 'Registrando tu solicitud...'}
                {apiStatus === 'sent' && 'Solicitud registrada en nuestro sistema.'}
                {apiStatus === 'error' && 'Envío por WhatsApp disponible como respaldo.'}
              </p>
            )}

            <button
              onClick={closeQuote}
              className="mt-4 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
            >
              Volver al sitio
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex max-h-[94vh] flex-col sm:max-h-[90vh]" noValidate>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-400">
                  Cotiza tu evento
                </p>
                <h2 className="font-display text-lg font-bold text-white">{stepper.current.title}</h2>
                <p className="text-xs text-zinc-500">{stepper.current.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={closeQuote}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:text-white"
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
                            ? 'border-gold-400 bg-gold-400 text-midnight-950'
                            : isDone
                              ? 'border-gold-500/40 bg-gold-500/15 text-gold-300'
                              : 'border-white/15 bg-white/5 text-zinc-500'
                        }`}
                      >
                        {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : index + 1}
                      </button>
                      <span
                        className={`hidden text-[11px] font-medium sm:block ${
                          isActive ? 'text-white' : 'text-zinc-500'
                        }`}
                      >
                        {step.title}
                      </span>
                    </li>
                  )
                })}
              </ol>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                  animate={{ width: `${stepper.progress}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait" custom={stepper.direction}>
                <motion.div
                  key={stepper.current.id}
                  custom={stepper.direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
              {!stepper.isFirst ? (
                <button
                  type="button"
                  onClick={stepper.back}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25"
                >
                  <ArrowLeft className="h-4 w-4" /> Atrás
                </button>
              ) : (
                <span className="text-xs text-zinc-500">Paso {stepper.currentStep + 1} de {stepper.totalSteps}</span>
              )}

              {stepper.isLast ? (
                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-midnight-950 transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  <MessageCircle className="h-4 w-4" /> Enviar cotización
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-6 py-3 text-sm font-bold text-midnight-950 transition-transform hover:scale-[1.02]"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}