import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import {ThemeProvider} from "@mui/material";
import mainTheme from "./styles/themes";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} Component={HomePage}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
