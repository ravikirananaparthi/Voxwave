/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'cursive'],
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
      },
      colors:
      {
        ray:'#201658',
        yar:'#1D24CA',
        puk:'#98ABEE',
        sul:'#1B1A55',
        sol:'#461959',
        mod:'#FEFBF6'
      },
      zIndex:{
        za:'100',
      }
    },

  },
  plugins: [],
}



      