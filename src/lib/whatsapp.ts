import { WHATSAPP_NUMBER } from '../config'
import type { QuoteFormData } from '../types'
import { calculateQuote } from './quote'
import { formatCurrency } from './format'

export function buildQuoteMessage(data: QuoteFormData): string {
  const result = calculateQuote(data)
  const lines = [
    '🎉 *Solicitud de Cotización - SPA Eventos*',
    '',
    '👤 *Datos de Contacto*',
    `   • Nombre: ${data.nombre}`,
    `   • WhatsApp: ${data.whatsapp}`,
    `   • Email: ${data.email}`,
    '',
    '🗓️ *Detalles del Evento*',
    `   • Tipo: ${data.eventType}`,
    `   • Fecha: ${data.date}`,
    `   • Locación: ${data.location}`,
    '',
    '💎 *Paquete Seleccionado*',
    `   • ${result.package.name} — S/ ${formatCurrency(result.package.price)}`,
    '',
  ]

  if (result.addons.length > 0) {
    lines.push('✨ *Servicios Adicionales*')
    for (const addon of result.addons) {
      lines.push(`   • ${addon.name} — S/ ${formatCurrency(addon.price)}`)
    }
    lines.push('')
  }

  lines.push('💰 *Resumen*')
  lines.push(`   • Subtotal: S/ ${formatCurrency(result.subtotal)}`)
  lines.push(`   • IGV (18%): S/ ${formatCurrency(result.igv)}`)
  lines.push(`   • *Total estimado: S/ ${formatCurrency(result.total)}*`)
  lines.push('')
  lines.push('Quedo atento/a a su confirmación. ¡Gracias! 🥂')

  return lines.join('\n')
}

export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_NUMBER): string {
  const normalized = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
}

export async function sendQuoteToApi(endpoint: string, data: QuoteFormData): Promise<boolean> {
  if (!endpoint) return false
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quote: data, message: buildQuoteMessage(data), submittedAt: new Date().toISOString() }),
    })
    return response.ok
  } catch {
    return false
  }
}