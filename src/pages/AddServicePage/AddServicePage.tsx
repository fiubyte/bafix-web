import {Box, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";
import "./AddServicePage.css";

const AddServicePage = () => {
  return (
    <Box className={"AddServicePage"}>
      <Navbar isLoggedIn={false}/>
      <Box className={"AddServicePage-banner"}>
        <Typography variant={"h2"} className={"AddServicePage-title"}>Formulario de nuevo servicio</Typography>
      </Box>

    </Box>
  )
}

export default AddServicePage;
