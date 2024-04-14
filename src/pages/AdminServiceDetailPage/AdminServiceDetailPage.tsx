import {Box, Button, Link, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React, {useEffect} from "react";
import "./AdminServiceDetailPage.css";
import {useParams} from "react-router-dom";
import axios from "axios";
import config from "../../config";
import {Service} from "../../models/Service";

const AdminServiceDetailPage = () => {

    const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);
    const [service, setService] = React.useState<Service>();
    const [servicesLoaded, setServiceLoaded] = React.useState(false);
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
    }, []);


    const approveUser = async (userId: number) => {
        axios.post(`${config.apiUrl}/users/${userId}/approve/`, null, {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}}).then(
            (response) => {
                console.log("User approved")
            }
        ).catch(
            (error) => {
                // handleSubmitError();
                console.log(error);
            }
        )
    };

    const handleApproveUser = (userId: number) => {
        console.log("User id to approve: " + userId)
        approveUser(userId).then(r => console.log("User approved"));
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
                    <Typography variant={"h2"} display="inline"
                                className={"AdminServiceDetailPage-title"}>{service?.title} </Typography>
                    <Typography variant={"h2"} display="inline"
                                className={"AdminServiceDetailPage-subtitle"}>• {service?.service_category.title}</Typography>
                </Box>
            )}

            {service && (
                <Box className={"AdminServiceDetailPage-user"}>
                    <Box className={"AdminServiceDetailPage-flex-row"}>
                        <Typography variant={"h4"}
                                    className={"AdminServiceDetailPage-flex-col"}>Proveedor/a</Typography>
                        <Typography variant={"h4"} className={"AdminServiceDetailPage-flex-col"}>DNI</Typography>
                        <Typography variant={"h4"} className={"AdminServiceDetailPage-flex-col"}>Validación de
                            identidad</Typography>
                        <Typography variant={"h4"} className={"AdminServiceDetailPage-flex-col"}></Typography>
                    </Box>
                    <Box className={"AdminServiceDetailPage-flex-row"}>
                        <Box className={"AdminServiceDetailPage-flex-col"}>
                            <Box className={"AdminServiceDetailPage-flex-row"}>
                                <Box className={"AdminServiceDetailPage-flex-col"}>
                                    <img className={"AdminServiceDetailPage-profile-image"}
                                         src={service?.user.profile_photo_url}/>
                                </Box>
                                <Box className={"AdminServiceDetailPage-flex-col"}>
                                    <Typography
                                        variant={"h6"}>{service?.user.name} {service?.user.surname}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Typography variant={"h6"}
                                    className={"AdminServiceDetailPage-flex-col"}>{service?.user.document_number}</Typography>
                        {/*FIXME: obtain the document image*/}
                        <Typography variant={"h6"} className={"AdminServiceDetailPage-flex-col"}><Link
                            href={service?.user.profile_photo_url} target="_blank">Foto de DNI</Link></Typography>

                        {service?.user.approved && (
                            <Button
                                className={"AdminServiceDetailPage-flex-col AdminServiceDetailPage-validate-user-button AdminServiceDetailPage-validated-button"}
                            >IDENTIDAD VALIDADA</Button>
                        )}
                        {!service?.user.approved && (
                            <Button
                                className={"AdminServiceDetailPage-flex-col AdminServiceDetailPage-validate-user-button"}
                                onClick={() => handleApproveUser(service?.user.id)}>VALIDAR IDENTIDAD</Button>
                        )}
                    </Box>
                </Box>
            )}

            {/*<Box className={"AdminServiceDetailPage-form"}>*/}
            {/*  <AddServiceForm handleSubmitError={() => {*/}
            {/*    setOpenErrorSnackBar(true);*/}
            {/*  }} categories={categories}/>*/}
            {/*</Box>*/}
            {/*<Snackbar*/}
            {/*  open={openErrorSnackBar}*/}
            {/*  autoHideDuration={5000}*/}
            {/*  onClose={handleClose}*/}
            {/*  message="Error al agregar servicio, intentelo nuevamente."*/}
            {/*/>*/}
        </Box>
    )
}

export default AdminServiceDetailPage;
