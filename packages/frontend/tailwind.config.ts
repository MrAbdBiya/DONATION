import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      colors: {
        brand: {
          50: '#f1f9fb',
          100: '#dff1f6',
          200: '#b8e1eb',
          300: '#82c7da',
          400: '#2a9cbc',
          500: '#1c7fa0',
          600: '#156280',
          700: '#134f67',
          800: '#123f52',
          900: '#0f3343'
        }
      }
    }
  }
};

export default config;
