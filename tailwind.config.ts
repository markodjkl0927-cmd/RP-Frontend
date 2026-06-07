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
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
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
        'hero-gradient': 'linear-gradient(135deg, #2e1065 0%, #4c1d95 40%, #5b21b6 100%)',
        'purple-shine': 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #6d28d9 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
