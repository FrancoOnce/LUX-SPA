import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Check, Clock, Eye, Plus } from 'lucide-react'
import { services } from '../data/services'
import { SERVICE_CATEGORIES, type ServiceCategoryFilter } from '../data/categories'
import { getBasket, setBasket, subscribe, type Basket } from '../lib/basket'
import { getIcon } from '../lib/icons'
import { ServiceModal } from './ServiceModal'
import type { Service } from '../types'

export function Services() {
  const [activeFilter, setActiveFilter] = useState<ServiceCategoryFilter>('todos')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [basket, setBasketState] = useState<Basket>(() => getBasket())

  useEffect(() => subscribe(setBasketState), [])

  const filtered = useMemo(
    () => (activeFilter === 'todos' ? services : services.filter((service) => service.category === activeFilter)),
    [activeFilter],
  )

  const toggleAddon = (id: string) => {
    const addons = basket.addons
    setBasket({
      addons: addons.includes(id) ? addons.filter((item) => item !== id) : [...addons, id],
    })
  }

  return (
    <section id="servicios" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[22rem] w-[40rem] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-200">
            Catálogo de servicios
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Elige la experiencia que hará{' '}
            <span className="bg-gradient-to-r from-cream-100 via-beige-200 to-purple-400 bg-clip-text text-transparent">
              que todos hablen de tu evento
            </span>
          </h2>
          <p className="text-base leading-relaxed text-beige-300 sm:text-lg">
            Show y hora loca, fotografía 360°, efectos especiales y ambientación. Mezcla los
            servicios que quieras y cotiza al instante.
          </p>
        </div>

        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {SERVICE_CATEGORIES.map((category) => {
            const isActive = activeFilter === category.value
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setActiveFilter(category.value)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-glow-warm'
                    : 'bg-transparent text-beige-300 hover:text-white'
                }`}
                aria-pressed={isActive}
              >
                {category.label}
              </button>
            )
          })}
        </div>

        <div key={activeFilter} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => {
            const Icon = getIcon(service.icon)
            const isSelected = basket.addons.includes(service.id)
            return (
              <article
                key={service.id}
                className={`group flex animate-fade-up flex-col overflow-hidden rounded-2xl border bg-white/[0.04] backdrop-blur transition-colors ${
                  isSelected ? 'border-purple-400/60 shadow-glow' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${service.accent}`}>
                  <div className="absolute inset-0 bg-black/25" />
                  <Icon className="relative h-14 w-14 text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                  {isSelected && (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-night-950/90 px-2.5 py-1 text-xs font-bold text-cream-100">
                      <Check className="h-3.5 w-3.5" /> En cotización
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-purple-300">
                    {SERVICE_CATEGORIES.find((category) => category.value === service.category)?.label}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">{service.name}</h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-beige-300">{service.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {service.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-beige-200">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-beige-300">
                        Desde <span className="font-display text-base font-bold text-purple-300">S/ {service.price}</span>
                      </p>
                      <p className="flex items-center gap-1 text-[11px] text-beige-300">
                        <Clock className="h-3 w-3" /> {service.minDuration}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="press inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:border-purple-400/50 hover:text-purple-300"
                    >
                      <Eye className="h-4 w-4" /> Detalles
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAddon(service.id)}
                      aria-pressed={isSelected}
                      className={`press inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-glow-warm'
                          : 'border border-white/10 bg-white/5 text-white hover:border-purple-400/50 hover:bg-purple-400/10'
                      }`}
                    >
                      {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      {isSelected ? 'Añadido' : 'Cotizar'}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div data-reveal className="mt-12 text-center">
          <a
            href="#paquetes"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-purple-300 transition-colors hover:text-purple-200"
          >
            Explorar paquetes todo incluido
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
    </section>
  )
}