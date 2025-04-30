/** @type {import('tailwindcss').Config} */

const colors = {
  primary: "#21282E",
  secondary: "#F7F7F7",
  tertiary: "#F7B736",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
      },
      textColor: {
        primary: colors.secondary,
        secondary: colors.primary,
      },
      fontFamily: {
        primary: '"Raleway", sans-serif',
      },
    },
  },
  plugins: [],
};
