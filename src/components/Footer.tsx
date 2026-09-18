import { Instagram, Facebook, Youtube, Music2, Mail, MapPin, Phone, Clock, Sparkles } from 'lucide-react'
import { COMPANY_INFO, NAV_LINKS } from '../config'
import { useQuote } from '../context/QuoteContext'

const socials = [
  { icon: Instagram, href: COMPANY_INFO.social.instagram, label: 'Instagram' },
  { icon: Facebook, href: COMPANY_INFO.social.facebook, label: 'Facebook' },
  { icon: Music2, href: COMPANY_INFO.social.tiktok, label: 'TikTok' },
  { icon: Youtube, href: COMPANY_INFO.social.youtube, label: 'YouTube' },
]

export function Footer() {
  const { openQuote } = useQuote()

  return (
    <footer className="relative border-t border-white/10 bg-midnight-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600">
                <Sparkles className="h-5 w-5 text-midnight-950" />
              </span>
              <span className="font-display text-lg font-bold text-white">
                SPA<span className="text-gold-400"> Eventos</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              {COMPANY_INFO.tagline}. Creamos experiencias inolvidables con shows temáticos, hora loca,
              plataforma 360° y efectos especiales.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-gold-500/40 hover:text-gold-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Enlaces del sitio">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Explora</h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-gold-300">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openQuote()}
                  className="text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
                >
                  Cotizar Evento
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" /> {COMPANY_INFO.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold-400" /> {COMPANY_INFO.email}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-gold-400" /> {COMPANY_INFO.city}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold-400" /> {COMPANY_INFO.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-zinc-500">Hecho con pasión para eventos que se recuerdan.</p>
        </div>
      </div>
    </footer>
  )
}