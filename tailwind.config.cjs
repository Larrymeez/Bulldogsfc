/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#f30000',
        clubRed: '#ff0000',
        dark: '#000000',
        light: '#ffffff',
        blueHover: '#1d4ed8',
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

        // ⭐ LEFT → RIGHT → LEFT subtle rotation
        badgeSwing: {
          '0%, 100%': { transform: 'rotate(-8deg)' }, // left
          '50%': { transform: 'rotate(8deg)' },       // right
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        slideFade: 'slideFade 0.7s ease-out forwards',

        // Smooth slow swing (includes pause at ends)
        badgeSwing: 'badgeSwing 6s ease-in-out infinite',
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