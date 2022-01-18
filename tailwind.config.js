module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      aspectRatio: {
        rectangle: "2 / 1",
        shorter: "5 / 2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: "#app",
};
