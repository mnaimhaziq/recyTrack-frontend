import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import authService from "../../redux/Auth/AuthService";
import { useUser } from "../../context/UserContext";
import { useDispatch } from "react-redux";
import {
  changeUserRoleForSelf,
  logout,
  resetUser,
} from "../../redux/Auth/AuthSlice";
import Swal from "sweetalert2";
import { resetRecycling } from "../../redux/Recycling/RecyclingSlice";
import { resetEducation } from "../../redux/Education/EducationSlice";
import { resetDashboard } from "../../redux/Dashboard/DashboardSlice";
import CustomButton from "../../components/CustomButton";

const ManageUser = () => {
  const { id } = useParams();
  const user = useUser();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currUser, setCurrUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await authService.getUserById(user.token, id);
        setCurrUser(userResponse.user);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id, user.token]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetUser());
    dispatch(resetRecycling());
    dispatch(resetEducation());
    dispatch(resetDashboard());
    navigate("/");
  };

  const changeUserRole = async (id) => {
    await Swal.fire({
      title: "Change User Role",
      text:
        user._id === id
          ? "You are an admin. Changing your role will log you out."
          : "Changing the user's role will affect their permissions.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change Role",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userResponse = await authService.changeUserRole(user.token, id);
          setCurrUser(userResponse);
          if (user._id === id) {
            logoutHandler();
          }
          setIsLoading(false);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    });
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        mb={3}
        mx={isNonMobile ? "50px" : 0}
      >
        <Header title="User Details" />
      </Box>
      {isLoading ? (
        <Box textAlign="center">
          <Typography variant="body1">Loading...</Typography>
        </Box>
      ) : error ? (
        <Box textAlign="center">
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
        </Box>
      ) : (
        <Paper
          elevation={6}
          sx={{
            minHeight: "20vh",
            width: isNonMobile ? "70vh" : "100%",
            backgroundColor: theme.palette.background.alt,
            margin: isNonMobile ? "50px" : "5px",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {currUser && <UserInfoBox user={currUser} onClick={() => changeUserRole(currUser._id)}/>}

             
            
          
        </Paper>
      )}
    </div>
  );
};

export default ManageUser;



const UserInfoBox = ({ user, onClick }) => {
  const theme = useTheme();

  return (
  <>
     <Avatar
          alt={user.name}
          src={user.picture.secure_url}
          sx={{ width: 100, height: 100,marginY: '1rem' }}
        />

      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.address.street}, {user.address.city},{" "}
        {user.address.postalCode}, {user.address.country}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.isAdmin ? "Admin" : "Normal User"}
      </Typography>
      <CustomButton
                nonMobileText={user.isAdmin ? "Change to User" : "Change to Admin"}
                mobileText={user.isAdmin ? "Change to User" : "Change to Admin"}
                onClick={onClick}
              />
  </>
  );
};

