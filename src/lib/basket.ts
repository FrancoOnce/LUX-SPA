export interface Basket {
  packageId: string | null
  addons: string[]
}

const INITIAL: Basket = { packageId: null, addons: [] }
const OPEN_EVENT = 'spa:open-quote'
const CHANGE_EVENT = 'spa:basket'

declare global {
  interface Window {
    __spaBasket?: Basket
  }
}

export function getBasket(): Basket {
  if (typeof window === 'undefined') return { ...INITIAL, addons: [] }
  if (!window.__spaBasket) window.__spaBasket = { ...INITIAL, addons: [] }
  return window.__spaBasket
}

export function setBasket(patch: Partial<Basket>): Basket {
  const current = getBasket()
  const next: Basket = {
    packageId: patch.packageId !== undefined ? patch.packageId : current.packageId,
    addons: patch.addons !== undefined ? patch.addons : [...current.addons],
  }
  window.__spaBasket = next
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: next }))
  return next
}

export function openQuote(packageId?: string): void {
  if (packageId) setBasket({ packageId })
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

export function hasSelection(): boolean {
  const basket = getBasket()
  return Boolean(basket.packageId) || basket.addons.length > 0
}

export function selectedCount(): number {
  return getBasket().addons.length
}

export function subscribe(callback: (basket: Basket) => void): () => void {
  callback(getBasket())
  const listener = () => callback(getBasket())
  window.addEventListener(CHANGE_EVENT, listener)
  return () => window.removeEventListener(CHANGE_EVENT, listener)
}