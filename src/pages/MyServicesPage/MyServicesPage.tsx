import {Box, Button, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React, {useEffect} from "react";
import AddIcon from '@mui/icons-material/Add';
import './MyServicesPage.css';
import {useNavigate} from "react-router-dom";
import ProviderServiceItem from "../../components/ProviderServiceItem/ProviderServiceItem";
import axios from "axios";
import config from "../../config";

const MyServicesPage = () => {

  const [services, setServices] = React.useState([]);
  const [serviceError, setServiceError] = React.useState(false);

  const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${config.apiUrl}/services/?mine=true`,
            {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
            .then((response) => {
                setServices(response.data);
            }).catch((error) => {
            console.error(error);
            setServiceError(true);
        });
    }, []);

  return (
    <Box className={"MyServicesPage"}>
      <Navbar isLoggedIn={false}/>
      <Box className={"MyServicesPage-banner"}>
        <Typography variant={"h2"} className={"MyServicesPage-title"}>Mis servicios</Typography>
      </Box>
      <Box className={"MyServicesPage-button-container"}>
        <Button variant="contained" startIcon={<AddIcon/>} className={"MyServicesPage-button"} onClick={() => {
          navigate("/agregar-servicio")
        }}>
          Agregar un nuevo servicio
        </Button>
      </Box>
      <Box className={"MyServicesPage-services"}>
        {services.map((service) => (<ProviderServiceItem service={service}/>))}
        {!serviceError && services.length === 0 && (
          <Typography variant={"body1"} className={"MyServicesPage-no-services"}>No hay servicios registrados</Typography>
        )}
        {serviceError && (
        <Typography variant={"body1"} className={"MyServicesPage-service-error"}>Servicios no disponibles. Por favor, intenta de nuevo más tarde.</Typography>
          )}
      </Box>
    </Box>
  )
}

export default MyServicesPage;
