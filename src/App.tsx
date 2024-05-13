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
import AdminServiceDetailPage from "./pages/AdminServiceDetailPage/AdminServiceDetailPage";
import ProviderServiceDetailPage from "./pages/ProviderServiceDetailPage/ProviderServiceDetailPage";
import InstallAppPage from "./pages/InstallAppPage/InstallAppPage";


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
            <Route path={'/servicio/:id'} Component={ProviderServiceDetailPage}/>
            <Route path={'/service/:id'} Component={InstallAppPage}/>
            <Route path={'/agregar-servicio'} Component={AddServicePage}/>
            <Route path={'/admin'} Component={AdminLoginPage}/>
            <Route path={'/admin/inicio'} Component={AdminHomePage}/>
            <Route path={'/admin/servicio/:id/detalle'} Component={AdminServiceDetailPage}/>
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
