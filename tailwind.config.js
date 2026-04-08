/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        main: "#0aad0a",
        gray: "#919eab",
        yellow:"#ffc908"
      },
    },
  },
  plugins: [],
};
