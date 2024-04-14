import {createTheme} from "@mui/material";

const mainTheme = createTheme({
  typography: {
    h1: {
      fontWeight: "bold",
      fontFamily: "DM Sans, sans-serif",
    },
    h2: {
      fontWeight: "bold",
      fontFamily: "DM Sans, sans-serif",
      fontSize: "2rem",
    },
    h3: {
      fontFamily: "DM Sans, sans-serif",
      fontSize: "1.5rem",
    },
    h4: {
      fontFamily: "DM Sans, sans-serif",
      fontSize: "1.2rem",
    },
    body1: {
      fontFamily: "DM Sans, sans-serif",
      fontSize: "1rem",
    },
  }
});

export default mainTheme;
