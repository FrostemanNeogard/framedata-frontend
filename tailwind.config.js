/** @type {import('tailwindcss').Config} */

const colors = {
  primary: "#21282E",
  primaryBright: "#323C45",
  secondary: "#F7F7F7",
  tertiary: "#F7B736",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.primaryBright,
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
