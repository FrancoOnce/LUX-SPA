import { z } from 'zod'
import type { QuoteFormData, QuoteResult } from '../types'
import { IGV_RATE } from '../config'
import { getPackageById } from '../data/packages'
import { getServiceById } from '../data/services'

export const PE_PHONE_REGEX = /^\d{9}$/

const isFutureDate = (value: string) => new Date(value) >= new Date(new Date().toDateString())

export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, 'Ingresa tu nombre completo')
    .max(80, 'El nombre es demasiado largo')
    .regex(/^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s.]+$/, 'El nombre solo puede contener letras'),
  whatsapp: z.string().trim().regex(PE_PHONE_REGEX, 'Ingresa tu número a 9 dígitos'),
  email: z.string().trim().email('Correo electrónico inválido'),
})

export const eventBaseSchema = z.object({
  eventType: z.string().trim().min(1, 'Selecciona el tipo de evento'),
  date: z.string().trim().min(1, 'Selecciona una fecha'),
  location: z.string().trim().min(3, 'Indica la ciudad o locación').max(120, 'Locación demasiado larga'),
})

export const serviceBaseSchema = z.object({
  packageId: z.string().trim().min(1, 'Selecciona un paquete'),
  addons: z.array(z.string()),
})

export const quoteSchema = contactSchema
  .extend(eventBaseSchema.shape)
  .extend(serviceBaseSchema.shape)
  .refine((data) => isFutureDate(data.date), {
    path: ['date'],
    message: 'La fecha debe ser hoy o una fecha futura',
  })

export const contactFields: Array<keyof QuoteFormData> = ['nombre', 'whatsapp', 'email']
export const eventFields: Array<keyof QuoteFormData> = ['eventType', 'date', 'location']
export const serviceFields: Array<keyof QuoteFormData> = ['packageId', 'addons']

export const STEP_FIELDS: Array<Array<keyof QuoteFormData>> = [contactFields, eventFields, serviceFields, []]

export function calculateQuote(data: QuoteFormData): QuoteResult {
  const pkg = getPackageById(data.packageId)
  if (!pkg) {
    throw new Error('Paquete no válido')
  }

  const addons = data.addons
    .map((id) => getServiceById(id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .map((service) => ({ id: service.id, name: service.name, price: service.price }))

  const subtotal = addons.reduce((sum, addon) => sum + addon.price, pkg.price)
  const igv = Math.round(subtotal * IGV_RATE * 100) / 100
  const total = Math.round((subtotal + igv) * 100) / 100

  return {
    package: { id: pkg.id, name: pkg.name, price: pkg.price },
    addons,
    subtotal,
    igv,
    total,
  }
}