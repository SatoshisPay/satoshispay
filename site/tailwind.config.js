/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: { max: '640px' },
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        'footer-texture': 'url("/img/footer-background.webp")',
      },

      colors: {
        brand: '#F7931A',
        brandAlt: '#4D4D4D',
        brandLight: '#F9F9F9',
        text: 'rgb(107 114 128)',
      },
      fontSize: {
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3.5rem',
        '4xl': '7rem',
      },
      spacing: {
        page: '80%',
      },
    },
  },
  plugins: [],
};
