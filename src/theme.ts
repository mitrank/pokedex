"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ef5350", // Pokemon Red
    },
    secondary: {
      main: "#3761af", // Pokemon Blue
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
});

export default theme;
