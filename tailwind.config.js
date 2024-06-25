/** @type {import('tailwindcss').Config} */
const Colors = require('./src/Utils/colors/Colors')
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,tsx}"
  ],
  theme: {
    extend: {
      maxHeight: {
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
      },
      height: {
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
      },
      fontSize:{
        xxxs : '8px',
        xxs : '10px',
      },
      margin: {
        '0.1p': '0.1%',
        '0.5p': '0.5%',
        '1p': '1%',
        '2p': '2%',
        '3p': '3%',
        '4p': '4%',
        '5p': '5%',
        '10p': '10%',
        '15p': '15%',
        '20p': '20%',
        '25p': '25%',
        // Add more as needed
      },
      padding: {
        '0.1p': '0.1%',
        '0.5p': '0.5%',
        '1p': '1%',
        '2p': '2%',
        '3p': '3%',
        '4p': '4%',
        '5p': '5%',
        '10p': '10%',
        '15p': '15%',
        '20p': '20%',
        '25p': '25%',
        // Add more as needed
      },
      colors: {
        ...Colors['colorTheme'],
      },
    },
  },
  plugins: [],
}