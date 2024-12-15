/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      colors: {
        dark: '#0F0E0E',
        whiteGrey: '#edede9',
        rgreen: 'green',
      },
      boxShadow: {
        normal: '0px 0px 20px rgba(0,0,0,0.1)',
        big: '0px 0px 40px rgba(0,0,0,0.3)',
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
  plugins: [],
};
