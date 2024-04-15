import {useState} from "react";
import {Box, Typography} from "@mui/material";
import "./ProviderLoginPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";


const ProviderLoginPage = () => {
  const [loginError, setLoginError] = useState(false);

  return (
    <Box className={"ProviderLoginPage"}>
      {loginError && (
        <Box className={"ProviderLoginPage-error"}>
          <Typography variant={"body1"} className={"ProviderLoginPage-error-message"}>Error en el inicio de sesión</Typography>
        </Box>
      )}
      <LoginForm handleSubmitError={() => {
        console.log('Error en el inicio de sesión')
        setLoginError(true)
      }}/>
    </Box>
  )
}

export default ProviderLoginPage;
