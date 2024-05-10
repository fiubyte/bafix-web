import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Service} from "../../models/Service";
import axios from "axios";
import config from "../../config";
import {Box, Button, Rating, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import "./ProviderServiceDetailPage.css";
import {User} from "../../models/User";
import {Rate} from "../../models/Rate";

const ProviderServiceDetailPage = () => {

  const {id} = useParams();
  const [service, setService] = useState<Service>();
  const [averageRating, setAverageRating] = useState<number>(0);
  const [serviceLoaded, setServiceLoaded] = useState<boolean>(false);
  const [serviceError, setServiceError] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [commentsLoaded, setCommentsLoaded] = useState<boolean>(false);
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
  }, [id]);

  useEffect(() => {
    if (!service) {
      return;
    }
    if (!service.rates || service.rates.length === 0) {
      return;
    }

    setAverageRating(service.rates.reduce((acc, rate) => acc + rate.rate, 0) / service.rates.length);
    const user_ids = service.rates.map(rate => rate.user_id.toString()).join(",");
    axios.get(`${config.apiUrl}/users?user_ids=${user_ids}`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
          setUsers(response.data);
          setCommentsLoaded(true);
        }
      ).catch((error) => {
      console.error(error);
    });
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

  const renderComment = (rate: Rate) => {
    const user = users.find(user => user.id === rate.user_id);
    if (!user) {
      return null;
    }
    return (
      <Box key={rate.id} className={"ProviderServiceDetailPage-rate-container"}>
        <Box className={"ProviderServiceDetailPage-rate-user-container"}>
          <img src={user.profile_photo_url} alt={"Profile"} className={"ProviderServiceDetailPage-profile-photo"}/>
          <Box>
            <Typography variant={"h4"}>{user.name} {user.surname}</Typography>
            <Rating name="read-only" value={rate.rate} readOnly/>
          </Box>
        </Box>
        <Typography variant={"body1"}>{rate.message}</Typography>
        <hr/>
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
            <Box>
              <Typography variant={"h3"} display="inline"
                          className={"ProviderServiceDetailPage-service-title"}>{service?.title} </Typography>
              <Typography variant={"h3"} display="inline"
                          className={"ProviderServiceDetailPage-subtitle"}>• {service?.service_category.title}</Typography>
            </Box>
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
            <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Calificación
              promedio</Typography>
            <Box className={"ProviderServiceDetailPage-rating-container"}>
              <Rating name="read-only" value={averageRating} readOnly className={"ProviderServiceDetailPage-rating"}/>
              <Typography variant={"h4"}>{averageRating.toFixed(1)} - {service.rates.length} calificaciones</Typography>
            </Box>
            <Typography variant={"h3"} className={"ProviderServiceDetailPage-subtitle"}>Opiniones</Typography>
            {service.rates.map((rate) => (
              renderComment(rate)
            ))}
            {service.rates.length === 0 && (
              <Typography variant={"h4"}>No hay opiniones</Typography>
            )}
            {!commentsLoaded && (
              <Typography variant={"h4"}>Cargando opiniones...</Typography>
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
