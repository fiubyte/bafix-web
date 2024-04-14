import {Box, Button} from "@mui/material";
import "./SignInOrRegisterPage.css";
import { useNavigate } from "react-router-dom";

const SignInOrRegisterPage = () => {
  const navigate = useNavigate();
  return (
    <Box className={"SignInOrRegisterPage"}>
      <Box className={"SignInOrRegisterPage-button-container"}>
        <Button variant="outlined" color="primary"
                onClick={() => {navigate("/iniciar-sesion")}}
                className={"SignInOrRegisterPage-signin-button"}>Iniciar sesión</Button>
        <Button variant="outlined" color="primary"
                onClick={() => {navigate("/registro")}}
                className={"SignInOrRegisterPage-register-button"}>Registrarse</Button>
      </Box>
    </Box>
  )
}

export default SignInOrRegisterPage;
