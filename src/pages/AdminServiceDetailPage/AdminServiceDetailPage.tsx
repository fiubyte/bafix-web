import {Alert, Box, Button, Grid, IconButton, Link, Modal, Rating, Snackbar, Tooltip, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React, {useEffect} from "react";
import "./AdminServiceDetailPage.css";
import {useParams} from "react-router-dom";
import axios from "axios";
import config from "../../config";
import {Service} from "../../models/Service";
import RejectModal from "../../components/RejectModal/RejectModal";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const AdminServiceDetailPage = () => {

  const [service, setService] = React.useState<Service>();
  const [_serviceLoaded, setServiceLoaded] = React.useState(false);
  const [serviceError, setServiceError] = React.useState(false);
  const {id} = useParams();
  const [fetchService, setFetchService] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [showRejectServiceModal, setShowRejectServiceModal] = React.useState(false);
  const [showRejectProviderModal, setShowRejectProviderModal] = React.useState(false);
  const [showDocumentPhotoModal, setShowDocumentPhotoModal] = React.useState(false);

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
        setFetchService(!fetchService);
        setShowRejectServiceModal(false)
        setShowSnackbar(true)
        setSnackBarMessage("Servicio rechazado correctamente")
      }
    ).catch(
      (error) => {
        console.log(error);
        setShowRejectServiceModal(false)
        setShowSnackbar(true)
        setSnackBarMessage("Ocurrió un error al rechazar el Servicio. Intente nuevamente más tarde")
      }
    )
  }

  const rejectProvider = async (userId: number, rejectProviderMessage: string) => {
    const body = {
      rejected_message: rejectProviderMessage
    };
    axios.post(`${config.apiUrl}/users/${userId}/reject/`, body, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(
      (response) => {
        console.log("Provider rejected");
        console.log(response);
        setFetchService(!fetchService);
        setShowRejectProviderModal(false)
        setShowSnackbar(true)
        setSnackBarMessage("Proveedor rechazado correctamente")
      }
    ).catch(
      (error) => {
        console.log(error);
        setShowRejectProviderModal(false)
        setShowSnackbar(true)
        setSnackBarMessage("Ocurrió un error al rechazar el Proveedor. Intente nuevamente más tarde")
      }
    )
  }

  const putProviderToReview = async (userId: number) => {
    axios.post(`${config.apiUrl}/users/${userId}/review/`, null,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((r) => {
        console.log("Provider put to review");
        console.log(r);
        setFetchService(!fetchService);
        setShowSnackbar(true)
        setSnackBarMessage("Proveedor puesto en revisión")
      }).catch((error) => {
      console.error(error);
      setShowSnackbar(true)
      setSnackBarMessage("Ocurrió un error al poner en revision el Proveedor. Intente nuevamente más tarde")
    });
  }

  const handlePutProviderToReview = (userId: number) => {
    console.log("Provider id to review: " + userId)
    putProviderToReview(userId).then(_ => {
    });
  }


  const approveRate = async (serviceId: number, rateId: number) => {
    axios.post(`${config.apiUrl}/services/${serviceId}/rate/${rateId}/approve`, null,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(
      (response) => {
        console.log("Rate approved");
        console.log(response);
        setFetchService(!fetchService);
      }
    ).catch((error) => {
      console.error(error);
      setServiceError(true);
    })
  };

  const rejectRate = async (serviceId: number, rateId: number) => {
    axios.post(`${config.apiUrl}/services/${serviceId}/rate/${rateId}/reject`, null,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(
      (response) => {
        console.log("Rate rejected");
        console.log(response);
        setFetchService(!fetchService);
      }).catch((error) => {
      console.error(error);
      setServiceError(true);
    })
  };

  const handleApproveRate = (serviceId: number, rateId: number) => {
    console.log("Rate id to approve: " + rateId)
    approveRate(serviceId, rateId).then(_ => {
    });
  }

  const handleRejectRate = (serviceId: number, rateId: number) => {
    console.log("Rate id to reject: " + rateId)
    rejectRate(serviceId, rateId).then(_ => {
    });
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
    }).catch((error) => {
      console.error(error);
      setServiceError(true);
    });
  };

  const handleRejectProvider = (userId: number, rejectProviderMessage: string) => {
    console.log("Provider id to reject: " + userId + " with message: " + rejectProviderMessage)
    rejectProvider(userId, rejectProviderMessage).then(_ => {
    }).catch((error) => {
      console.error(error);
      setServiceError(true);
    });
  };

  const handleOpenRejectServiceModal = () => {
    setShowRejectServiceModal(true)
  };

  const handleOpenRejectProviderModal = () => {
    setShowRejectProviderModal(true)
  }

  const handleCloseRejectModal = () => {
    setShowRejectServiceModal(false)
  };

  const handleCloseRejectProviderModal = () => {
    setShowRejectProviderModal(false)
  }

  const handleClose = () => {
    setShowSnackbar(false);
  };

  return (
    <Box className={"AdminServiceDetailPage"}>
      <Navbar isUserLoggedIn={true}/>
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

      {service && (
        <RejectModal showRejectModal={showRejectProviderModal} handleClose={handleCloseRejectProviderModal}
                     handleReject={handleRejectProvider} id={service.user.id}/>
      )}

      {service && (
        <RejectModal showRejectModal={showRejectServiceModal} handleClose={handleCloseRejectModal}
                     handleReject={handleRejectService} id={service.id}/>
      )}

      {service && showDocumentPhotoModal && (
        <Modal open={showDocumentPhotoModal} onClose={() => setShowDocumentPhotoModal(false)}
               className={"AdminServiceDetailPage-document-photo-modal"}>
          <Box className={"AdminServiceDetailPage-document-photo-modal-container"}>
            <img src={service.user.document_photo_url} alt={"Document"}/>
            <Button className={"AdminServiceDetailPage-document-photo-modal-button"}
                    onClick={() => setShowDocumentPhotoModal(false)}>
              Cerrar
            </Button>
          </Box>
        </Modal>
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
              <Typography variant={"h4"}
                          className={"AdminServiceDetailPage-category"}>Proveedor/a</Typography>
              <Box className={"AdminServiceDetailPage-image-container"}>
                <img className={"AdminServiceDetailPage-profile-image"}
                     src={service?.user.profile_photo_url}
                     alt={service?.user.name}/>
                <Typography variant={"h4"}>{service?.user.name} {service?.user.surname}</Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Dirección</Typography>
              <Typography variant={"h4"}>{service?.user.street + " " + service?.user.street_number}</Typography>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>DNI</Typography>
              <Typography variant={"h4"}>{service?.user.document_number}</Typography>
              <Link onClick={() => setShowDocumentPhotoModal(true)}
                    target="_blank"
                    className={"AdminServiceDetailPage-dni-link"}
                    variant={"h4"}>Foto de DNI</Link>
            </Grid>
            <Grid item xs={3}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Teléfono</Typography>
              <Typography variant={"h4"}>{service?.user.phone_number}</Typography>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Correo</Typography>
              <Typography variant={"h4"}>{service?.user.email}</Typography>
            </Grid>
            <Grid item xs={4} className={"AdminServiceDetailPage-data-container"}>
              {service?.user.approved && (
                <Button
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-validated"}
                >IDENTIDAD VALIDADA</Button>
              )}
              {service?.user.approved === false && (
                <Button
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-rejected"}
                >IDENTIDAD RECHAZADA</Button>
              )}
              {service?.user.approved === false && (
                <Button
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-review"}
                  onClick={() => handlePutProviderToReview(service.user.id)}>PONER EN REVISIÓN</Button>
              )}
              {service?.user.approved == null && (
                <IconButton
                  className={"AdminServiceDetailPage-validate-button"}
                  onClick={() => handleApproveUser(service.user.id)}
                >
                  <Tooltip title={"Aprobar Identidad"}>
                    <DoneIcon/>
                  </Tooltip>
                </IconButton>
              )}
              {service?.user.approved == null && (
                <IconButton
                  className={"AdminServiceDetailPage-validate-button"}
                  onClick={() => handleOpenRejectProviderModal()}>
                  <Tooltip title={"Rechazar Identidad"}>
                    <CloseIcon/>
                  </Tooltip>
                </IconButton>
              )}
            </Grid>
          </Grid>
          <Grid container className={"AdminServiceDetailPage-detail"} rowSpacing={3} columnSpacing={3}>
            <Grid item xs={3}>
              <Typography variant={"h4"}
                          className={"AdminServiceDetailPage-category"}>Descripción</Typography>
              <Typography variant={"body1"}>{service?.description}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Rango
                horario</Typography>
              <Typography
                variant={"body1"}>{service?.availability_time_start} - {service?.availability_time_end}</Typography>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Días de
                atención</Typography>
              <Typography variant={"body1"}>{service?.availability_days.replace(/,/g, ', ')}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Fecha de solicitud</Typography>
              <Typography variant={"body1"}>
                {new Date(service?.requested_date).toLocaleDateString()}
              </Typography>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Distancia
                máxima</Typography>
              <Typography variant={"body1"}>{service?.user.max_radius} km</Typography>
            </Grid>
            <Grid item xs={4} className={"AdminServiceDetailPage-data-container"}>
              {service?.approved == null && (
                <IconButton
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-validated"}
                  onClick={() => handleApproveService(service?.id)}>
                  <Tooltip title={"Aprobar servicio"}>
                    <DoneIcon/>
                  </Tooltip>
                </IconButton>
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
                <IconButton
                  className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-rejected"}
                  onClick={() => handleOpenRejectServiceModal()}>
                  <Tooltip title={"Rechazar servicio"}>
                    <CloseIcon/>
                  </Tooltip>
                </IconButton>
              )}
            </Grid>
          </Grid>

          <Grid container className={"AdminServiceDetailPage-detail"} rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <Typography variant={"h4"}
                          className={"AdminServiceDetailPage-category"}>Comentarios</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>ID usuario</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Comentario</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={"h4"} className={"AdminServiceDetailPage-category"}>Calificación</Typography>
            </Grid>
            <Grid item xs={3}/>

            {service.rates.map((rate) => (
              <>
                <Grid item xs={3} className={"AdminServiceDetailPage-data-container"}>
                  <Typography variant={"body1"}>{rate.user_id}</Typography>
                </Grid>
                <Grid item xs={4} className={"AdminServiceDetailPage-data-container"}>
                  <Typography variant={"body1"}>{rate.message}</Typography>
                </Grid>
                <Grid item xs={2} className={"AdminServiceDetailPage-data-container"}>
                  <Rating value={rate.rate} readOnly/>
                </Grid>
                <Grid item xs={3} className={"AdminServiceDetailPage-data-container"}>
                  {rate.approved && (
                    <Button
                      className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-validated"}>APROBADO</Button>
                  )}
                  {rate.approved === false && (
                    <Button
                      className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-rejected"}>RECHAZADO</Button>
                  )}
                  {rate.approved == null && (
                    <Button className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-validated"}
                            onClick={() => {
                              handleApproveRate(service.id, rate.id)
                            }}>APROBAR</Button>
                  )}
                  {rate.approved == null && (
                    <Button className={"AdminServiceDetailPage-validate-button AdminServiceDetailPage-rejected"}
                            onClick={() => {
                              handleRejectRate(service.id, rate.id)
                            }}
                    >RECHAZAR</Button>
                  )}
                </Grid>
              </>
            ))}

          </Grid>
        </>
      )}
    </Box>
  )
}

export default AdminServiceDetailPage;
