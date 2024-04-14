import {BrowserRouter, Route, Routes} from "react-router-dom";
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import mainTheme from "./styles/themes";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SignInOrRegisterPage from "./pages/SignInOrRegisterPage/SignInOrRegisterPage";
import MyServicesPage from "./pages/MyServicesPage/MyServicesPage";
import AddServicePage from "./pages/AddServicePage/AddServicePage";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";
import ProviderLoginPage from "./pages/ProviderLoginPage/ProviderLoginPage";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} Component={SignInOrRegisterPage}/>
            <Route path={'/iniciar-sesion'} Component={ProviderLoginPage}/>
            <Route path={'/registro'} Component={RegisterPage}/>
            <Route path={'/mis-servicios'} Component={MyServicesPage}/>
            <Route path={'/agregar-servicio'} Component={AddServicePage}/>
            <Route path={'/admin'} Component={AdminLoginPage}/>
            <Route path={'/admin/home'} Component={AdminHomePage}/>
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
