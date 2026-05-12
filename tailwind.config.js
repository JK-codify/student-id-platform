/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4361EE',
        secondary: '#06D6A0',
        accent: '#FFB703',
        danger: '#EF476F',
        dark: '#2B2D42',
        light: '#F8F9FA',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.1)',
        hover: '0 4px 16px rgba(0, 0, 0, 0.15)',
        soft: '0 1px 3px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
