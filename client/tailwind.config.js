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
        cyber: {
          cyan: '#00F0FF',
          yellow: '#FFE600',
          pink: '#FF007F',
          green: '#00FF66',
          purple: '#9D4EDD',
          darkBg: '#0A0E17',
          darkSurface: '#121824',
          darkBorder: '#1E293B',
          lightBg: '#F5F2EB',
          lightSurface: '#FFFFFF',
        }
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px #000000',
        'retro-sm': '2px 2px 0px 0px #000000',
        'retro-lg': '6px 6px 0px 0px #000000',
        'retro-cyan': '4px 4px 0px 0px #00F0FF',
        'retro-yellow': '4px 4px 0px 0px #FFE600',
        'retro-pink': '4px 4px 0px 0px #FF007F',
        'retro-green': '4px 4px 0px 0px #00FF66',
      },
      fontFamily: {
        mono: ['Courier New', 'Consolas', 'monospace'],
        display: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
