/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007AFF', // MedicalBlue
          light: '#E3F2FD',   // LightBlue
          dark: '#005ec5',
        },
        gray: {
          bg: '#F8F9FA',      // BackgroundGray
        },
        error: {
          DEFAULT: '#FF5252', // ErrorRed
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
