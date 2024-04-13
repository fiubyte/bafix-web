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
      <Box className={"ProviderServiceItem-approved"}>
        <Typography variant={"body1"}>{service.approved ? "Aprobado" : "Pendiente de aprobación"}</Typography>
      </Box>
    </Box>
  )
}

export default ProviderServiceItem;
