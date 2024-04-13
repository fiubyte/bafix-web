import {Box, Button, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import './MyServicesPage.css';
import {useNavigate} from "react-router-dom";
import ProviderServiceItem from "../../components/ProviderServiceItem/ProviderServiceItem";

const MyServicesPage = () => {

  const navigate = useNavigate();

  const services = [
    {
      "title": "Servicio de Plomería",
      "service_category": {
        "id": 0,
        "title": "Plomería",
        "description": "Servicios de fontanería y reparación de tuberías."
      },
      "approved": true
    },
    {
      "title": "Servicio de Jardinería",
      "service_category": {
        "id": 1,
        "title": "Jardinería",
        "description": "Diseño, mantenimiento y cuidado de jardines."
      },
      "approved": false
    },
    {
      "title": "Servicio de Electricidad",
      "service_category": {
        "id": 2,
        "title": "Electricidad",
        "description": "Instalación y reparación de sistemas eléctricos."
      },
      "approved": true
    }
  ];

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
      </Box>
    </Box>
  )
}

export default MyServicesPage;
