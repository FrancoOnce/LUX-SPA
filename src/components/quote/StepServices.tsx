import type { UseFormReturn } from 'react-hook-form'
import { Check, Crown, Plus } from 'lucide-react'
import type { QuoteFormData } from '../../types'
import { packages } from '../../data/packages'
import { services } from '../../data/services'
import { setBasket } from '../../lib/basket'
import { getIcon } from '../../lib/icons'
import { formatPrice } from '../../lib/format'

interface StepProps {
  form: UseFormReturn<QuoteFormData>
}

export function StepServices({ form }: StepProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form

  const packageId = watch('packageId')
  const addons = watch('addons') ?? []

  const handlePackage = (id: string) => {
    setValue('packageId', id, { shouldDirty: true, shouldValidate: true })
    setBasket({ packageId: id })
  }

  const handleAddon = (id: string) => {
    const next = addons.includes(id) ? addons.filter((item) => item !== id) : [...addons, id]
    setValue('addons', next, { shouldDirty: true })
    setBasket({ addons: next })
  }

  return (
    <div className="space-y-7">
      <div>
        <h3 className="font-display text-base font-bold text-white">1. Elige tu paquete base</h3>
        <p className="mt-1 text-sm text-beige-300">Puedes cambiarlo cuando quieras.</p>
        {errors.packageId && (
          <p role="alert" className="mt-2 text-xs font-medium text-red-400">
            {errors.packageId.message}
          </p>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {packages.map((pkg) => {
            const selected = packageId === pkg.id
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => handlePackage(pkg.id)}
                aria-pressed={selected}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  selected
                    ? 'border-purple-400/60 bg-purple-400/10 shadow-glow'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-display font-bold text-white">
                    <Crown className={`h-4 w-4 ${selected ? 'text-purple-300' : 'text-beige-300'}`} />
                    {pkg.name}
                  </span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      selected ? 'border-purple-400 bg-purple-400 text-night-950' : 'border-white/20'
                    }`}
                  >
                    {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                </div>
                <p className="mt-1 text-xs text-beige-300">{pkg.tagline}</p>
                <p className="mt-2 text-sm font-bold text-purple-300">S/ {formatPrice(pkg.price)}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="font-display text-base font-bold text-white">2. Suma servicios adicionales</h3>
        <p className="mt-1 text-sm text-beige-300">
          {addons.length > 0 ? `${addons.length} servicio(s) seleccionado(s)` : 'Opcional, personaliza tu experiencia.'}
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = getIcon(service.icon)
            const selected = addons.includes(service.id)
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => handleAddon(service.id)}
                aria-pressed={selected}
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all ${
                  selected
                    ? 'border-purple-400/60 bg-purple-400/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    selected ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-white/10 text-beige-200'
                  }`}
                >
                  {selected ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-white">{service.name}</span>
                  <span className="block text-xs text-beige-300">S/ {formatPrice(service.price)}</span>
                </span>
                {!selected && <Plus className="h-4 w-4 shrink-0 text-beige-300" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}