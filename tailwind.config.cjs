/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },

      overflowWrap: {
        anywhere: "anywhere",
      },

      colors: {
        customDark: "#121212",
        activeBg: "#26272c",
        activeColor: "#ac7bfd",
        greenTab: "#1e9d0a",
        redTab: "#ff4d00",
        colorOne: "#262031",
        darkgray: "#A9A9A9",
        bgColourOne: "#454256",
        colorTwo: "#624b81",
        bgColourTwo: "#f8fafc",
        bgColourThree: "#eaecef",
        colorThree: "#8d8d8d",
        colorFour: "#667084",
        colorFive: "#828282",
        colorSix: "#929eae",
        colorSeven: "#e8e8e8b3",
        colorEight: "#6544c6",
        colorNine: "#A8A8A8",
        bgColourFour: "#232323",
        borderColourOne: "#373737",
      },

      width: {
        inherit: "inherit",
      },

      spacing: {
        5: "5px",
        10: "10px",
        15: "15px",
      },

      fontSize: {
        xLarge: "1.5rem",
      },

      listStyleType: {
        dotted: "dotted",
      },

      keyframes: {
        fade: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },

      animation: {
        fade: "fade 2s ease-in-out infinite",
      },

      screens: {
        sm: "360px", // Small mobile (phones)
        smSm: "400px", // Small mobile (phones)
        smLg: "500px", // Small mobile (phones)
        md: "600px", // Tablets
        mdLg: "850px", // Tablets
        lg: "1024px", // Small desktops and laptops
        Xlg: "1171px", // Small desktops and laptops
      },
    },
  },
  plugins: [],
};
