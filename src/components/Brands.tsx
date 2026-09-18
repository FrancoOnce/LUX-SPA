import { brands } from '../data/social'
import { Reveal } from './ui/Reveal'

export function Brands() {
  const marquee = [...brands, ...brands]

  return (
    <div className="mt-20">
      <Reveal className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Marcas y aliados que confían en nosotros
        </p>
      </Reveal>

      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {marquee.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex h-16 min-w-[180px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6"
            >
              <span className="font-display text-base font-bold uppercase tracking-wide text-zinc-400 transition-colors hover:text-gold-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}