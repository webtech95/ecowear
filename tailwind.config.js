/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class', // enable class-based dark mode
  theme: {
    extend: {
      boxShadow: {
        'dark-glow': '0 4px 8px rgba(0, 0, 0, 0.6), 0 0 12px rgba(0, 255, 255, 0.1), 0 0 20px rgba(0, 255, 255, 0.08)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      colors: {
        primary: "#0f4c3a", // deep green
        secondary: "#16a34a", // bright green
        accent: "#f59e0b", // warm orange
        neutral: "#f5f5f5", // light background
      },
    },
  },
  plugins: [],
};
