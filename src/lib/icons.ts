import {
  PartyPopper,
  Music,
  Mic,
  Users,
  Orbit,
  Camera,
  Video,
  Flame,
  Snowflake,
  Zap,
  Palette,
  Headphones,
  Disc3,
  Sparkles,
  Crown,
  Gem,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

export const ICONS: Record<string, LucideIcon> = {
  PartyPopper,
  Music,
  Mic,
  Users,
  Orbit,
  Camera,
  Video,
  Flame,
  Snowflake,
  Zap,
  Palette,
  Headphones,
  Disc3,
  Sparkles,
  Crown,
  Gem,
  Rocket,
}

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles
}