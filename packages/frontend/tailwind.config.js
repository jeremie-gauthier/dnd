/** @type {import('tailwindcss').Config} */
export default {
  content: {
    relative: true,
    files: [
      "./src/router/**/*.{jsx,tsx}",
      "./src/components/**/*.{jsx,tsx}",
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
    },
  },
  plugins: [],
};
