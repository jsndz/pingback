/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Pingback Color System
        "pb-background": "#0A0A23",
        "pb-surface": "#12132D",
        "pb-primary": "#B8FF00",
        "pb-secondary": "#00F0FF",
        "pb-text": "#F2F2F2",
        "pb-muted": "#8891A5",
        "pb-border": "#2B2D42",
        "pb-success": "#4CAF50",
      },
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
