/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    screens: {
      'xl': {'max': '1440px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1024px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '768px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '480px'},
      // => @media (max-width: 639px) { ... }
    },

    extend: {
      colors: {
        transparent: 'transparent',
        'bg-color': '#ffffff',
        '1st-color': '#091156',
        '2nd-color': '#8B8B8B',
        '3rd-color': '#FF64AE',
        },
        backgroundImage: {
          'hero-bg': "url('./src/assets/slide-background.png')",
          'footer-texture': "url('/img/footer-texture.png')",
        }
        
      

  
    },
  },
  plugins: [],
}

