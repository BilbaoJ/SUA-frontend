/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#27374D',
        secondary: '#526D82',
        accent: '#9DB2BF',
        light: '#DDE6ED',
      },
      fontFamily: {
        custom: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
