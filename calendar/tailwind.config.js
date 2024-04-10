/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        //
        'my-sm': '400px'
      },
      animation: {
        'pulse-one': 'pulse .5s linear'
      },
      colors: {
        'primary': '#262254',
        'secondary': '#543884',
        'error': '#D94646'
      },
      fontFamily: {

      },
      extend: {
        spacing: {
          '123': '32rem'
        },
        borderRadius: {
          '4xl': '2rem'
        }
      }
    },
  },
  plugins: [],
}

