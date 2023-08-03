import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  PersonOutlined
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode, updateDarkMode, logout, resetUser } from "../redux/Auth/AuthSlice";
import {
  AppBar,
  IconButton,
  Toolbar,
  useTheme,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem
} from "@mui/material";
import { resetRecycling } from "../redux/Recycling/RecyclingSlice";
import { resetEducation } from "../redux/Education/EducationSlice";
import { resetDashboard } from "../redux/Dashboard/DashboardSlice";
import { resetLeaderboard } from "../redux/Leaderboard/LeaderboardSlice";

function Navbar({user, isSidebarOpen, setIsSidebarOpen, isNonMobile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose =() => setAnchorEl(null);
  
  const setModeHandler = () => {
    dispatch(setMode());
    const userId = user._id
    dispatch(updateDarkMode({ userId, darkMode: theme.palette.mode === 'dark' ? 'light' : 'dark', token: user.token }));
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetUser());
    dispatch(resetRecycling())
    dispatch(resetEducation());
    dispatch(resetDashboard());
    dispatch(resetLeaderboard());
    navigate('/')

  };
  const profilehandler = () => {
    setAnchorEl(null)
    navigate(`/userprofile`)
    
  }



  return (
    <AppBar
      sx={{
        position: "sticky",
        background: `${theme.palette.background.default}`,
        boxShadow: "none",
        // boxShadow: `0px 0.5px 3px rgb(255,255,255)`,
        borderBottom: `0.5px solid ${theme.palette.grey[700]}`, 
        zIndex: "1099",
        marginBottom: "2rem"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFTSIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={setModeHandler}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
         
          <FlexBetween>
            <Button onClick={handleClick} sx={{display: "flex", justifyContent: "space-between", alignItems:"center", textTransform: "none", gap: "1rem"}}>
            <Box
                component="img"
                alt="profile"
                src={user.picture.secure_url}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              {/* <PersonOutlined  sx={{height:"32px",
                width:"32px", color: theme.palette.neutral[10]}}/> */}
              {isNonMobile && <>
                <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color:  theme.palette.neutral[10] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color:  theme.palette.neutral[10] }}
                >
                  {user.email}
                </Typography>
               
              </Box>
              <ArrowDropDownOutlined  sx={{color:  theme.palette.neutral[10], fontSize: '25px'}}/></>}
               
            </Button>
            <Menu anchorEl={anchorEl} open={isOpen}  onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center"}} >
              <MenuItem  onClick={profilehandler} sx={{padding: "7px 35px"}}>Profile</MenuItem>
              <MenuItem onClick={logoutHandler} sx={{padding: "7px 35px"}}>Log Out</MenuItem>

            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
