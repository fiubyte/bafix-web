import {Box, Typography} from "@mui/material";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <Box>
      <Typography variant={"h3"}>¡Unite a BAFix!</Typography>
      <RegisterForm/>
    </Box>
  );
}

export default RegisterPage;
