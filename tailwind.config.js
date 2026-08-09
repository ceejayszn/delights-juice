/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pash: {
          red: '#7A0C0C',
          'red-dark': '#5A0808',
          crimson: '#D92626',
          'crimson-hover': '#B91C1C',
          cream: '#FBF8F3',
          'cream-dark': '#F3ECE1',
          dark: '#18181B',
          gold: '#F59E0B',
          card: '#FFFFFF',
        },
        juice: {
          green: '#10B981',
          orange: '#FF6B00',
          yellow: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'pash-glow': '0 8px 30px rgba(217, 38, 38, 0.25)',
        'red-glow': '0 8px 30px rgba(122, 12, 12, 0.3)',
        'card-hover': '0 16px 40px -8px rgba(122, 12, 12, 0.12)',
      },
      backgroundImage: {
        'pash-gradient': 'linear-gradient(135deg, #7A0C0C 0%, #5A0808 50%, #3D0505 100%)',
        'hero-pash': 'linear-gradient(135deg, #FBF8F3 0%, #F5EDE0 60%, #EFE3CE 100%)',
        'red-gradient': 'linear-gradient(135deg, #D92626 0%, #7A0C0C 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2.5s infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};


