module.exports = {
  content :[
    "./src/**/*.{html,ts}"
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui'),...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})]
}
