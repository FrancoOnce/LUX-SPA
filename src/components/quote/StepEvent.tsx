import type { UseFormReturn } from 'react-hook-form'
import { CalendarDays, ChevronDown, MapPin, PartyPopper } from 'lucide-react'
import type { QuoteFormData } from '../../types'
import { EVENT_TYPES } from '../../config'
import { Field, Input, Select } from './Field'

interface StepProps {
  form: UseFormReturn<QuoteFormData>
}

const today = new Date().toISOString().split('T')[0]

export function StepEvent({ form }: StepProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="space-y-5">
      <Field label="Tipo de evento" htmlFor="eventType" error={errors.eventType?.message}>
        <div className="relative">
          <PartyPopper className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Select
            id="eventType"
            defaultValue=""
            className="pl-10"
            hasError={Boolean(errors.eventType)}
            {...register('eventType')}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-midnight-900">
                {type}
              </option>
            ))}
          </Select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        </div>
      </Field>

      <Field
        label="Fecha aproximada"
        htmlFor="date"
        error={errors.date?.message}
        hint="Puede ser tentativa, la confirmamos juntos."
      >
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            id="date"
            type="date"
            min={today}
            className="pl-10"
            hasError={Boolean(errors.date)}
            {...register('date')}
          />
        </div>
      </Field>

      <Field label="Ciudad o locación" htmlFor="location" error={errors.location?.message}>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            id="location"
            placeholder="Ej. Lima, Miraflores - Salón Real"
            className="pl-10"
            hasError={Boolean(errors.location)}
            {...register('location')}
          />
        </div>
      </Field>
    </div>
  )
}