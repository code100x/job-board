import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');
import plugin from 'tailwindcss/plugin';

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './layout/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        satoshi: ['var(--font-satoshi)'],
      },
      backgroundImage: {
        'hero-bg-dark': "url('/BG-Grid.svg')",
        'hero-bg-light': "url('/BG-Grid-Light.svg')",
        'grad-dark':
          'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(2, 8, 23) 0%);',
        'faq-dark':
          'linear-gradient(180deg, rgba(2,8,23) 0%, rgba(2, 8, 23)0%)',
        'grad-light':
          'linear-gradient(180deg, rgba(241, 245, 249, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%)',
      },
      colors: {
        'stroke-primary': 'hsl(var(--stroke-primary))',
        'stroke-secondary': 'hsl(var(--stroke-secondary))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        darkBgSecondary: '#0F172A',
        darkBgTertiary: '#020817',
        lightBgSecondary: '#F1F5F9',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        'loop-scroll': {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'loop-scroll': 'loop-scroll 50s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    addVariablesForColors,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-custom': {
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#1d2839', // Customize thumb color
            borderRadius: '6px',
            border: '3px solid transparent', // Add space around thumb
            backgroundClip: 'content-box', // Adjust thumb size
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent', // Hide track
          },
        },
      });
    }),
  ],
} satisfies Config;

export default config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
