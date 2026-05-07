import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { Button, Avatar, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/profile.png";

import { logout } from "../redux/userSlice";
import { clearEducation } from "../redux/educationSlice";
import { clearProjects } from "../redux/projectSlice";
import { clearExperience } from "../redux/experienceSlice";
import { clearExtraDetails } from "../redux/extraDetailsSlice";
import { clearProfile } from "../redux/profileSlice";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Navbar.css';

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [sectionsAnchorEl, setSectionsAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleSectionsClick = (event) => setSectionsAnchorEl(event.currentTarget);
  const handleClose = () => { setAnchorEl(null); setSectionsAnchorEl(null); setIsDrawerOpen(false); };

  const handleLogout = () => {
    toast.success("Logout Successful!", { position: "top-left", autoClose: 1500, theme: "light" });
    dispatch(logout());
    dispatch(clearProfile());
    dispatch(clearEducation());
    dispatch(clearProjects());
    dispatch(clearExperience());
    dispatch(clearExtraDetails());
  };

  return (
    <nav className="nav-container">
      <AppBar position="static" style={{ backgroundColor: 'var(--bgColor)', color: 'black' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            {currentUser ? (
              <List>
                <ListItem button component={Link} to="/" onClick={handleClose}>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/profile" onClick={handleClose}>
                  <ListItemIcon><EditIcon /></ListItemIcon>
                  <ListItemText primary="Edit Resume" />
                </ListItem>
                <ListItem button component={Link} to="/templates" onClick={handleClose}>
                  <ListItemIcon><DescriptionIcon /></ListItemIcon>
                  <ListItemText primary="Templates" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            ) : (
              <div className="drawer-div"><h3>Login Please!</h3></div>
            )}
          </Drawer>

          <img className="logo" src={logo} alt="resume" width="40px" height="40px" />
          <Typography className="logo-text" variant="h5" sx={{ flexGrow: 1, marginLeft: "2px", fontWeight: "600" }}>
            <Link to="/" className="resume-builder-link">RESUME BUILDER</Link>
          </Typography>

          {currentUser ? (
            <>
              <Button color="inherit" onClick={handleSectionsClick}>Sections</Button>
              <Menu anchorEl={sectionsAnchorEl} open={Boolean(sectionsAnchorEl)} onClose={handleClose} 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>Profile</MenuItem>
                <MenuItem onClick={() => { navigate('/education'); handleClose(); }}>Education</MenuItem>
                <MenuItem onClick={() => { navigate('/projects'); handleClose(); }}>Projects</MenuItem>
                <MenuItem onClick={() => { navigate('/experience'); handleClose(); }}>Experience</MenuItem>
                <MenuItem onClick={() => { navigate('/extraDetails'); handleClose(); }}>Extra Details</MenuItem>
              </Menu>

              <Avatar src={currentUser?.avatar} alt="user" className="avatar" onClick={handleClick} />
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MenuItem onClick={() => { navigate('/user-profile'); handleClose(); }}>My Profile</MenuItem>
                <MenuItem onClick={() => { navigate('/templates'); handleClose(); }}>Templates</MenuItem>
                <MenuItem onClick={() => { navigate('/contact-us'); handleClose(); }}>Contact Us</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/sign-in" className="login-link"><Button color="inherit">Login</Button></Link>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
