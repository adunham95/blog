const tagData = require("./getTagData")

const brandColors = tagData.getBrandColors()

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
        '1/8': `${1/8 * 100}%`,
        '2/8': `${2/8 * 100}%`,
        '3/8': `${3/8 * 100}%`,
        '4/8': `${4/8 * 100}%`,
        '5/8': `${5/8 * 100}%`,
        '6/8': `${6/8 * 100}%`,
        '7/8': `${7/8 * 100}%`,
      },
      colors: {
        brand: brandColors,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
