import {Box, Snackbar, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";
import "./AddServicePage.css";
import AddServiceForm from "../../components/AddServiceForm/AddServiceForm";
import axios from "axios";
import config from "../../config";

const AddServicePage = () => {

  const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);
  const [categories, setCategories] = React.useState([
    {
      id: 1,
      title: "",
      description: ""
    }
  ]);

  React.useEffect(() => {
    axios.get(`${config.apiUrl}/service-categories/`,
      {headers: {"Authorization": `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_JWT_KEY)}`}})
      .then((response) => {
          setCategories(response.data);
        }
      ).catch((error) => {
      console.error(error);
      setOpenErrorSnackBar(true);
    })
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  return (
    <Box className={"AddServicePage"}>
      <Navbar isUserLoggedIn={true}/>
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
