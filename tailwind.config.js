/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neo': '5px 5px 0px #000000',
        'neo-lg': '8px 8px 0px #000000',
        'neo-sm': '3px 3px 0px #000000',
        'neo-active': '1px 1px 0px #000000',
      },
      fontFamily: {
        display: ['"Fredoka"', 'cursive', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
