import {Box, Typography} from "@mui/material";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <Box className={"RegisterPage"}>
      <Box className={"RegisterPage-banner"}>
        <Typography variant={"h2"} className={"RegisterPage-title"}>Formulario de registro</Typography>
      </Box>
      <Box className={"RegisterPage-form"}>
        <RegisterForm/>
      </Box>
    </Box>
  );
}

export default RegisterPage;
