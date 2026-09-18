import { motion, type Variants } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className, ...rest }: RevealProps) {
  return (
    <motion.div
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}