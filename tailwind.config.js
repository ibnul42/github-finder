module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  // add daisyUI plugin
  plugins: [
    require('daisyui'),
  ],

  // config (optional)
  // daisyui: {
  //   styled: true,
  //   themes: true,
  //   base: true,
  //   utils: true,
  //   logs: true,
  //   rtl: false,
  // },
}