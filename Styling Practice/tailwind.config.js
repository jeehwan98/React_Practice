/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust the paths to match your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Pacifio"', 'cursive']
      }
    },
  },
  plugins: [],
};