/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#EEF4EE',
          100: '#D3E3D2',
          200: '#A7C7A6',
          400: '#4C8B5A',
          600: '#1F6B43',
          700: '#175436',
          800: '#123F28',
          900: '#0D2E1E',
        },
        marigold: {
          50: '#FDF3E2',
          100: '#FAE2B8',
          400: '#F0A93B',
          600: '#DD8A14',
          700: '#B96D0C',
        },
        terracotta: {
          50: '#FBEAE5',
          100: '#F2C6B8',
          400: '#D97554',
          600: '#B9512F',
          700: '#953E23',
        },
        sand: {
          50: '#FBF9F4',
          100: '#F3EEE2',
        },
        ink: {
          900: '#1C241D',
          700: '#3B443C',
          500: '#6B7568',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Hind"', '"Noto Sans Devanagari"', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'draw': {
          '0%': { strokeDashoffset: '240' },
          '100%': { strokeDashoffset: '0' },
        },
        'bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'pop-in': 'pop-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        'draw': 'draw 1.2s ease-out 0.2s both',
        'bob': 'bob 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
