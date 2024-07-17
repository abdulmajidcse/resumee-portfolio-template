/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "playfair-display": ["Playfair Display", "sans-serif"],
        "libre-baskerville": ["Libre Baskerville", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
