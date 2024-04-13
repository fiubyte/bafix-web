import {Box, Typography} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";
import './MyServicesPage.css';

const MyServicesPage = () => {
  return (
    <Box className={"MyServicesPage"}>
      <Navbar isLoggedIn={false}/>
      <Box className={"MyServicesPage-banner"}>
        <Typography variant={"h2"} className={"MyServicesPage-title"}>Mis servicios</Typography>
      </Box>
    </Box>
  )
}

export default MyServicesPage;
