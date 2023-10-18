/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#F7931A',
        brandAlt: '#4D4D4D',
      },
      spacing: {
        page: '80%',
      },
    },
  },
  plugins: [],
};
