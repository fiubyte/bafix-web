import {Box, Snackbar, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";
import "./AddServicePage.css";
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm";

const AddServicePage = () => {

  const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  const categories = [
    {
      id: 0,
      name: "Albañilería",
      description: "Servicios de albañilería"
    },
    {
      id: 1,
      name: "Carpintería",
      description: "Servicios de carpintería"
    },
    {
      id: 2,
      name: "Plomería",
      description: "Servicios de plomería"
    },
    {
      id: 3,
      name: "Electricidad",
      description: "Servicios de electricidad"
    },
    {
      id: 4,
      name: "Jardinería",
      description: "Servicios de jardinería"
    }
  ];

  return (
    <Box className={"AddServicePage"}>
      <Navbar isLoggedIn={false}/>
      <Box className={"AddServicePage-banner"}>
        <Typography variant={"h2"} className={"AddServicePage-title"}>Formulario de nuevo servicio</Typography>
      </Box>
      <Box className={"AddServicePage-form"}>
        <AddServiceForm handleSubmitError={() => {
          setOpenErrorSnackBar(true);
        }} categories={categories}/>
      </Box>
      <Snackbar
        open={openErrorSnackBar}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Error al agregar servicio, intentelo nuevamente."
      />
    </Box>
  )
}

export default AddServicePage;
