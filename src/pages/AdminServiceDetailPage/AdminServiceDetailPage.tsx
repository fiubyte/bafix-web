import {Box, Button, Grid, Link, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React, {useEffect} from "react";
import "./AdminServiceDetailPage.css";
import {useParams} from "react-router-dom";
import axios from "axios";
import config from "../../config";
import {Service} from "../../models/Service";

const AdminServiceDetailPage = () => {

  const [service, setService] = React.useState<Service>();
  const [_servicesLoaded, setServiceLoaded] = React.useState(false);
  const [serviceError, setServiceError] = React.useState(false);
  const {id} = useParams();

  useEffect(() => {
    console.log("Received Service ID: " + id)
    axios.get(`${config.apiUrl}/services/${id}`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
        const service: Service = response.data
        setService(service);
        setServiceLoaded(true);
        console.log(service)
      }).catch((error) => {
      console.error(error);
      setServiceError(true);
    });
  }, [id]);


  const approveUser = async (userId: number) => {
    axios.post(`${config.apiUrl}/users/${userId}/approve/`, null, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(
      (response) => {
        console.log("User approved")
        console.log(response)
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  };

  const handleApproveUser = (userId: number) => {
    console.log("User id to approve: " + userId)
    approveUser(userId).then(_ => console.log("User approved"));
  };

  return (
    <Box className={"AdminServiceDetailPage"}>
      <Navbar isLoggedIn={false}/>
      {serviceError && !service && (
        <Typography variant={"body1"} className={"AdminServiceDetailPage-service-error"}>Servicio no
          disponibles.
          Por favor, intenta de nuevo más tarde.</Typography>
      )}

      {service && (
        <Box className={"AdminServiceDetailPage-banner"}>
          <Typography variant={"h3"} display="inline"
                      className={"AdminServiceDetailPage-title"}>{service?.title} </Typography>
          <Typography variant={"h3"} display="inline"
                      className={"AdminServiceDetailPage-subtitle"}>• {service?.service_category.title}</Typography>
        </Box>
      )}

      {service && (
        <>
          <Grid container className={"AdminServiceDetailPage-detail"} rowSpacing={3} columnSpacing={3}>
            <Grid item xs={3}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Proveedor/a</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>DNI</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Validación de
                identidad</Typography>
            </Grid>
            <Grid item xs={4}/>

            <Grid item xs={3} className={"AdminServiceDetailPage-image-container"}>
              <img className={"AdminServiceDetailPage-profile-image"}
                   src={service?.user.profile_photo_url}
                   alt={service?.user.name}/>
              <Typography variant={"h4"}>{service?.user.name} {service?.user.surname}</Typography>
            </Grid>
            <Grid item xs={2} className={"AdminServiceDetailPage-data-container"}>
              <Typography variant={"h4"}>{service?.user.document_number}</Typography>
            </Grid>
            <Grid item xs={3} className={"AdminServiceDetailPage-data-container"}>
              <Link href={service?.user.profile_photo_url}
                    target="_blank"
                    className={"AdminServiceDetailPage-dni-link"}
                    variant={"h4"}>Foto de DNI</Link>
            </Grid>
            <Grid item xs={4} className={"AdminServiceDetailPage-data-container"}>
              {service?.user.approved && (
                <Button
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-validated"}
                >IDENTIDAD VALIDADA</Button>
              )}
              {!service?.user.approved && (
                <Button
                  className={"AdminServiceDetailPage-validate-button"}
                  onClick={() => handleApproveUser(service?.user.id)}>VALIDAR IDENTIDAD</Button>
              )}
            </Grid>
          </Grid>
          <Grid container className={"AdminServiceDetailPage-detail"} rowSpacing={3} columnSpacing={3}>
            <Grid item xs={3}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Descripción</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Días de atención</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Rango horario</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Distancia máxima</Typography>
            </Grid>
            <Grid item xs={3}/>

            <Grid item xs={3} className={"AdminServiceDetailPage-data-container"}>
              <Typography variant={"body1"}>{service?.description}</Typography>
            </Grid>
            <Grid item xs={2} className={"AdminServiceDetailPage-data-container"}>
              <Typography variant={"body1"}>{service?.availability_days.replace(/,/g, ', ')}</Typography>
            </Grid>
            <Grid item xs={2} className={"AdminServiceDetailPage-data-container"}>
              <Typography variant={"body1"}>{service?.availability_time_start} - {service?.availability_time_end}</Typography>
            </Grid>
            <Grid item xs={2} className={"AdminServiceDetailPage-data-container"}>
              <Typography variant={"body1"}>{service?.user.max_radius} km</Typography>
            </Grid>
            <Grid item xs={3} className={"AdminServiceDetailPage-data-container"}>
              {service?.approved && (
                <Button
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-validated"}
                >SERVICIO VALIDADO</Button>
              )}
              {!service?.approved && (
                <Button
                  className={"AdminServiceDetailPage-validate-button"}
                  onClick={() => handleApproveUser(service?.id)}>VALIDAR SERVICIO</Button>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}

export default AdminServiceDetailPage;
