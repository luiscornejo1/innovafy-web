import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'inovafy-blue': 'var(--blue)',
        'inovafy-blue-d': 'var(--blue-d)',
        'inovafy-blue-l': 'var(--blue-l)',
        'inovafy-blue-xl': 'var(--blue-xl)',
        'inovafy-ink': 'var(--ink)',
        'inovafy-ink2': 'var(--ink2)',
        'inovafy-ink3': 'var(--ink3)',
        'inovafy-cream': 'var(--cream)',
        'inovafy-mist': 'var(--mist)',
        'inovafy-stone': 'var(--stone)',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        dmsans: ['var(--font-dmsans)', 'sans-serif'],
        dmmono: ['var(--font-dmmono)', 'monospace'],
      },
      spacing: {
        'sp-xs': 'var(--sp-xs)',
        'sp-sm': 'var(--sp-sm)',
        'sp-md': 'var(--sp-md)',
        'sp-lg': 'var(--sp-lg)',
        'sp-xl': 'var(--sp-xl)',
        'sp-2xl': 'var(--sp-2xl)',
        'sp-3xl': 'var(--sp-3xl)',
        'sp-4xl': 'var(--sp-4xl)',
        'sp-5xl': 'var(--sp-5xl)',
      },
      borderRadius: {
        'tags': '3px',
        'btn': '6px',
        'card': '9px',
        'modal': '12px',
        'pill': '100px',
      }
    },
  },
  plugins: [],
};
export default config;