import {Box, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React, {useEffect} from "react";
import './AdminHomePage.css';
import {useNavigate} from "react-router-dom";
import ProviderServiceItem from "../../components/ProviderServiceItem/ProviderServiceItem";
import axios from "axios";
import config from "../../config";
import {Service} from "../../models/Service";

const AdminHomePage = () => {

    const [services, setServices] = React.useState<Service[]>([]);
    const [serviceError, setServiceError] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${config.apiUrl}/services`,
            {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
            .then((response) => {
                const services: Service[] = response.data
                setServices(services);
                console.log(services)
            }).catch((error) => {
            console.error(error);
            setServiceError(true);
        });
    }, []);

    return (
        <Box className={"AdminHomePage"}>
            <Navbar isLoggedIn={false}/>
            <Box className={"AdminHomePage-banner"}>
                <Typography variant={"h2"} className={"AdminHomePage-title"}>Servicios Registrados</Typography>
            </Box>
            <Box className={"AdminHomePage-services"}>
                {services.map((service) =>
                    (<div key={service.id} className={"AdminHomePage-service-detail"} onClick={() => {
                        navigate("/registro") // TODO: redirect to service detail page for approval
                    }}>
                        <ProviderServiceItem service={service}/>
                    </div>))
                }
                {!serviceError && services.length === 0 && (
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