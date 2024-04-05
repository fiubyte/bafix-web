import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import mainTheme from "./styles/themes";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} Component={RegisterPage}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
