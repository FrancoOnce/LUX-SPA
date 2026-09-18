import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Plus, X, CircleCheck } from 'lucide-react'
import { getIcon } from '../lib/icons'
import { useQuote } from '../context/QuoteContext'
import type { Service } from '../types'

interface ServiceModalProps {
  service: Service
  onClose: () => void
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const { presetAddons, toggleAddon } = useQuote()
  const isSelected = presetAddons.includes(service.id)
  const Icon = getIcon(service.icon)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles de ${service.name}`}
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Cerrar"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/10 bg-midnight-900 shadow-2xl sm:rounded-3xl"
      >
        <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${service.accent}`}>
          <div className="absolute inset-0 bg-black/25" />
          <Icon className="relative h-16 w-16 text-white drop-shadow-lg" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
            aria-label="Cerrar detalles"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400/80">
            {service.tagline}
          </span>
          <h3 className="mt-1 font-display text-2xl font-bold text-white">{service.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.description}</p>

          <ul className="mt-5 space-y-2.5">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">Precio desde</p>
              <p className="font-display text-2xl font-bold text-gold-300">S/ {service.price}</p>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-zinc-400">
              <Clock className="h-4 w-4" /> {service.minDuration}
            </p>
          </div>

          <button
            onClick={() => toggleAddon(service.id)}
            aria-pressed={isSelected}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-base font-bold transition-all ${
              isSelected
                ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-midnight-950'
                : 'bg-gradient-to-r from-gold-400 to-gold-600 text-midnight-950 hover:shadow-glow'
            }`}
          >
            {isSelected ? (
              <>
                <CircleCheck className="h-5 w-5" /> Añadido a tu cotización
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" /> Incluir en mi cotización
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}