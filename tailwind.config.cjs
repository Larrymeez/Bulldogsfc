/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0055f3',
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

        keyframes: {
  slowZoom: {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(1.1)' },
  },
},
animation: {
  slowZoom: 'slowZoom 6s ease-in-out infinite alternate',
},

        
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