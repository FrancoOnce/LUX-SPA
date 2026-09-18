import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, ShieldCheck, Star, Users } from 'lucide-react'
import { useQuote } from '../context/QuoteContext'
import { AnimatedCounter } from './ui/AnimatedCounter'

const metrics = [
  { value: 250, suffix: '+', label: 'Eventos realizados' },
  { value: 30, suffix: '+', label: 'Temáticas disponibles' },
  { value: 99, suffix: '%', label: 'Clientes felices' },
]

const ease = [0.22, 1, 0.36, 1] as const

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Hero() {
  const { openQuote } = useQuote()

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-midnight-950" />
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_140deg,rgba(245,201,92,0.32),rgba(167,139,250,0.22),rgba(217,70,239,0.18),rgba(245,201,92,0.32))] blur-3xl animate-aurora" />
        <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-fuchsia-600/15 blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-[20rem] w-[20rem] rounded-full bg-gold-500/15 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Producción de entretenimiento artístico
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Haz que tu evento{' '}
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-fuchsia-400 bg-clip-text text-transparent">
              sea legendario
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            Shows temáticos, hora loca, plataforma 360°, tótems fotográficos, coreografías y efectos especiales.
            Diseñamos experiencias únicas a la medida de tu celebración.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={() => openQuote()}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-7 py-4 text-base font-bold text-midnight-950 shadow-glow transition-all hover:scale-[1.03]"
            >
              Cotizar Ahora
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection('#servicios')}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:border-gold-500/40 hover:bg-white/10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-gold-400 group-hover:text-gold-300">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              Ver Shows
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:gap-6"
          >
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500 sm:text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="relative hidden lg:block"
          aria-hidden="true"
        >
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-midnight-800 via-midnight-900 to-midnight-950 shadow-2xl">
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg,rgba(245,201,92,0.18),rgba(167,139,250,0.14),rgba(217,70,239,0.12),rgba(245,201,92,0.18))] animate-aurora" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="flex gap-3">
                <Star className="h-10 w-10 text-gold-400" />
                <Star className="h-10 w-10 text-gold-400" />
                <Star className="h-10 w-10 text-gold-400" />
              </div>
              <p className="px-8 text-center font-display text-lg font-semibold text-white">
                La fiesta perfecta
                <br />
                <span className="text-gold-300">empieza aquí</span>
              </p>
            </div>
          </div>

          <motion.div
            className="absolute -left-8 top-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-midnight-900/90 px-4 py-3 backdrop-blur"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Operadores certificados</p>
              <p className="text-xs text-zinc-400">Seguridad garantizada</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-6 bottom-12 flex items-center gap-3 rounded-2xl border border-white/10 bg-midnight-900/90 px-4 py-3 backdrop-blur"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-400">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">+30 artistas en vivo</p>
              <p className="text-xs text-zinc-400">Bailarines y performers</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <div className="h-10 w-6 rounded-full border border-white/20 p-1.5">
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-gold-400"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}