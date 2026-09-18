import { useMemo } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { CalendarDays, Mail, MapPin, MessageCircle, Package as PackageIcon, Sparkles, User } from 'lucide-react'
import type { QuoteFormData } from '../../types'
import { calculateQuote } from '../../lib/quote'
import { formatCurrency, formatLongDate } from '../../lib/format'

interface StepProps {
  form: UseFormReturn<QuoteFormData>
}

export function StepSummary({ form }: StepProps) {
  const data = form.getValues()
  const quote = useMemo(() => calculateQuote(data), [data.packageId, data.addons])

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-300">
          <User className="h-4 w-4" /> Datos de contacto
        </h3>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-sm text-beige-200">
            <User className="h-4 w-4 text-beige-300" /> {data.nombre}
          </div>
          <div className="flex items-center gap-2 text-sm text-beige-200">
            <MessageCircle className="h-4 w-4 text-beige-300" /> {data.whatsapp}
          </div>
          <div className="flex items-center gap-2 text-sm text-beige-200 sm:col-span-2">
            <Mail className="h-4 w-4 text-beige-300" /> {data.email}
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-300">
          <CalendarDays className="h-4 w-4" /> Detalles del evento
        </h3>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-sm text-beige-200">
            <Sparkles className="h-4 w-4 text-beige-300" /> {data.eventType}
          </div>
          <div className="flex items-center gap-2 text-sm text-beige-200">
            <CalendarDays className="h-4 w-4 text-beige-300" /> {formatLongDate(data.date)}
          </div>
          <div className="flex items-center gap-2 text-sm text-beige-200 sm:col-span-2">
            <MapPin className="h-4 w-4 text-beige-300" /> {data.location}
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-300">
          <PackageIcon className="h-4 w-4" /> Servicios seleccionados
        </h3>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center justify-between text-sm">
            <span className="font-semibold text-white">Paquete {quote.package.name}</span>
            <span className="text-beige-200">S/ {formatCurrency(quote.package.price)}</span>
          </li>
          {quote.addons.map((addon) => (
            <li key={addon.id} className="flex items-center justify-between text-sm">
              <span className="text-beige-200">{addon.name}</span>
              <span className="text-beige-300">S/ {formatCurrency(addon.price)}</span>
            </li>
          ))}
          {quote.addons.length === 0 && (
            <li className="text-xs text-beige-300">Sin adicionales seleccionados.</li>
          )}
        </ul>
      </div>

      <div className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-transparent p-4">
        <dl className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-beige-300">Subtotal</dt>
            <dd className="text-beige-100">S/ {formatCurrency(quote.subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-beige-300">IGV (18%)</dt>
            <dd className="text-beige-100">S/ {formatCurrency(quote.igv)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-2">
            <dt className="font-display text-base font-bold text-white">Total estimado</dt>
            <dd className="font-display text-xl font-extrabold text-purple-300">S/ {formatCurrency(quote.total)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] leading-relaxed text-beige-300">
          * Cotización referencial sujeta a confirmación según fecha, locación y disponibilidad. No incluye
          movilidad fuera de la ciudad.
        </p>
      </div>
    </div>
  )
}