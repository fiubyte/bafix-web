import {Box, Snackbar, Typography} from "@mui/material";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterPage.css";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";

const RegisterPage = () => {

  const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  return (
    <Box className={"RegisterPage"}>
      <Navbar isUserLoggedIn={false}/>
      <Box className={"RegisterPage-banner"}>
        <Typography variant={"h2"} className={"RegisterPage-title"}>Formulario de registro</Typography>
      </Box>
      <Box className={"RegisterPage-form"}>
        <RegisterForm handleSubmitError={() => setOpenErrorSnackBar(true)}/>
      </Box>
      <Snackbar
        open={openErrorSnackBar}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Error al registrarse, intentelo nuevamente."
      />
    </Box>
  );
}

export default RegisterPage;
