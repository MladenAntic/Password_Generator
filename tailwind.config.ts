/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#18171f",
        "darkgray": "#24232c",
        "lightgray": "#817d92",
        "almost-white": "#e6e5ea",
        "green": "#a4ffaf",
        "red": "#f64a4a",
        "orange": "#f87c58",
        "yellow": "#f8cd65"
      }
    },
  },
  plugins: [],
}