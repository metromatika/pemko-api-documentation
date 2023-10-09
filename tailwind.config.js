/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        title: '#2B3E51',
        font: '#5E6B7A',
        primary: '#059669',
        sideBar: '#F5F7FA',
        line: '#E6E9ED',
        dark: '#202E3D',
        'font-dark': '#7F8A96'
      }
    }
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/typography')
  ]
}
