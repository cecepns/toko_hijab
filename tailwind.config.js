/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FCF7F8',
          100: '#F9EFF1',
          200: '#F0D7DD',
          300: '#E7BFC9',
          400: '#E0A7B5',
          500: '#001D3B', // primary color
          600: '#C28A95',
          700: '#AC6E79',
          800: '#96525D',
          900: '#804042'
        },
        secondary: {
          50: '#F8FAF9',
          100: '#F1F5F3',
          200: '#E2E9E6',
          300: '#D3DED9',
          400: '#C3D3CC',
          500: '#B2BEB5', // secondary color
          600: '#94A199',
          700: '#76847D',
          800: '#596761',
          900: '#3B4A44'
        },
        accent: {
          50: '#FDFBF5',
          100: '#FBF7EA',
          200: '#F6EAC6',
          300: '#F1DDA2',
          400: '#ECD07E',
          500: '#D4AF37', // accent color
          600: '#B78F30',
          700: '#9A6F29',
          800: '#7D4F21',
          900: '#5F301A'
        }
      },
      backgroundPosition: {
        'x-10': '10% 0%',
        'x-20': '20% 0%',
        'x-30': '30% 0%',
        'x-40': '40% 0%',
        'x-50': '50% 0%',
        'x-60': '60% 0%',
        'x-70': '70% 0%',
        'x-80': '80% 0%',
        'x-90': '90% 0%',
        'x-100': '100% 0%',
        'y-10': '50% 10%',
        'y-20': '50% 20%',
        'y-30': '50% 30%',
        'y-40': '50% 40%',
        'y-50': '50% 50%',
        'y-60': '50% 60%',
        'y-70': '50% 70%',
        'y-80': '50% 80%',
        'y-90': '50% 90%',
        'y-100': '50% 100%',
        'y-110': '50% 113%',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
};