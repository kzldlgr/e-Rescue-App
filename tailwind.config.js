/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'animate-ping': 'ping 1s cubic-bezier(0,1,1,1) infinite',
      }
    },
  },
  plugins: [],
}

