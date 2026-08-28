/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#2A2420',
          light: '#4A4038'
        },
        gold: {
          DEFAULT: '#C9A227',
          dark: '#A8841D',
          light: '#F0E0A8'
        },
        cream: '#FDF8EF',
        surface: '#FFFFFF',
        muted: {
          DEFAULT: '#F2EEE8',
          foreground: '#8A8378'
        },
        border: '#E7E1D6',
        destructive: '#DC2626',
        success: '#16A34A'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
