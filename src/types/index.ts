export type ServiceCategory = 'shows' | 'fotografia' | 'efectos'

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  tagline: string
  description: string
  features: string[]
  price: number
  minDuration: string
  icon: string
  accent: string
  image?: string
  popular?: boolean
}

export interface Package {
  id: string
  name: string
  tagline: string
  price: number
  originalPrice?: number
  recommended?: boolean
  hours: number
  performers: number
  features: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  eventType: string
  date: string
  rating: number
  review: string
}

export interface Brand {
  id: string
  name: string
}

export interface ContactInfo {
  nombre: string
  whatsapp: string
  email: string
}

export interface EventInfo {
  eventType: string
  date: string
  location: string
}

export interface QuoteFormData extends ContactInfo, EventInfo {
  packageId: string
  addons: string[]
}

export interface QuoteResultItem {
  id: string
  name: string
  price: number
}

export interface QuoteResult {
  package: QuoteResultItem
  addons: QuoteResultItem[]
  subtotal: number
  igv: number
  total: number
}