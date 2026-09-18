import { useMemo, useState } from 'react'

export interface StepDefinition {
  id: string
  title: string
  subtitle: string
}

export function useMultiStepForm(steps: StepDefinition[]) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)

  const totalSteps = steps.length

  const next = () => {
    if (currentStep >= totalSteps - 1) return
    setDirection(1)
    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1))
  }

  const back = () => {
    if (currentStep <= 0) return
    setDirection(-1)
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  const goTo = (index: number) => {
    const target = Math.min(Math.max(index, 0), totalSteps - 1)
    setDirection(target > currentStep ? 1 : -1)
    setCurrentStep(target)
  }

  const progress = useMemo(
    () => Math.round(((currentStep + 1) / totalSteps) * 100),
    [currentStep, totalSteps],
  )

  return {
    currentStep,
    direction,
    totalSteps,
    current: steps[currentStep],
    progress,
    next,
    back,
    goTo,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
  }
}