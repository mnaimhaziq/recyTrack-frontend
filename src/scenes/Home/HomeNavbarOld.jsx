import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import recycleLogo from "../../assets/recycleLogo.png";
import CustomButton from "../../components/CustomButton";
import { Link } from "react-scroll"; 

const HomeNavbar = () => {
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };
  const navigate = useNavigate();

  const handleNavigation = (sectionId) => {
    // Close the mobile menu
    setMobileMenu({ ...mobileMenu, left: false });

    // Scroll to the section
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: "smooth", // Add smooth scrolling effect
        block: "start",
      });
    }
  };

    
  const RegisterNavigationLink = () => {
    navigate("/register");
  };
  const LoginNavigationLink = () => {
    navigate("/login");
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          // ... (your existing code)
        ].map(({ text, icon, id }) => (
          <ListItem key={text} disablePadding>
            {/* Replace ListItemButton with Link from react-scroll */}
            <Link to={id} smooth={true} duration={500} offset={-64} onClick={() => handleNavigation(id)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    // "&:hover": {
    //   color: "#fff",
    // },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <NavbarLogo src={recycleLogo} alt="logo" width="40px" />
        </Box>

        <NavbarLinksBox>
          <NavLink variant="body2" className="hover:text-green-400">
            Home
          </NavLink>
          <NavLink variant="body2" className="hover:text-green-400">
            Features
          </NavLink>
          <NavLink variant="body2" className="hover:text-green-400">
            Services
          </NavLink>
          <NavLink variant="body2" className="hover:text-green-400">
            About Us
          </NavLink>
          <NavLink variant="body2" className="hover:text-green-400">
            Contact
          </NavLink>
        </NavbarLinksBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <NavLink variant="body2" onClick={RegisterNavigationLink}>
          Sign Up
        </NavLink>
        <NavLink variant="body2" onClick={LoginNavigationLink}>
          {" "}
          <CustomButton
            backgroundColor="#0F1B4C"
            textColor="#fff"
            nonMobileText="Login"
            mobileText="Login"
            borderRadius="7px"
            fontWeight="700"
            padding="0.5rem 1.25rem"
          />
        </NavLink>
      </Box>
    </NavbarContainer>
  );
};

export default HomeNavbar;
