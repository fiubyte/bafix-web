import {Box, Typography} from "@mui/material";
import "./ProviderServiceItem.css";

type Service = {
  title: string;
  service_category: {
    id: number;
    title: string;
    description: string;
  };
  approved: boolean;
}

type ProviderServiceItemProps = {
  service: Service;
}

const ProviderServiceItem = ({service}: ProviderServiceItemProps) => {
  return (
    <Box className={"ProviderServiceItem"}>
      <Box className={"ProviderServiceItem-title-container"}>
        <Typography variant={"h3"}>
          <span className={"ProviderServiceItem-title"}>{service.title}</span>
          <span className={"ProviderServiceItem-category"}> • {service.service_category.title}</span></Typography>
      </Box>
      {service.approved ? (
        <Box className={"ProviderServiceItem-approved"}>
          <Typography variant={"body1"}>APROBADO</Typography>
        </Box>
      ) : (
        <Box className={"ProviderServiceItem-pendent"}>
          <Typography variant={"body1"}>PENDIENTE DE APROBACIÓN</Typography>
        </Box>
      )}
    </Box>
  )
}

export default ProviderServiceItem;
