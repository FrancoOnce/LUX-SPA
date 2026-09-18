import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#07070d',
          900: '#0b0b14',
          800: '#12121f',
          700: '#1a1a2e',
        },
        gold: {
          300: '#ffe08a',
          400: '#f5c95c',
          500: '#e3ac2f',
          600: '#c98f1b',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        aurora: 'aurora 14s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(245, 201, 92, 0.45)',
        'glow-neon': '0 0 40px -6px rgba(167, 139, 250, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config