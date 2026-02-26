/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#f30000',   // deeper red for hero highlights
        clubRed: '#ff0000',   // richer red for badges, dots, team name
        dark: '#000000',
        light: '#ffffff',
        blueHover: '#1d4ed8', // hover color for buttons
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideFade: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        slideFade: 'slideFade 0.7s ease-out forwards',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Integral CF"', 'Akira', 'Impact', 'sans-serif'],
        accent: ['"Rubik Distressed"', 'cursive', 'system-ui'],
        varsity: ['"VTF Redzone Classic"', 'monospace'],
        serif: ['"Markazi Text"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};