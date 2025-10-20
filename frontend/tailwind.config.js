// tailwind.config.js
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#f2f4f8",
        foreground: "#22223b",
        card: "#ffffff",
        accent: "#e0e0e0",
        primary: "#3b82f6",
        border: "#d1d5db", // <- for border-border
        'neutral-900': "#131313",
      },
      borderRadius: {
        token: "0.5rem", // for rounded-token if needed
      },
    },
  },
  plugins: [],
}
