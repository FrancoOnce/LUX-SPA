import { motion } from 'framer-motion'
import { Check, Clock, Crown, Sparkles, Users } from 'lucide-react'
import { packages } from '../data/packages'
import { useQuote } from '../context/QuoteContext'
import { formatPrice } from '../lib/format'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

export function Packages() {
  const { openQuote } = useQuote()

  return (
    <section id="paquetes" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-[26rem] w-[26rem] rounded-full bg-gold-600/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Paquetes todo incluido"
          title="Compara y elige"
          highlight="tu experiencia ideal"
          description="Combinaciones optimizadas para cada tipo de celebración. Todos los paquetes incluyen personal técnico, montaje y desmontaje."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-4 lg:items-end">
          {packages.map((pkg, index) => {
            const isRecommended = Boolean(pkg.recommended)
            const savings = pkg.originalPrice ? pkg.originalPrice - pkg.price : 0

            return (
              <Reveal
                key={pkg.id}
                delay={index * 0.08}
                className={isRecommended ? 'lg:-translate-y-4' : ''}
              >
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 ${
                    isRecommended
                      ? 'border-gold-500/50 bg-gradient-to-b from-gold-500/[0.12] via-midnight-900 to-midnight-900 shadow-glow'
                      : 'border-white/10 bg-midnight-900/60 backdrop-blur hover:border-white/20'
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-midnight-950">
                      <Sparkles className="h-3 w-3" /> Recomendado
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <Crown className={`h-5 w-5 ${isRecommended ? 'text-gold-400' : 'text-zinc-500'}`} />
                    <h3 className="font-display text-xl font-bold text-white">{pkg.name}</h3>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{pkg.tagline}</p>

                  <div className="mt-6">
                    {pkg.originalPrice && (
                      <p className="text-sm text-zinc-500 line-through">S/ {formatPrice(pkg.originalPrice)}</p>
                    )}
                    <p className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-zinc-400">S/</span>
                      <span className={`font-display text-4xl font-extrabold ${isRecommended ? 'text-gold-300' : 'text-white'}`}>
                        {formatPrice(pkg.price)}
                      </span>
                    </p>
                    {savings > 0 && (
                      <p className="mt-1 text-xs font-semibold text-emerald-400">
                        Ahorras S/ {formatPrice(savings)}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex gap-4 border-y border-white/10 py-4 text-sm text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-gold-400" /> {pkg.hours} h
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-gold-400" /> {pkg.performers} integrantes
                    </span>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2.5">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug text-zinc-300">
                        <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isRecommended ? 'bg-gold-500/25 text-gold-300' : 'bg-white/10 text-zinc-400'}`}>
                          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openQuote(pkg.id)}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${
                      isRecommended
                        ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-midnight-950 hover:scale-[1.03]'
                        : 'border border-white/15 bg-white/5 text-white hover:border-gold-500/40 hover:bg-gold-500/10'
                    }`}
                  >
                    Seleccionar {pkg.name}
                  </button>
                </motion.article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-8 text-center text-sm text-zinc-500">
          ¿Necesitas algo a medida?{' '}
          <button onClick={() => openQuote()} className="font-semibold text-gold-300 underline-offset-4 hover:underline">
            Armamos un paquete personalizado para ti
          </button>
          .
        </Reveal>
      </div>
    </section>
  )
}