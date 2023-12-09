/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        psWhite: "#FFFFFF",
        psDarkGray: "#333333",
        psMediumGray: "#7a7a7a",
        psLightGray: "#F0F0F0",
        psOrange: "#E07C24",
        psBlue: "#7bc9ea",
        psLightBlue: "#bdefff",
        psLightGreen: "#dcffba",
        psCream: "#f5f5dc",
        psCoral: "#ff847c",
        psLightCoral: "#ffe0de",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        flower: ["Indie Flower", "serif"],
      },
      minWidth: {
        300: "300px",
      },
    },
  },
  plugins: [],
};
