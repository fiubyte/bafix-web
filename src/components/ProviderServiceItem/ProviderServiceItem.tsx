import {Box, Typography} from "@mui/material";
import "./ProviderServiceItem.css";
import {useNavigate} from "react-router-dom";
import {Service} from "../../models/Service";

type ProviderServiceItemProps = {
  service: Service;
}

const ProviderServiceItem = ({service}: ProviderServiceItemProps) => {
  const navigate = useNavigate();

  return (
    <Box className={"ProviderServiceItem"} onClick={() => {
      if (window.location.href.includes('admin')) {
        navigate(`/admin/servicio/${service.id}/detalle`);
      }
    }}>
      <Box className={"ProviderServiceItem-title-container"}>
        <Typography variant={"h3"}>
          <span className={"ProviderServiceItem-title"}>{service.title}</span>
          <span className={"ProviderServiceItem-category"}> • {service.service_category.title}</span></Typography>
      </Box>
      {service.approved && (
        <Box className={"ProviderServiceItem-approved"}>
          <Typography variant={"body1"}>APROBADO</Typography>
        </Box>
      )}
      {service?.approved === null && (
          <Box className={"ProviderServiceItem-pending"}>
            <Typography variant={"body1"}>PENDIENTE</Typography>
          </Box>
      )}
      {service.approved === false && (
          <Box className={"ProviderServiceItem-rejected"}>
            <Typography variant={"body1"}>RECHAZADO</Typography>
          </Box>
      )}
    </Box>
  )
}

export default ProviderServiceItem;
