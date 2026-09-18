import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sparkles, MessageCircle } from 'lucide-react'
import { NAV_LINKS } from '../config'
import { useQuote } from '../context/QuoteContext'

function scrollToSection(href: string) {
  const target = document.querySelector(href)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openQuote, hasSelection, totalSelectedServices } = useQuote()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleLink = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => scrollToSection(href), menuOpen ? 300 : 0)
  }

  const handleQuote = () => {
    setMenuOpen(false)
    openQuote()
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/5 bg-midnight-950/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <a href="#inicio" onClick={(event) => event.preventDefault()} className="group flex items-center gap-2.5" aria-label="SPA Eventos - Inicio">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-glow transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-midnight-950" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-white">SPA<span className="text-gold-400"> Eventos</span></span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">Producciones</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLink(link.href)}
                  className="text-sm font-medium text-zinc-400 transition-colors hover:text-gold-300"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <button
              onClick={handleQuote}
              className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-2.5 text-sm font-semibold text-midnight-950 shadow-glow transition-all hover:scale-[1.03] hover:shadow-none"
            >
              <MessageCircle className="h-4 w-4" />
              Cotizar Evento
              {hasSelection && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[10px] font-bold text-white shadow-glow-neon">
                  {totalSelectedServices}
                </span>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/5 bg-midnight-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <button
                    onClick={() => handleLink(link.href)}
                    className="w-full rounded-lg px-3 py-3 text-left text-base font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-gold-300"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-3"
              >
                <button
                  onClick={handleQuote}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-3.5 text-base font-semibold text-midnight-950"
                >
                  <MessageCircle className="h-5 w-5" />
                  Cotizar Evento
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}