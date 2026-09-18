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
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold-300">
          <User className="h-4 w-4" /> Datos de contacto
        </h3>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <User className="h-4 w-4 text-zinc-500" /> {data.nombre}
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <MessageCircle className="h-4 w-4 text-zinc-500" /> {data.whatsapp}
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-300 sm:col-span-2">
            <Mail className="h-4 w-4 text-zinc-500" /> {data.email}
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold-300">
          <CalendarDays className="h-4 w-4" /> Detalles del evento
        </h3>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-zinc-500" /> {data.eventType}
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <CalendarDays className="h-4 w-4 text-zinc-500" /> {formatLongDate(data.date)}
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-300 sm:col-span-2">
            <MapPin className="h-4 w-4 text-zinc-500" /> {data.location}
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold-300">
          <PackageIcon className="h-4 w-4" /> Servicios seleccionados
        </h3>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center justify-between text-sm">
            <span className="font-semibold text-white">Paquete {quote.package.name}</span>
            <span className="text-zinc-300">S/ {formatCurrency(quote.package.price)}</span>
          </li>
          {quote.addons.map((addon) => (
            <li key={addon.id} className="flex items-center justify-between text-sm">
              <span className="text-zinc-300">{addon.name}</span>
              <span className="text-zinc-400">S/ {formatCurrency(addon.price)}</span>
            </li>
          ))}
          {quote.addons.length === 0 && (
            <li className="text-xs text-zinc-500">Sin adicionales seleccionados.</li>
          )}
        </ul>
      </div>

      <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 to-transparent p-4">
        <dl className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-zinc-400">Subtotal</dt>
            <dd className="text-zinc-200">S/ {formatCurrency(quote.subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-zinc-400">IGV (18%)</dt>
            <dd className="text-zinc-200">S/ {formatCurrency(quote.igv)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-2">
            <dt className="font-display text-base font-bold text-white">Total estimado</dt>
            <dd className="font-display text-xl font-extrabold text-gold-300">S/ {formatCurrency(quote.total)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
          * Cotización referencial sujeta a confirmación según fecha, locación y disponibilidad. No incluye
          movilidad fuera de la ciudad.
        </p>
      </div>
    </div>
  )
}