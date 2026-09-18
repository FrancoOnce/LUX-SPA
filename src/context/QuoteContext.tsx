import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface QuoteContextValue {
  isOpen: boolean
  presetPackageId: string | null
  presetAddons: string[]
  openQuote: (packageId?: string, addons?: string[]) => void
  closeQuote: () => void
  selectPackage: (packageId: string) => void
  toggleAddon: (serviceId: string) => void
  hasSelection: boolean
  totalSelectedServices: number
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [presetPackageId, setPresetPackageId] = useState<string | null>(null)
  const [presetAddons, setPresetAddons] = useState<string[]>([])

  const openQuote = useCallback((packageId?: string, addons?: string[]) => {
    if (packageId) setPresetPackageId(packageId)
    if (addons) setPresetAddons(addons)
    setIsOpen(true)
  }, [])

  const closeQuote = useCallback(() => setIsOpen(false), [])

  const selectPackage = useCallback((packageId: string) => setPresetPackageId(packageId), [])

  const toggleAddon = useCallback((serviceId: string) => {
    setPresetAddons((addons) =>
      addons.includes(serviceId) ? addons.filter((id) => id !== serviceId) : [...addons, serviceId],
    )
  }, [])

  const value = useMemo<QuoteContextValue>(
    () => ({
      isOpen,
      presetPackageId,
      presetAddons,
      openQuote,
      closeQuote,
      selectPackage,
      toggleAddon,
      hasSelection: Boolean(presetPackageId) || presetAddons.length > 0,
      totalSelectedServices: presetAddons.length,
    }),
    [isOpen, presetPackageId, presetAddons, openQuote, closeQuote, selectPackage, toggleAddon],
  )

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export function useQuote(): QuoteContextValue {
  const context = useContext(QuoteContext)
  if (!context) {
    throw new Error('useQuote debe usarse dentro de <QuoteProvider>')
  }
  return context
}