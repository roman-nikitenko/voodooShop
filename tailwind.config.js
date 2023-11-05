/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light-send': '#fcf7e6',
      },
      width: {
        '300': '18.75rem',
      },
      margin: {
        '70': '4.375rem',
        '60': '3.75rem',
        '196': '12.25rem',
        '204': '12.75rem',

      },
      padding: {
        '100': '6.25rem',
        '120': '7.5rem',
        '70': '4.375rem',
        '60': '3.75rem',
        '62': '3.875rem'
      },
      fontFamily: {
        'grotesk': ['Space Grotesk', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

