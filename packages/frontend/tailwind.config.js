/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: {
    relative: true,
    files: [
      "./src/router/**/*.{jsx,tsx}",
      "./src/features/**/*.{jsx,tsx}",
      "./index.html",
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#3B3D58",
          900: "#1B1D31",
        },
      },
      fill: {
        "dice-yellow": "#FFF700",
        "dice-orange": "#FF6E00",
        "dice-red": "#DC143C",
        "dice-purple": "#581c87",
        "dice-special": "#000000",
        "dice-disarm-trap": "#000000",
        "dice-detect-trap": "#000000",
        "dice-turn-undead": "#000000",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
