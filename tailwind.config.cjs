/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#236BEF'
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: false,
  },
}
