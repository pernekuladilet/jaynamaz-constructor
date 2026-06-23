/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#F5D48A',
          400: '#E8C060',
          500: '#C9A227',
          600: '#A08520',
          700: '#776418',
        },
        rug: {
          green: '#1B4332',
          emerald: '#0D6B4A',
          teal: '#0A5B5B',
          blue: '#1B2A4A',
          burgundy: '#6B1E2E',
          beige: '#C8A96E',
          cream: '#F8F4EC',
          dark: '#0F1A14',
        },
      },
      fontFamily: {
        arabic: ['"Scheherazade New"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #F5D48A 50%, #C9A227 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0F1A14 0%, #1B4332 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,162,39,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201,162,39,0)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(201,162,39,0.25)',
        'rug': '0 20px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.2)',
        'card': '0 4px 20px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
