import React, { useEffect } from "react";
import Header from "../../components/Header";
import {
  Avatar,
  Box,
  Button,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { calculateAndRankUsers } from "../../redux/Leaderboard/LeaderboardFunction/LeaderboardFunction";
import { useUser } from "../../context/UserContext";
import FlexBetween from "../../components/FlexBetween";
import { Add, Share } from "@mui/icons-material";
import medal1 from '../../assets/medal1.png';
import medal2 from '../../assets/medal2.png';
import medal3 from '../../assets/medal3.png';

const HexagonWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  width: "60px", // Adjust the size of the hexagon frame (same as SmallerHexagonWrapper)
  height: "60px", // Adjust the size of the hexagon frame (same as SmallerHexagonWrapper)
  margin: "0 auto",
  clipPath: "polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)", // Adjust the clip path for the hexagon (same as SmallerHexagonWrapper)
  backgroundColor: theme.palette.primary.main, // Set the background color to transparent
  border: "2px solid #000", // Set the border color and width
  borderRadius: "8px", // Adjust the border radius to create a smoother corner (same as SmallerHexagonWrapper)
}));

const SmallerHexagonWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%", // Center the smaller hexagon vertically
  left: "50%", // Center the smaller hexagon horizontally
  transform: "translate(-50%, -50%)", // Center the smaller hexagon precisely
  width: "50px", // Adjust the size of the smaller hexagon frame
  height: "50px", // Adjust the size of the smaller hexagon frame
  clipPath: "polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)", // Adjust the clip path for the smaller hexagon
  backgroundColor: "transparent", // Set the background color to transparent
  border: "2px solid #000", // Set the border color and width
  borderRadius: "8px", // Adjust the border radius to create a smoother corner
}));

const HexagonImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px", // Adjust the border radius to match the hexagon corners
}));

const Leaderboard = () => {
  const isNonMobile = useMediaQuery("(min-width: 900px)");
  const user = useUser();
  const dispatch = useDispatch();
  const theme = useTheme();

  const eachUserPoints = useSelector(
    (state) => state.leaderboard.eachUserPoints
  );

  // Sort the users based on points in descending order
  const otherThanTopThreeUsers = eachUserPoints.slice(3);

  const sortedUsers = [...eachUserPoints].sort((a, b) => b.points - a.points);

  // Slice the sorted array to get the top 3 users
  const topThreeUsers = isNonMobile
    ? [sortedUsers[1], sortedUsers[0], sortedUsers[2]]
    : [sortedUsers[0], sortedUsers[1], sortedUsers[2]];

  const leaderboardItemHeights = ["55%", "45%", "35%"];
  const medals = [medal1, medal2, medal3];

  const getNumberSuffix = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    }
    return "th";
  };

  // Create a function to determine the background color based on position
  const getBackgroundColor = (idx) => {
    if (idx === 0) {
      // 1st place (Gold background)
      return "#FFD700";
    } else if (idx === 1) {
      // 2nd place (Silver background)
      return "#C0C0C0";
    } else if (idx === 2) {
      // 3rd place (Bronze background)
      return "#CD7F32";
    } else {
      // Other positions (Transparent background)
      return theme.palette.background.alt;
    }
  };

  useEffect(() => {
    dispatch(calculateAndRankUsers({ token: user.token }));
  }, [dispatch, user.token]);
  return (
    <Box m="1.5rem 2.5rem " p="0 0 4rem 0">
      <Box
        display={isNonMobile ? "flex" : "block"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Header title="Leaderboard" />
        <Box >
          <FlexBetween>
          <Button
            variant="contained"
            color="primary"
            sx={{
              
             
              color: "#000000",
              backgroundColor: theme.palette.primary.light,
             
            }}
          >
            <Share sx={{fontSize: '20px', mr: '0.5rem'}} /> {isNonMobile ? " Share your achievements" : " Share"}
          </Button>
          </FlexBetween>
         
        </Box>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
      <Grid container sx={{ justifyContent: "center" }}>
          {topThreeUsers &&
            topThreeUsers.map((rankeduser, idx) => {
              if (!rankeduser) {
                return null; // Skip rendering if the user is not defined
              }

              return (
                <Grid
                  key={rankeduser.rank} // Assuming there's an "id" property for each user in eachUserPoints array
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginY: "0.5rem",
                    minHeight: isNonMobile ? "40vh" : "35vh",
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: getBackgroundColor(rankeduser.rank - 1),

                      height: 100,
                      width: 100,
                      // Adjust the negative margin value to move the avatar up
                    }}
                  >
                    <Box
                      component="img"
                      alt="profile"
                      src={rankeduser.user_picture}
                      height="90px"
                      width="90px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover", border: "solid 0.5px black " }}
                    />
                  </Avatar>
                  <div>
                    <h3>{rankeduser.username}</h3>
                  </div>
                  <Box
                    sx={{
                      backgroundColor: getBackgroundColor(rankeduser.rank - 1),
                      border: "2px solid",
                      borderColor: "#141414",
                      borderRadius: "10px 10px 0 0 ",
                      textAlign: "center",
                      minWidth: "100%",
                      minHeight: isNonMobile
                        ? leaderboardItemHeights[rankeduser.rank - 1]
                        : leaderboardItemHeights[2],
                      marginBottom: "1rem", // Add some margin at the bottom for spacing
                    }}
                    className="flex justify-center items-end shadow-lg"
                  >
                    <div style={{ color: "black", }}  >
                      <img className="w-14"  src={medals[rankeduser.rank - 1]} alt="" />
                      <h4 style={{margin: 0}}>{rankeduser.totalPoints}</h4>
                      <h6>{`${rankeduser.rank}${getNumberSuffix(
                        rankeduser.rank
                      )} place`}</h6>
                    </div>
                  </Box>

                  {/* You can display the user image and other information here */}
                </Grid>
              );
            })}
                {otherThanTopThreeUsers &&
            otherThanTopThreeUsers.map((rankeduser, idx) => (
              <Grid
              key={rankeduser.rank}
                xs={12} lg={8}
                sx={{
                  backgroundColor: getBackgroundColor(rankeduser.rank),
                  border: "2px solid",
                  borderColor: !theme.palette.background.alt,
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "0.5rem",
                  marginY: "0.5rem",
                }}
              >
                <Box component="main" sx={{ flexGrow: 1 }}>
                  <Grid container >
                    <Grid
                      xs={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                      <Avatar
                    sx={{
                      backgroundColor: getBackgroundColor(rankeduser.rank - 1),

                      height: 60,
                      width: 60,
                      // Adjust the negative margin value to move the avatar up
                    }}
                  >
                    <Box
                      component="img"
                      alt="profile"
                      src={rankeduser.user_picture}
                      height="50px"
                      width="50px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover", border: "solid 0.5px black " }}
                    />
                  </Avatar>
                           <h6>{rankeduser.rank}{getNumberSuffix(rankeduser.rank)} Place</h6>
                      </div>
                    </Grid>
                    <Grid
                      xs={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                        <h5>{rankeduser.username.toUpperCase()}</h5>
                    </Grid>
                    <Grid
                      xs={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h5>Score: {!isNonMobile && <br/> } {rankeduser.totalPoints}</h5>
                    </Grid>
                  </Grid>
                  
                </Box>
              </Grid>
              
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Leaderboard;
