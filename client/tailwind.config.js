/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "var(--background-color)",
        "stroke-active": "var(--stroke-active)",
        "stroke-constant": "var(--stroke-constant)",
        "text-color": "var(--text-color)",
        "text-icons-color": "var(--text-icons-color)",
      },
      fontFamily: {
        "h1-desktop-vnvinvt": "var(--h1-desktop-vnvinvt-font-family)",
        "h2-desktop-vnvinvt": "var(--h2-desktop-vnvinvt-font-family)",
        "h3-desktop-vnvinvt": "var(--h3-desktop-vnvinvt-font-family)",
        "h4-desktop-vnvinvt": "var(--h4-desktop-vnvinvt-font-family)",
        "para-desktop-vnvinvt": "var(--para-desktop-vnvinvt-font-family)",
        "title-desktop-vnvinvt": "var(--title-desktop-vnvinvt-font-family)",
      },
      boxShadow: {
        "effect-active": "var(--effect-active)",
        "effect-deactive": "var(--effect-deactive)",
      },
      
    },
  },
  plugins: [ 
    require('tailwind-scrollbar'),
  ],
}


