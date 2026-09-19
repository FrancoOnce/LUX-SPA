import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react'

const baseField =
  'w-full rounded-xl border bg-night-950/60 px-4 py-3 text-sm text-cream-50 placeholder:text-beige-400 outline-none transition-colors focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20'

interface FieldProps {
  label: string
  error?: string
  hint?: string
  htmlFor: string
}

export function Field({ label, error, hint, htmlFor, children }: FieldProps & { children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-beige-200">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-beige-300">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { hasError, className = '', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={`${baseField} ${hasError ? 'border-red-500/60' : 'border-white/10'} ${className}`}
      {...props}
    />
  )
})

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { hasError, className = '', children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={`${baseField} appearance-none ${hasError ? 'border-red-500/60' : 'border-white/10'} ${className}`}
      {...props}
    >
      {children}
    </select>
  )
})