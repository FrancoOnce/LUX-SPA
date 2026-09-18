import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../data/social'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Brands } from './Brands'

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? 'fill-gold-400 text-gold-400' : 'text-zinc-600'}`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [active, setActive] = useState(0)
  const testimonial = testimonials[active]

  const move = (direction: number) => {
    setActive((current) => (current + direction + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonios" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/3 h-[24rem] w-[24rem] rounded-full bg-fuchsia-700/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Prueba social"
          title="Cientos de familias y marcas ya"
          highlight="vivieron la experiencia"
          description="Más de 250 eventos realizados con una calificación promedio de 4.9 / 5. Estas son algunas de sus historias."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-midnight-900/70 p-8 backdrop-blur sm:p-10">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-white/5" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={testimonial.id}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Stars rating={testimonial.rating} label={`${testimonial.rating} de 5 estrellas`} />
                <p className="mt-5 text-lg leading-relaxed text-zinc-200 sm:text-xl">“{testimonial.review}”</p>
                <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <div>
                    <p className="font-display font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-zinc-400">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gold-300">{testimonial.eventType}</p>
                    <p className="text-xs text-zinc-500">{testimonial.date}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2" role="tablist" aria-label="Seleccionar testimonio">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActive(index)}
                    role="tab"
                    aria-selected={index === active}
                    aria-label={`Testimonio de ${item.name}`}
                    className={`h-2 rounded-full transition-all ${
                      index === active ? 'w-6 bg-gold-400' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => move(-1)}
                  aria-label="Testimonio anterior"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-gold-500/40 hover:text-gold-300"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => move(1)}
                  aria-label="Siguiente testimonio"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-gold-500/40 hover:text-gold-300"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <Reveal delay={0.1} className="mt-6 grid gap-3 sm:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(testimonials.indexOf(item))}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-gold-500/30"
              >
                <Stars rating={item.rating} label={`${item.rating} de 5 estrellas`} />
                <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{item.review}</p>
                <p className="mt-2 text-xs font-semibold text-zinc-300">{item.name}</p>
              </button>
            ))}
          </Reveal>
        </div>
      </div>

      <Brands />
    </section>
  )
}