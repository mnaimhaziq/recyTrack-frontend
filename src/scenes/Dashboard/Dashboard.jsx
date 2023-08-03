import React, { useEffect } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Container,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { DashboardTotalRecycling } from "./DashboardSummary/DashboardTotalRecycling";
import { DashboardPoint } from "./DashboardSummary/DashboardPoint";
import { DashboardMostType } from "./DashboardSummary/DashboardMostType";
import { DashboardTypeOfRecycling } from "./DashboardSummary/DashboardTypeOfRecycling";
import {
  getRecycleHistoryByUserIdAndPage,
  getRecyclingHistoryForAllUsersByPage,
} from "../../redux/Recycling/RecyclingFunction/HistoryFunction";
import { DashboardWelcome } from "./DashboardSummary/DashboardWelcome";
import { DashboardLatestHistory } from "./DashboardSummary/DashboardLatestHistory";
import { useUser } from "../../context/UserContext";
import {
  getTotalRecyclingHistory,
  getTotalRecyclingHistoryByUserId,
  getMostRecycledWasteTypeByUserId,
  getMostRecycledWasteType,
  getRecyclingPercentagesByUser,
  getRecyclingPercentages,
} from "../../redux/Dashboard/DashboardFunction/DashboardFunction";
import {
  calculatePoints,
  calculatePointsById,
} from "../../redux/Leaderboard/LeaderboardFunction/LeaderboardFunction";

function Dashboard() {
  const page = 1;

  const isNonMobile = useMediaQuery("(min-width: 942px)");
  const theme = useTheme();
  const user = useUser();
  const dispatch = useDispatch();
  const totalRecyclingHistoryByUserId = useSelector(
    (state) => state.dashboard.totalRecyclingHistoryByUserId
  );
  const recyclingPointsById = useSelector(
    (state) => state.leaderboard.recyclingPointsById
  );
  const recyclingPoints = useSelector(
    (state) => state.leaderboard.recyclingPoints
  );
  const recyclingHistoryByUserIdAndPage = useSelector(
    (state) => state.recycle.recyclingHistoryByUserIdAndPage
  );
  const recyclingHistoryForAllUsersByPage = useSelector(
    (state) => state.recycle.recyclingHistoryForAllUsersByPage
  );
  const mostRecycledWasteTypeByUserId = useSelector(
    (state) => state.dashboard.mostRecycledWasteTypeByUserId
  );

  const mostRecycledWasteType = useSelector(
    (state) => state.dashboard.mostRecycledWasteType
  );

  const wasteTypePercentagesByUserId = useSelector(
    (state) => state.dashboard.wasteTypePercentagesByUserId
  );

  const wasteTypePercentages = useSelector(
    (state) => state.dashboard.wasteTypePercentages
  );

  const totalRecyclingHistory = useSelector(
    (state) => state.dashboard.totalRecyclingHistory
  );

  const chartSeries = Object.values(
    user.isAdmin ? wasteTypePercentages : wasteTypePercentagesByUserId
  ).map(parseFloat);
  const labels = Object.keys(
    user.isAdmin ? wasteTypePercentages : wasteTypePercentagesByUserId
  );

  useEffect(() => {
    if (user.isAdmin) {
      dispatch(getRecyclingPercentages({ token: user.token }));
      dispatch(getTotalRecyclingHistory({ token: user.token }));
      dispatch(calculatePoints({ token: user.token }));
      dispatch(getMostRecycledWasteType({ token: user.token }));
      dispatch(
        getRecyclingHistoryForAllUsersByPage({
          page,
          token: user.token,
        })
      );
    } else {
      dispatch(
        getRecyclingPercentagesByUser({ id: user._id, token: user.token })
      );
      dispatch(
        getTotalRecyclingHistoryByUserId({ id: user._id, token: user.token })
      );
      dispatch(calculatePointsById({ id: user._id, token: user.token }));
      dispatch(
        getMostRecycledWasteTypeByUserId({ id: user._id, token: user.token })
      );
      dispatch(
        getRecycleHistoryByUserIdAndPage({
          id: user._id,
          page,
          token: user.token,
        })
      );
    }
  }, [dispatch, user._id, user.token]);

  return (
    <Box m="1.5rem 2.5rem " p="0 0 4rem 0">
      <Box
        display={isNonMobile ? "flex" : "block"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Header title="DASHBOARD" />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={3}>
            <DashboardWelcome
              sx={{
                height: "100%",
                backgroundColor: theme.palette.background.alt,
              }}
              value={75.5}
              user={user}
            />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            {totalRecyclingHistoryByUserId && (
              <DashboardTotalRecycling
                previousMonthTotal={
                  user.isAdmin
                    ? totalRecyclingHistory.previousTotal
                    : totalRecyclingHistoryByUserId.previousMonthTotal
                }
                difference={
                  user.isAdmin
                    ? totalRecyclingHistory.percentageChange
                    : totalRecyclingHistoryByUserId.percentageChange
                }
                positive={
                  user.isAdmin
                    ? totalRecyclingHistory.percentageChange >= 0
                    : totalRecyclingHistoryByUserId.percentageChange >= 0
                }
                sx={{
                  height: "100%",
                  backgroundColor: theme.palette.background.alt,
                }}
                value={
                  user.isAdmin
                    ? totalRecyclingHistory.totalQuantity
                    : totalRecyclingHistoryByUserId.totalQuantity
                }
              />
            )}
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <DashboardPoint
              difference={
                user.isAdmin
                  ? recyclingPoints.percentageChange
                  : recyclingPointsById.percentageChange
              }
              positive={
                user.isAdmin
                  ? recyclingPoints.percentageChange >= 0
                  : recyclingPointsById.percentageChange >= 0
              }
              sx={{
                height: "100%",
                backgroundColor: theme.palette.background.alt,
              }}
              value={
                user.isAdmin
                  ? recyclingPoints.totalPoints
                  : recyclingPointsById.totalPoints
              }
            />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            {(mostRecycledWasteType || mostRecycledWasteTypeByUserId) && (
              <DashboardMostType
                type={
                  user.isAdmin
                    ? mostRecycledWasteType
                    : mostRecycledWasteTypeByUserId
                }
                sx={{
                  height: "100%",
                  backgroundColor: theme.palette.background.alt,
                }}
              />
            )}
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <DashboardTypeOfRecycling
              chartSeries={chartSeries}
              labels={labels}
              sx={{
                height: "65vh",
                backgroundColor: theme.palette.background.alt,
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            {(recyclingHistoryByUserIdAndPage ||
              recyclingHistoryForAllUsersByPage) && (
              <DashboardLatestHistory
                recyclingHistories={
                  user.isAdmin
                    ? recyclingHistoryForAllUsersByPage.data
                    : recyclingHistoryByUserIdAndPage.data
                }
                sx={{
                  height: isNonMobile ? "65vh" : "65vh",
                  backgroundColor: theme.palette.background.alt,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
