import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: {
          950: '#fcf8f1',
          900: '#f6efe2',
          800: '#efe3d0',
          700: '#e6d5bc',
        },
        cream: {
          50: '#3a2c1f',
          100: '#1e1712',
          200: '#53402e',
        },
        beige: {
          100: '#4a3a2c',
          200: '#5f4c3b',
          300: '#75604b',
          400: '#98806a',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'scroll-dot': 'scrollDot 1.8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease both',
        'fade-up': 'fadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-out': 'fadeOut 0.16s ease-in both',
        'zoom-in': 'zoomIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'zoom-out': 'zoomOut 0.16s ease-in both',
        'sheet-in': 'sheetIn 0.5s cubic-bezier(0.2, 1.4, 0.34, 1) both',
        'sheet-out': 'sheetOut 0.18s ease-in both',
        'slide-step': 'slideStep 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-step-left': 'slideStepLeft 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        'testi-out-left': 'testiOutLeft 0.35s ease-in both',
        'testi-out-right': 'testiOutRight 0.35s ease-in both',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '70%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          to: { opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'none' },
        },
        zoomIn: {
          from: { opacity: '0', transform: 'translateY(24px) scale(0.97)' },
          to: { opacity: '1', transform: 'none' },
        },
        zoomOut: {
          to: { opacity: '0', transform: 'translateY(16px) scale(0.98)' },
        },
        sheetIn: {
          from: { opacity: '0', transform: 'translateY(56px) scale(0.985)' },
          to: { opacity: '1', transform: 'none' },
        },
        sheetOut: {
          to: { opacity: '0', transform: 'translateY(28px) scale(0.985)' },
        },
        slideStep: {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to: { opacity: '1', transform: 'none' },
        },
slideStepLeft: {
          from: { opacity: 0, transform: 'translateX(-32px)' },
          to: { opacity: 1, transform: 'none' },
        },
        testiOutLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-56px) scale(0.98)' },
        },
        testiOutRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(56px) scale(0.98)' },
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(139, 92, 246, 0.5)',
        'glow-warm': '0 0 36px -8px rgba(249, 115, 22, 0.5)',
      },
    },
  },
  plugins: [],
} satisfies Config