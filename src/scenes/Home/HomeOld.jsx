import React from "react";
import {
  Box,
  Typography,
  styled,
  Paper,
  Grid,
} from "@mui/material";
import { Container } from "@mui/system";
import HeroImg from "../../assets/HeroImg.png";
import { BarChart } from "@mui/icons-material";
import HomeNavbar from "./HomeNavbarOld";
import CustomButton from "../../components/CustomButton";
import { Link } from "react-scroll";
const Home = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <>
      <Box sx={{ backgroundColor: "#e4ffd3", minHeight: "100vh" }}>
        <Container>
          <HomeNavbar />
          <CustomBox sx={{ mt: 7 }}>
            <Box sx={{ flex: "1" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  color: "#687690",
                  fontWeight: "500",
                  mt: 10,
                  mb: 4,
                }}
              >
                Welcome to RecyTrack
              </Typography>
              <Title variant="h1">Enhance your Recycling with Reyctrack.</Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                Discover the best recycling opportunities with our comprehensive
                platform designed for sustainability enthusiasts!
              </Typography>
              <CustomButton
                backgroundColor="#0F1B4C"
                textColor="#fff"
                nonMobileText="More About Us"
                borderRadius="7px"
                fontWeight="700"
                padding="0.5rem 1.25rem"
              />
            </Box>

            <Box
              sx={{
                flex: "1.25",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 6,
              }}
            >
              <img
                src={HeroImg}
                alt="heroImg"
                style={{ maxWidth: "80%", marginBottom: "2rem" }}
              />
            </Box>
          </CustomBox>
          <Box className="mt-28">
            <Typography
              id="features"
              variant="h1"
              className="text-center  "
              sx={{ fontWeight: 600 }}
            >
              Features
            </Typography>
            <Grid container spacing={3} className="flex-1 justify-center">
              <Grid xs={12} sm={3} className="h-96 my-20 mx-6 ">
                <Paper
                  elevation={5}
                  className="h-full flex flex-col justify-center items-center"
                  sx={{ backgroundColor: "#0F1B4C" }}
                >
                  <BarChart className="text-white" sx={{ fontSize: "100px" }} />
                  <Typography variant="h5" className="text-white">
                    Track your recycling progress
                  </Typography>
                </Paper>
              </Grid>
              <Grid xs={12} sm={3} className="h-96 my-20 mx-6">
                <Paper
                  elevation={5}
                  className="h-full"
                  sx={{ backgroundColor: "#0F1B4C" }}
                >
                  Find the nearest recycling center
                </Paper>
              </Grid>
              <Grid xs={12} sm={3} className="h-96 my-20 mx-6">
                <Paper
                  elevation={5}
                  className="h-full"
                  sx={{ backgroundColor: "#0F1B4C" }}
                >
                  Sharing to Social Media
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
