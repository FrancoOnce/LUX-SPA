export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 }).format(value)

export const formatLongDate = (value: string): string => {
  if (!value) return 'Por confirmar'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}