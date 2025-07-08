module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Sevillana", "cursive"],
        body: ["Dancing Script", "cursive"],
      },
      colors: {
        gold: "rgb(var(--color-gold))",
        blue: "rgb(var(--color-blue))",
      },
      fontFamily: {
        script: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
