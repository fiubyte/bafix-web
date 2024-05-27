import React from 'react';
import {AppBar, Toolbar, IconButton, Box, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.css";
import {BaFixLettersWhite, BaFixLogo} from "../../assets/Assets";
import {useNavigate} from "react-router-dom";

interface NavbarProps {
  isUserLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({isUserLoggedIn}) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar className={"Navbar"}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon/>
        </IconButton>

        <Box className={"Navbar-logo-container"}>
          <Box className={"Navbar-logo"}>
            <BaFixLogo/>
          </Box>
          <Box className={"Navbar-logo-letters"}>
            <BaFixLettersWhite/>
          </Box>
        </Box>

        {!isUserLoggedIn && (
          <Box/>
        )}

        {isUserLoggedIn && (
          <Button color="inherit" onClick={
            () => {
              localStorage.removeItem("token");
              navigate("/");
            }
          }>Cerrar Sesión</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
