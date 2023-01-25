/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        teko: ["Teko", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("flowbite/plugin"),
  ],
};
