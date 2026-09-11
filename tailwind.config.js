/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oatly: {
          cream: '#F5F2EB',
          'cream-light': '#FAF8F5',
          'cream-dark': '#EAE4D6',
          black: '#111111',
          blue: '#002766',
          'blue-bright': '#0050FF',
          pink: '#FF5C8D',
          yellow: '#FCEB50',
          mint: '#8CD7A9',
          orange: '#FF7E36',
          gray: '#E0DAD0',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        hand: ['Fredoka', 'cursive'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #111111',
        'brutal-sm': '2px 2px 0px 0px #111111',
        'brutal-lg': '6px 6px 0px 0px #111111',
        'brutal-xl': '8px 8px 0px 0px #111111',
        'brutal-white': '4px 4px 0px 0px #FAF8F5',
      }
    },
  },
  plugins: [],
}
