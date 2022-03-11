module.exports = {
  content :[
    "./src/**/*.{html,ts}"
  ],
  purge: {
    enabled:true
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')]
}
