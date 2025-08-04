/** @type {import('tailwindcss').Config} */
import { breakpoints } from "./src/config";

export const colors = {
  primary: "#21282E",
  primaryBright: "#323C45",
  secondary: "#F7F7F7",
  secondaryDarkened: "#A7A7A7",
  tertiary: "#658BAD",

  success: "#90FF90",
  warning: "#FFFF59",
  danger: "#FF4D4D",

  successDarkened: "#70DF80",
  warningDarkened: "#DFDF39",
  dangerDarkened: "#DF2F2F",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        primaryText: colors.secondary,
        secondary: colors.primaryBright,
        secondaryDarkened: colors.secondaryDarkened,
        secondaryText: colors.primary,
        tertiary: colors.tertiary,

        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,

        successDarkened: colors.successDarkened,
        warningDarkened: colors.warningDarkened,
        dangerDarkened: colors.dangerDarkened,
      },
      textColor: {
        primary: colors.secondary,
        secondary: colors.primary,
      },
      fontFamily: {
        primary: '"Raleway", sans-serif',
      },
      screens: {
        md: breakpoints.mobile,
      },
    },
  },
  plugins: [],
};
