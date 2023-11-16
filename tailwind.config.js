/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-body-bg": "#21242A",
        "dark-bg": "#282C34",
        "light-text": "#E5E5E5",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
