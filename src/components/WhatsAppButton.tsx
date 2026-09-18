import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const defaultMessage =
  '¡Hola SPA Eventos! 👋 Quiero información para cotizar la producción de mi evento. ¿Me pueden ayudar?'

export function WhatsAppButton() {
  return (
    <motion.a
      href={buildWhatsAppUrl(defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-xl border border-white/10 bg-midnight-900/95 px-3.5 py-2 text-sm font-semibold text-white opacity-0 shadow-xl backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        ¿Cotizamos tu evento?
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_30px_-6px_rgba(37,211,102,0.7)]">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-70 animate-ping" />
        <MessageCircle className="relative h-7 w-7 fill-white text-white" />
      </span>
    </motion.a>
  )
}