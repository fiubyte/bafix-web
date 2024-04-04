import {createTheme} from "@mui/material";

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#000000',
    }
  },
  typography: {
    h1: {
      fontWeight: "bold",
    },
  }
});

export default mainTheme;
