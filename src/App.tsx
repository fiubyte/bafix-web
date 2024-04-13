import {BrowserRouter, Route, Routes} from "react-router-dom";
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import mainTheme from "./styles/themes";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SignInOrRegisterPage from "./pages/SignInOrRegisterPage/SignInOrRegisterPage";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} Component={SignInOrRegisterPage}/>
            <Route path={'/register'} Component={RegisterPage}/>
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
