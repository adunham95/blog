module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        28: '7rem',
        'screen-1/3': 'calc(100vh / 3)',
        'screen-1/2': 'calc(100vh / 2)',
        'screen-1/4': 'calc(100vh / 4)',
        'screen-3/4': 'calc(100vh * 0.75)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
