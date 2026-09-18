import type { UseFormReturn } from 'react-hook-form'
import { Mail, MessageCircle, User } from 'lucide-react'
import type { QuoteFormData } from '../../types'
import { Field, Input } from './Field'

interface StepProps {
  form: UseFormReturn<QuoteFormData>
}

export function StepContact({ form }: StepProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="space-y-5">
      <Field label="Nombre completo" htmlFor="nombre" error={errors.nombre?.message}>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-beige-300" />
          <Input
            id="nombre"
            placeholder="Ej. María Fernanda Torres"
            autoComplete="name"
            className="pl-10"
            hasError={Boolean(errors.nombre)}
            {...register('nombre')}
          />
        </div>
      </Field>

      <Field
        label="WhatsApp"
        htmlFor="whatsapp"
        error={errors.whatsapp?.message}
        hint="Con código de país. Ej. +51 999 999 999"
      >
        <div className="relative">
          <MessageCircle className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-beige-300" />
          <Input
            id="whatsapp"
            type="tel"
            inputMode="tel"
            placeholder="+51 999 999 999"
            autoComplete="tel"
            className="pl-10"
            hasError={Boolean(errors.whatsapp)}
            {...register('whatsapp')}
          />
        </div>
      </Field>

      <Field label="Correo electrónico" htmlFor="email" error={errors.email?.message}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-beige-300" />
          <Input
            id="email"
            type="email"
            placeholder="tucorreo@email.com"
            autoComplete="email"
            className="pl-10"
            hasError={Boolean(errors.email)}
            {...register('email')}
          />
        </div>
      </Field>
    </div>
  )
}