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
      title: "Servicio 1",
      service_category: {
        id: 0,
        title: "Categoría 1",
        description: "Descripción de la categoría 1",
      },
      approved: true,
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
