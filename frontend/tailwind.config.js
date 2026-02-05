/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E7FBFD',
          100: '#C2F6FA',
          200: '#85ECF5',
          300: '#49E3F0',
          400: '#0DDAEC',
          500: '#13DCF2',
          600: '#10BBCE',
          700: '#0E99A9',
          800: '#0B7885',
          900: '#08565F',
        },
        secondary: {
          50: '#F0F5FA',
          100: '#E1EBF5',
          200: '#C3D7EB',
          300: '#A5C3E1',
          400: '#699BD2',
          500: '#2D73C3',
          600: '#245C9C',
          700: '#1B4575',
          800: '#122E4E',
          900: '#091727',
          950: '#050B13',
        },
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'lg': '12px',
        'xl': '20px',
        '3xl': '32px',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(9, 23, 39, 0.08)',
        'glass-lg': '0 12px 48px 0 rgba(9, 23, 39, 0.12)',
      },
    },
  },
  plugins: [],
}
