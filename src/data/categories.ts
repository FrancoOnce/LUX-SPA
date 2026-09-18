export const SERVICE_CATEGORIES = [
  { value: 'todos', label: 'Todos' },
  { value: 'shows', label: 'Shows & Hora Loca' },
  { value: 'fotografia', label: 'Fotografía 360 / Tótem' },
  { value: 'efectos', label: 'Efectos & Ambientación' },
] as const

export type ServiceCategoryFilter = (typeof SERVICE_CATEGORIES)[number]['value']