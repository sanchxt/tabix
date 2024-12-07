/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/entrypoints/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
