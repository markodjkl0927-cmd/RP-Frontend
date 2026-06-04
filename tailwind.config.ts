import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1929',
        },
        gold: {
          50: '#fdf8eb',
          100: '#f9edc8',
          200: '#f2d98d',
          300: '#e8c547',
          400: '#d4af37',
          500: '#b8941f',
          600: '#947618',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f6f8fb',
          border: '#e2e8f0',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 42, 67, 0.06), 0 8px 24px rgba(16, 42, 67, 0.08)',
        'card-hover': '0 4px 12px rgba(16, 42, 67, 0.08), 0 16px 40px rgba(16, 42, 67, 0.12)',
        nav: '0 1px 0 rgba(16, 42, 67, 0.06)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a1929 0%, #102a43 40%, #243b53 100%)',
        'gold-shine': 'linear-gradient(135deg, #d4af37 0%, #f2d98d 50%, #b8941f 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
