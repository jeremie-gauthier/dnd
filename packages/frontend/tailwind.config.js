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
    extend: {},
  },
  plugins: [],
};
