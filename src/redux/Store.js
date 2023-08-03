import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./GlobalSlice";
import authReducer from "./Auth/AuthSlice";
import recycleReducer from "./Recycling/RecyclingSlice";
import feedbackReducer from "./Feedback/FeedbackSlice";
import educationReducer from "./Education/EducationSlice";
import dashboardReducer from "./Dashboard/DashboardSlice";
import leaderboardReducer from "./Leaderboard/LeaderboardSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    recycle: recycleReducer,
    feedback: feedbackReducer,
    education: educationReducer,
    dashboard: dashboardReducer,
    leaderboard: leaderboardReducer,
  },
});
