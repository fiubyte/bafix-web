import {Box, Typography} from "@mui/material";
import "./AdminLoginPage.css"
import LoginForm from "../../components/LoginForm/LoginForm";
import {useState} from "react";
import {BaFixLogo} from "../../assets/Assets";

const AdminLoginPage = () => {

  const [loginError, setLoginError] = useState(false);

  return (
    <Box className={"AdminLoginPage"}>
      <Box className={"AdminLoginPage-logo"}>
        <BaFixLogo/>
      </Box>
      <Box className={"AdminLoginPage-form-container"}>
        {loginError && (
          <Box className={"AdminLoginPage-error"}>
            <Typography variant={"body1"} className={"AdminLoginPage-error-message"}>Error en el inicio de
              sesión</Typography>
          </Box>
        )}
        <LoginForm handleSubmitError={() => {
          console.log('Error en el inicio de sesión')
          setLoginError(true)
        }}/>
      </Box>
    </Box>
  )
}

export default AdminLoginPage;
