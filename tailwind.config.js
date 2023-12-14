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
      keyframes: {
        bouncing: {
          "0%, 100%": { transform: "translateY(0) rotate(-6deg)" },
          "50%": { transform: "translateY(-25%) rotate(-6deg)" },
        },
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.25)" },
          "50%": { transform: "rotate(-8deg)" },
          "60%": { transform: "rotate(8deg)" },
          "70%": { transform: "rotate(-8deg)" },
          "80%": { transform: "rotate(8deg)" },
        },
      },
      animation: {
        bouncing: "bouncing 1s ease-in-out infinite",
        beat: "beat 1s ease-out 1",
      },
    },
  },
  plugins: [],
};
