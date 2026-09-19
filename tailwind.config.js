const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: '#0B0F19',
        cardBg: '#111827',
        indigoAccent: '#6366F1',
        cyanAccent: '#38BDF8',
        emeraldAccent: '#10B981',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'Poppins', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
