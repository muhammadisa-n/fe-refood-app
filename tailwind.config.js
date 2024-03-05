/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monserrat: ["Montserrat", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: " #6d28d9",
        primary_dark: "#7c3aed",
        secondary_light: "#ede9fe",
        secondary_dark: "#f5f3ff",
        light: "#f1f5f9",
        dark: "#020617",
      },
    },
  },
  plugins: [],
}
