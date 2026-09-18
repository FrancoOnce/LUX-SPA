import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: {
          950: '#140b22',
          900: '#1b0f2e',
          800: '#251640',
          700: '#301e52',
        },
        cream: {
          50: '#fffdf7',
          100: '#faf3e3',
          200: '#f3e8cd',
        },
        beige: {
          100: '#efe6d2',
          200: '#e3d6b9',
          300: '#d2c09a',
          400: '#bda77c',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        aurora: 'aurora 14s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out infinite reverse',
        'scroll-dot': 'scrollDot 1.8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease both',
        'fade-up': 'fadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'zoom-in': 'zoomIn 0.38s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-step': 'slideStep 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '70%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 0 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'none' },
        },
        zoomIn: {
          from: { opacity: 0, transform: 'translateY(24px) scale(0.97)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideStep: {
          from: { opacity: 0, transform: 'translateX(32px)' },
          to: { opacity: 1, transform: 'none' },
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