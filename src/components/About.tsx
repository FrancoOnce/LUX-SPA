import { Award, CalendarCheck, HeartHandshake, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { AnimatedCounter } from './ui/AnimatedCounter'

const values = [
  {
    icon: Award,
    title: 'Producción de primer nivel',
    description: 'Equipos profesionales, artistas certificados y montajes de alto impacto para eventos de cualquier tamaño.',
  },
  {
    icon: CalendarCheck,
    title: 'Puntualidad absoluta',
    description: 'Planificamos cada minuto de tu evento. Cronograma detallado y coordinador dedicado en sitio.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad certificada',
    description: 'Protocolos de seguridad en pirotecnia fría, CO₂ y electricidad, con personal capacitado y asegurado.',
  },
  {
    icon: Sparkles,
    title: 'Creatividad a medida',
    description: 'Diseñamos conceptos originales según tu temática, paleta de colores y estilo de celebración.',
  },
  {
    icon: HeartHandshake,
    title: 'Trato cercano',
    description: 'Un solo punto de contacto por WhatsApp para resolver dudas y ajustar cada detalle antes del gran día.',
  },
  {
    icon: Truck,
    title: 'Logística completa',
    description: 'Transporte, montaje, pruebas técnicas y desmontaje incluidos. Tú solo disfrutas la fiesta.',
  },
]

const stats = [
  { value: 12, suffix: '+', label: 'Años de experiencia' },
  { value: 45, suffix: '+', label: 'Profesionales en equipo' },
  { value: 30, suffix: '+', label: 'Ciudades atendidas' },
]

export function About() {
  return (
    <section id="nosotros" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Nosotros"
              title="Somos la productora que convierte fiestas en"
              highlight="recuerdos legendarios"
              description="En SPA Eventos combinamos arte, tecnología y producción para crear experiencias que se sienten, se viven y se recuerdan. Cada evento es un espectáculo diseñado a la medida."
            />

            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <p className="font-display text-3xl font-extrabold text-gold-300">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-medium text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.07}>
                <div className="group h-full rounded-2xl border border-white/10 bg-midnight-900/60 p-5 backdrop-blur transition-colors hover:border-gold-500/30 hover:bg-midnight-900">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400/20 to-fuchsia-500/10 text-gold-400 transition-transform group-hover:scale-105">
                    <value.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-white">{value.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}