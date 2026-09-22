/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#EBF5F1',
          100: '#CFE7DD',
          400: '#2E9C77',
          600: '#0E7C66',
          700: '#0B6353',
          900: '#083E34',
        },
        clay: {
          400: '#F0A84E',
          600: '#E8792B',
          700: '#C05F1C',
        },
        ink: {
          900: '#16211D',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
