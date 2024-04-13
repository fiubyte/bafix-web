import React from 'react';
import {AppBar, Toolbar, IconButton, Avatar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.css"

interface NavbarProps {
  isLoggedIn: boolean;
  userPhoto?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, userPhoto }) => {
  return (
    <AppBar position="static">
      <Toolbar className={"Navbar"}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        {isLoggedIn && userPhoto && (
          <Avatar alt="User Photo" src={userPhoto}/>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
