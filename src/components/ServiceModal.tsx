import { useEffect, useState } from 'react'
import { Clock, Plus, X, CircleCheck } from 'lucide-react'
import { getIcon } from '../lib/icons'
import { getBasket, setBasket, subscribe, type Basket } from '../lib/basket'
import type { Service } from '../types'

interface ServiceModalProps {
  service: Service
  onClose: () => void
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [basket, setBasketState] = useState<Basket>(() => getBasket())
  const [leaving, setLeaving] = useState(false)
  useEffect(() => subscribe(setBasketState), [])
  const isSelected = basket.addons.includes(service.id)
  const Icon = getIcon(service.icon)

  const beginClose = () => setLeaving(true)

  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(onClose, 260)
    return () => window.clearTimeout(timer)
  }, [leaving, onClose])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') beginClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [])

  const toggleAddon = () => {
    const addons = basket.addons
    setBasket({
      addons: addons.includes(service.id)
        ? addons.filter((item) => item !== service.id)
        : [...addons, service.id],
    })
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={`Detalles de ${service.name}`} className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <button
        type="button"
        onClick={beginClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${leaving ? 'animate-fade-out' : 'animate-fade-in'}`}
        aria-label="Cerrar"
      />

      <div
        role="presentation"
        className={`relative z-10 w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/10 bg-night-900/95 shadow-2xl backdrop-blur-2xl sm:rounded-3xl ${
          leaving ? 'animate-zoom-out' : 'animate-zoom-in'
        }`}
      >
        <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${service.accent}`}>
          <div className="absolute inset-0 bg-black/25" />
          <Icon className="relative h-16 w-16 text-white drop-shadow-lg" />
          <button
            type="button"
            onClick={beginClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
            aria-label="Cerrar detalles"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-300">
            {service.tagline}
          </span>
          <h3 className="mt-1 font-display text-2xl font-bold text-white">{service.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-beige-300">{service.description}</p>

          <ul className="mt-5 space-y-2.5">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-beige-200">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-beige-300">Precio desde</p>
              <p className="font-display text-2xl font-bold text-purple-300">S/ {service.price}</p>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-beige-300">
              <Clock className="h-4 w-4" /> {service.minDuration}
            </p>
          </div>

          <button
            type="button"
            onClick={toggleAddon}
            aria-pressed={isSelected}
            className="press mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3.5 text-base font-bold text-white transition-all hover:shadow-glow-warm"
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
      </div>
    </div>
  )
}