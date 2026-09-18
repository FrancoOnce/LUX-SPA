import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Clock, Eye, Plus } from 'lucide-react'
import { services } from '../data/services'
import { SERVICE_CATEGORIES, type ServiceCategoryFilter } from '../data/categories'
import { useQuote } from '../context/QuoteContext'
import { getIcon } from '../lib/icons'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { ServiceModal } from './ServiceModal'
import type { Service } from '../types'

export function Services() {
  const [activeFilter, setActiveFilter] = useState<ServiceCategoryFilter>('todos')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const { presetAddons, toggleAddon } = useQuote()

  const filtered = useMemo(
    () => (activeFilter === 'todos' ? services : services.filter((service) => service.category === activeFilter)),
    [activeFilter],
  )

  return (
    <section id="servicios" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[22rem] w-[40rem] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Catálogo de servicios"
          title="Elige la experiencia que hará"
          highlight="que todos hablen de tu evento"
          description="Show y hora loca, fotografía 360°, efectos especiales y ambientación. Mezcla los servicios que quieras y cotiza al instante."
        />

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {SERVICE_CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeFilter === category.value ? 'text-midnight-950' : 'text-zinc-400 hover:text-white'
              }`}
              aria-pressed={activeFilter === category.value}
            >
              {activeFilter === category.value && (
                <motion.span
                  layoutId="service-tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 shadow-glow"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}
              <span className="relative">{category.label}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => {
              const Icon = getIcon(service.icon)
              const isSelected = presetAddons.includes(service.id)

              return (
                <motion.article
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`group flex flex-col overflow-hidden rounded-2xl border bg-midnight-900/60 backdrop-blur transition-colors ${
                    isSelected ? 'border-gold-500/60 shadow-glow' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${service.accent}`}>
                    <div className="absolute inset-0 bg-black/25" />
                    <Icon className="relative h-14 w-14 text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                    {isSelected && (
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-midnight-950/90 px-2.5 py-1 text-xs font-bold text-gold-300">
                        <Check className="h-3.5 w-3.5" /> En cotización
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-400/80">
                      {SERVICE_CATEGORIES.find((category) => category.value === service.category)?.label}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white">{service.name}</h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">{service.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {service.features.slice(0, 3).map((feature) => (
                        <span key={feature} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-zinc-300">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                          Desde <span className="font-display text-base font-bold text-gold-300">S/ {service.price}</span>
                        </p>
                        <p className="flex items-center gap-1 text-[11px] text-zinc-500">
                          <Clock className="h-3 w-3" /> {service.minDuration}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:border-gold-500/40 hover:text-gold-300"
                      >
                        <Eye className="h-4 w-4" /> Detalles
                      </button>
                      <button
                        onClick={() => toggleAddon(service.id)}
                        aria-pressed={isSelected}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-midnight-950'
                            : 'border border-white/10 bg-white/5 text-white hover:border-gold-500/50 hover:bg-gold-500/10'
                        }`}
                      >
                        {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {isSelected ? 'Añadido' : 'Cotizar'}
                      </button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <button
            onClick={() => document.querySelector('#paquetes')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
          >
            Explorar paquetes todo incluido
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </Reveal>
      </div>

      <AnimatePresence>
        {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
      </AnimatePresence>
    </section>
  )
}