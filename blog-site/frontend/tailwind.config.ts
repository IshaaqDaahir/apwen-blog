import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        brand: {
          50: '#fdf2fa',
          100: '#fbe5f5',
          200: '#f7cceb',
          300: '#f1a3db',
          400: '#e96ec5',
          500: '#a40971',
          600: '#c02693',
          700: '#a21d78',
          800: '#861a63',
          900: '#701954',
          950: '#450931',
        },
        black: '#241e20', // Extracted dark
        white: '#ffffff',
        gray: {
          50: '#f6f6f8',
          100: '#eeeef1',
          200: '#e3e4e8',
          300: '#bbbdc9',
          400: '#9499ad',
          500: '#727892',
          600: '#515870',
          700: '#383d51',
          800: '#252837',
          900: '#1b1d27',
          950: '#13141b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-ibm-plex-mono)'],
        grenze: ['var(--font-grenze-gotisch)'],
        blackletter: ['var(--font-unifraktur-cook)'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
