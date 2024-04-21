import {Alert, Box, Button, Grid, Link, Modal, Snackbar, TextField, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React, {useEffect} from "react";
import "./AdminServiceDetailPage.css";
import {useParams} from "react-router-dom";
import axios from "axios";
import config from "../../config";
import {Service} from "../../models/Service";

const AdminServiceDetailPage = () => {

  const [service, setService] = React.useState<Service>();
  const [_serviceLoaded, setServiceLoaded] = React.useState(false);
  const [serviceError, setServiceError] = React.useState(false);
  const {id} = useParams();
  const [fetchService, setFetchService] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [showRejectModal, setShowRejectModal] = React.useState(false);
  const [rejectServiceMessage, setRejectServiceMessage] = React.useState("");


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
  }, [id, fetchService]);


  const approveUser = async (userId: number) => {
    axios.post(`${config.apiUrl}/users/${userId}/approve/`, null, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(
      (response) => {
        console.log("User approved")
        console.log(response)
        setFetchService(!fetchService);
        setShowSnackbar(true)
        setSnackBarMessage("Proveedor validado exitosamente")
      }
    ).catch(
      (error) => {
        console.log(error);
        setServiceError(true);
      }
    )
  };

  const approveService = async (serviceId: number) => {
    axios.post(`${config.apiUrl}/services/${serviceId}/approve/`, null, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(
      (response) => {
        console.log("Service approved");
        console.log(response);
        setFetchService(!fetchService);
        setShowSnackbar(true)
        setSnackBarMessage("Servicio aprobado exitosamente")
      }
    ).catch(
      (error) => {
        console.log(error);
        setServiceError(true);
      }
    )
  }

  const rejectService = async (serviceId: number, rejectServiceMessage: string) => {
    const body = {
      rejected_message: rejectServiceMessage
    };
    axios.post(`${config.apiUrl}/services/${serviceId}/reject/`, body, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(
      (response) => {
        console.log("Service rejected");
        console.log(response);
        setShowRejectModal(false)
        setShowSnackbar(true)
        setSnackBarMessage("Servicio rechazado correctamente")
      }
    ).catch(
      (error) => {
        console.log(error);
        setShowRejectModal(false)
        setShowSnackbar(true)
        setSnackBarMessage("Ocurrió un error al rechazar el Servicio. Intente nuevamente más tarde")
      }
    )
  }

  const handleApproveUser = (userId: number) => {
    console.log("User id to approve: " + userId)
    approveUser(userId).then(_ => {
    });
  };

  const handleApproveService = (serviceId: number) => {
    console.log("Service id to approve: " + serviceId)
    approveService(serviceId).then(_ => {
    });
  };

  const handleRejectService = (serviceId: number, rejectServiceMessage: string) => {
    console.log("Service id to reject: " + serviceId + " with message: " + rejectServiceMessage)
    rejectService(serviceId, rejectServiceMessage).then(_ => {
      setFetchService(!fetchService);
    }).catch((error) => {
      console.error(error);
      setServiceError(true);
    });
  };

  const handleOpenRejectServiceModal = () => {
    setRejectServiceMessage("")
    setShowRejectModal(true)
  };

  const handleCloseRejectServiceAttempt = () => {
    setShowRejectModal(false)
  };

  const handleClose = () => {
    setShowSnackbar(false);
  };

  return (
    <Box className={"AdminServiceDetailPage"}>
      <Navbar isLoggedIn={false}/>
      {serviceError && !service && (
        <Typography variant={"body1"} className={"AdminServiceDetailPage-service-error"}>Servicio no
          disponible.
          Por favor, intenta de nuevo más tarde.</Typography>
      )}

      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={showSnackbar}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{width: '100%'}}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>

      <Modal
        open={showRejectModal}
        onClose={handleCloseRejectServiceAttempt}
        className={"AdminServiceDetailPage-reject-modal"}
      >
        <Box className={"AdminServiceDetailPage-reject-modal-container"}>
          <Typography variant={"h3"} align={"center"}
                      className={"AdminServiceDetailPage-reject-modal-title"}>Ingrese el motivo del
            rechazo</Typography>
          <TextField
            value={rejectServiceMessage}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRejectServiceMessage(event.target.value);
            }}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
          <Box className={"AdminServiceDetailPage-modal-button-container"}>
            <Button
              className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-rejected"}
              onClick={() => handleCloseRejectServiceAttempt()}>CANCELAR</Button>
            {service && (
              <Button
                className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-rejected AdminServiceDetailPage-back"}
                onClick={() => handleRejectService(service.id, rejectServiceMessage)}>ENVIAR</Button>
            )}
          </Box>
        </Box>
      </Modal>

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
              <Typography variant={"h4"}
                          className={"AdminServiceDetailPage-category"}>Proveedor/a</Typography>
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
                  onClick={() => handleApproveUser(service.user.id)}>VALIDAR IDENTIDAD</Button>
              )}
            </Grid>
          </Grid>
          <Grid container className={"AdminServiceDetailPage-detail"} rowSpacing={3} columnSpacing={3}>
            <Grid item xs={3}>
              <Typography variant={"h4"}
                          className={"AdminServiceDetailPage-category"}>Descripción</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Días de
                atención</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Rango
                horario</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Distancia
                máxima</Typography>
            </Grid>
            <Grid item xs={3}/>

            <Grid item xs={3} className={"AdminServiceDetailPage-data-container"}>
              <Typography variant={"body1"}>{service?.description}</Typography>
            </Grid>
            <Grid item xs={2} className={"AdminServiceDetailPage-data-container"}>
              <Typography variant={"body1"}>{service?.availability_days.replace(/,/g, ', ')}</Typography>
            </Grid>
            <Grid item xs={2} className={"AdminServiceDetailPage-data-container"}>
              <Typography
                variant={"body1"}>{service?.availability_time_start} - {service?.availability_time_end}</Typography>
            </Grid>
            <Grid item xs={2} className={"AdminServiceDetailPage-data-container"}>
              <Typography variant={"body1"}>{service?.user.max_radius} km</Typography>
            </Grid>
            <Grid item xs={3} className={"AdminServiceDetailPage-data-container"}>
              {service?.approved == null && (
                <Button
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-validated"}
                  onClick={() => handleApproveService(service?.id)}>APROBAR</Button>
              )}
              {service?.approved && (
                <Button
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-validated"}
                >APROBADO</Button>
              )}
              {!service?.approved && service?.approved != null && (
                <Button
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-rejected"}
                >RECHAZADO</Button>
              )}
              {service?.approved == null && (
                <Button
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-rejected"}
                  onClick={() => handleOpenRejectServiceModal()}>RECHAZAR</Button>
              )}
            </Grid>

          </Grid>
        </>
      )}
    </Box>
  )
}

export default AdminServiceDetailPage;
