import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Service} from "../../models/Service";
import axios from "axios";
import config from "../../config";
import {Box, Button, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import "./ProviderServiceDetailPage.css";

const ProviderServiceDetailPage = () => {

  const {id} = useParams();
  const [service, setService] = useState<Service>();
  const [averageRating, setAverageRating] = useState<number>(0);
  const [serviceLoaded, setServiceLoaded] = useState<boolean>(false);
  const [serviceError, setServiceError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Received Service ID: " + id)
    axios.get(`${config.apiUrl}/services/${id}`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
          const service: Service = response.data
          setService(service);
          setServiceLoaded(true);
          console.log(service);
        }
      ).catch((error) => {
      console.error(error);
      setServiceError(true);
    });
  }, []);

  useEffect(() => {
    if (service && service.rates.length > 0) {
      setAverageRating(service.rates.reduce((acc, rate) => acc + rate.rate, 0) / service.rates.length);
    }
  }, [service]);

  if (serviceError) {
    return (
      <Box className={"ProviderServiceDetailPage"}>
        <Navbar isLoggedIn={false}/>
        <Box className={"ProviderServiceDetailPage-banner"}>
          <Typography variant={"h2"} className={"ProviderServiceDetailPage-title"}>Detalle de servicio</Typography>
        </Box>
        <Typography variant={"h3"}>Error al cargar el servicio</Typography>
      </Box>
    );
  }




  return (
    <Box className={"ProviderServiceDetailPage"}>
      <Navbar isLoggedIn={false}/>
      <Box className={"ProviderServiceDetailPage-banner"}>
        <Typography variant={"h2"} className={"ProviderServiceDetailPage-title"}>Detalle de servicio</Typography>
      </Box>
      <Box className={"ProviderServiceDetailPage-content"}>
        {serviceLoaded && service && (
          <>
            <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Título</Typography>
            <Typography variant={"h4"}>{service.title}</Typography>
            <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Categoría</Typography>
            <Typography variant={"h4"}>{service.service_category.title}</Typography>
            <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Descripción</Typography>
            <Typography variant={"h4"}>{service.description}</Typography>
            <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Días de atención</Typography>
            <Typography variant={"h4"}>{service.availability_days}</Typography>
            <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Horario de
              disponibilidad</Typography>
            <Typography variant={"h4"}>{service.availability_time_start} - {service.availability_time_end}</Typography>
            <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Estado</Typography>
            {service.approved && (
              <Typography variant={"h4"} className={"ProviderServiceDetailPage-approved"}>Aprobado</Typography>
            )}
            {service.approved != null && !service.approved && (
              <>
                <Typography variant={"h4"} className={"ProviderServiceDetailPage-rejected"}>Rechazado</Typography>
                <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Motivo</Typography>
                <Typography variant={"body1"}>{service.rejected_message}</Typography>
              </>
            )}
            {service.approved === null && (
              <Typography variant={"h4"} className={"ProviderServiceDetailPage-pending"}>Pendiente</Typography>
            )}
          </>
        )}
        {!serviceLoaded && (
          <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Cargando servicio...</Typography>
        )}
        <Button variant={"contained"} className={"ProviderServiceDetailPage-back-button"} onClick={() => {
          navigate("/mis-servicios");
        }}>Volver</Button>
      </Box>
    </Box>
  );
}

export default ProviderServiceDetailPage;
