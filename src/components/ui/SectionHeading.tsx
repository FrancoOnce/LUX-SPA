import { Sparkles } from 'lucide-react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  highlight?: string
  description?: string
  align?: 'center' | 'left'
}

export function SectionHeading({ eyebrow, title, highlight, description, align = 'center' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start'

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title} {highlight && <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-fuchsia-400 bg-clip-text text-transparent">{highlight}</span>}
      </h2>
      {description && <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">{description}</p>}
    </Reveal>
  )
}