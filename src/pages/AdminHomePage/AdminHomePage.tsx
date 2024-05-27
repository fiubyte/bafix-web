import {Box, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React, {useEffect} from "react";
import './AdminHomePage.css';
import ProviderServiceItem from "../../components/ProviderServiceItem/ProviderServiceItem";
import axios from "axios";
import config from "../../config";
import {Service} from "../../models/Service";

const AdminHomePage = () => {

  const [pendentServices, setPendentServices] = React.useState<Service[]>([]);
  const [approvedServices, setApprovedServices] = React.useState<Service[]>([]);
  const [rejectedServices, setRejectedServices] = React.useState<Service[]>([]);
  const [serviceError, setServiceError] = React.useState(false);
  const [servicesLoaded, setServicesLoaded] = React.useState(false);

  useEffect(() => {
    axios.get(`${config.apiUrl}/services`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
        let services: Service[] = response.data;
        setPendentServices(services.filter((service) => service.approved === null).sort((a, b) => a.user.id - b.user.id));
        setApprovedServices(services.filter((service) => service.approved).sort((a, b) => a.user.id - b.user.id));
        setRejectedServices(services.filter((service) => service.approved === false).sort((a, b) => a.user.id - b.user.id));
        setServicesLoaded(true);
        console.log(services)
      }).catch((error) => {
      console.error(error);
      setServiceError(true);
    });
  }, []);

  return (
    <Box className={"AdminHomePage"}>
      <Navbar isUserLoggedIn={true}/>
      <Box className={"AdminHomePage-banner"}>
        <Typography variant={"h2"} className={"AdminHomePage-title"}>Servicios Registrados</Typography>
      </Box>
      <Box className={"AdminHomePage-services"}>
        {!serviceError && pendentServices.length > 0 && (
          <>
            <Typography variant={"h3"} className={"AdminHomePage-subtitle"}>Servicios Pendientes</Typography>
            {pendentServices.map((service) => (<ProviderServiceItem service={service}/>))}
          </>
        )}
        {!serviceError && approvedServices.length > 0 && (
          <>
            <Typography variant={"h3"} className={"AdminHomePage-subtitle"}>Servicios Aprobados</Typography>
            {approvedServices.map((service) => (<ProviderServiceItem service={service}/>))}
          </>
        )}
        {!serviceError && rejectedServices.length > 0 && (
          <>
            <Typography variant={"h3"} className={"AdminHomePage-subtitle"}>Servicios Rechazados</Typography>
            {rejectedServices.map((service) => (<ProviderServiceItem service={service}/>))}
          </>
        )}
        {!serviceError && !servicesLoaded && (
          <Typography variant={"body1"} className={"AdminHomePage-no-services"}>Cargando servicios...</Typography>
        )}
        {!serviceError && servicesLoaded && pendentServices.length + approvedServices.length + rejectedServices.length == 0 && (
          <Typography variant={"body1"} className={"AdminHomePage-no-services"}>No hay servicios
            registrados</Typography>
        )}
        {serviceError && (
          <Typography variant={"body1"} className={"AdminHomePage-service-error"}>Servicios no disponibles.
            Por
            favor, intenta de nuevo más tarde.</Typography>
        )}
      </Box>
    </Box>
  )
}

export default AdminHomePage;
