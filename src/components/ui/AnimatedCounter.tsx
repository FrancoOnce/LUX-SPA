import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1.6 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`
        }
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix, prefix, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  )
}