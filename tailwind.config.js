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
        space: {
          darkest: '#02040a',
          dark: '#050914',
          card: '#0a1024',
          cardHover: '#0f1738',
          border: '#1e294b',
          accent: '#2c67ed',
          accentGlow: '#467eff',
          accentLight: '#6da0ff',
          neonCyan: '#38bdf8',
          purple: '#8b5cf6',
        }
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(44, 103, 237, 0.5)',
        'glow-blue-lg': '0 0 35px rgba(44, 103, 237, 0.65)',
        'glow-cyan': '0 0 20px rgba(56, 189, 248, 0.45)',
        'glow-card': '0 4px 20px -2px rgba(44, 103, 237, 0.15)',
        'nav-glow': '0 8px 30px rgba(44, 103, 237, 0.25)',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
