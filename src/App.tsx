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
import ChartExample from "./pages/ChartExample/ChartExample";
import StatsPage from "./pages/StatsPage/StatsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage";


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
            <Route path={'/estadisticas'} Component={StatsPage}/>
            <Route path={'/admin/dashboard'} Component={AdminDashboardPage}/>
            <Route path={'/admin'} Component={AdminLoginPage}/>
            <Route path={'/admin/inicio'} Component={AdminHomePage}/>
            <Route path={'/admin/servicio/:id/detalle'} Component={AdminServiceDetailPage}/>
            <Route path={"/example"} Component={ChartExample}/>
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
