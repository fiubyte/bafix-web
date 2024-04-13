import {Box, Typography} from "@mui/material";

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

const ProviderServiceItem = ({ service }: ProviderServiceItemProps) => {
  return (
    <Box className={"ProviderServiceItem"}>
      <Box className={"ProviderServiceItem-title"}>
        <Typography variant={"h4"}>{service.title}</Typography>
        <Typography variant={"h4"}>{service.service_category.title}</Typography>
      </Box>
      <Box className={"ProviderServiceItem-approved"}>
        <Typography variant={"body1"}>{service.approved ? "Aprobado" : "Pendiente de aprobación"}</Typography>
      </Box>
    </Box>
  )
}

export default ProviderServiceItem;
