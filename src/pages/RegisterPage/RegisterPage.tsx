import {Box, Typography} from "@mui/material";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <Box className={"RegisterPage"}>
      <Box>
        <Typography variant={"h3"} className={"RegisterPage-title"}>Formulario de registro</Typography>
      </Box>
      <RegisterForm/>
    </Box>
  );
}

export default RegisterPage;
