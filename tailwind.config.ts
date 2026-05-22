import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#695f00',
        'primary-container': '#ffeb3b',
        'on-primary': '#ffffff',
        'on-primary-container': '#746900',
        secondary: '#b51925',
        'on-secondary': '#ffffff',
        'secondary-container': '#d8363a',
        'on-secondary-container': '#fffbff',
        tertiary: '#0061a4',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#dceaff',
        'on-tertiary-container': '#006bb4',
        surface: '#f9f9f9',
        'surface-dim': '#dadada',
        'surface-bright': '#f9f9f9',
        'on-surface': '#1a1c1c',
        'on-surface-variant': '#4a4733',
        'inverse-surface': '#2f3131',
        'inverse-on-surface': '#f0f1f1',
        outline: '#7c7760',
        'outline-variant': '#cdc7ac',
        ink: '#000000',
        canvas: '#ffffff',
        background: '#f9f9f9',
        'on-background': '#1a1c1c',
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        'gap-xs': '4px',
        'gap-sm': '12px',
        'gap-md': '24px',
        'gap-lg': '48px',
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 rgba(0, 0, 0, 1)',
        'brutal-lg': '5px 5px 0 0 rgba(0, 0, 0, 1)',
        'brutal-hover': '6px 6px 0 0 rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [
    function ({ addComponents }: { addComponents: any; [key: string]: any }) {
      addComponents({
        '.brutal-border': {
          '@apply border-4 border-ink': {},
        },
        '.brutal-shadow': {
          boxShadow: '4px 4px 0 0 rgba(0, 0, 0, 1)',
        },
        '.brutal-shadow-lg': {
          boxShadow: '5px 5px 0 0 rgba(0, 0, 0, 1)',
        },
        '.brutal-hover': {
          '@apply hover:shadow-brutal-hover hover:scale-105 transition-all duration-200 cursor-pointer': {},
        },
        '.brutal-active': {
          '@apply active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-100': {},
        },
      });
    },
  ],
};

export default config;
