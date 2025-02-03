/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // DaisyUI 테마 설정 (옵션)
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
