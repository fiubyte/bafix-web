import {Box, Button, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React, {useEffect} from "react";
import AddIcon from '@mui/icons-material/Add';
import './MyServicesPage.css';
import {useNavigate} from "react-router-dom";
import ProviderServiceItem from "../../components/ProviderServiceItem/ProviderServiceItem";
import axios from "axios";
import config from "../../config";
import {Service} from "../../models/Service";

const MyServicesPage = () => {

  const [services, setServices] = React.useState<Service[]>([]);
  const [serviceError, setServiceError] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${config.apiUrl}/services/?mine=true`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
          var services: Service[] = response.data;
          services = services.sort(function(a,b) {return (a.approved === b.approved)? 0 : a.approved? -1 : 1;} ).reverse();
          setServices(services);
      }).catch((error) => {
      console.error(error);
      setServiceError(true);
    });
  }, []);

  return (
    <Box className={"MyServicesPage"}>
      <Navbar isUserLoggedIn={true}/>
      <Box className={"MyServicesPage-banner"}>
        <Typography variant={"h2"} className={"MyServicesPage-title"}>Mis servicios</Typography>
      </Box>
      <Box className={"MyServicesPage-button-container"}>
        <Button variant="contained" startIcon={<AddIcon/>} className={"MyServicesPage-button"} onClick={() => {
          navigate("/agregar-servicio")
        }}>
          Agregar un nuevo servicio
        </Button>
        <Button variant={"contained"} className={"MyServicesPage-button"} onClick={() => {
          navigate("/estadisticas")
        }}>
          Ver estadísticas
        </Button>
      </Box>
      <Box className={"MyServicesPage-services"}>
        {services.map((service) => (<ProviderServiceItem service={service}/>))}
        {!serviceError && services.length === 0 && (
          <Typography variant={"body1"} className={"MyServicesPage-no-services"}>No hay servicios
            registrados</Typography>
        )}
        {serviceError && (
          <Typography variant={"body1"} className={"MyServicesPage-service-error"}>Servicios no disponibles. Por favor,
            intenta de nuevo más tarde.</Typography>
        )}
      </Box>
    </Box>
  )
}

export default MyServicesPage;
