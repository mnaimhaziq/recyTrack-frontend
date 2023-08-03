import { createSlice } from "@reduxjs/toolkit";
import { calculateAndRankUsers, calculatePoints, calculatePointsById } from "./LeaderboardFunction/LeaderboardFunction";


const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: "",
  recyclingPoints: {},
  recyclingPointsById: {},
  eachUserPoints: [],
  message: "",
};

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    resetLeaderboard: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.recyclingPoints = {};
      state.recyclingPointsById = {};
      state.eachUserPoints = [];
     
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(calculatePoints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculatePoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recyclingPoints = action.payload;
      })
      .addCase(calculatePoints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(calculatePointsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculatePointsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recyclingPointsById = action.payload;
      })
      .addCase(calculatePointsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }).addCase(calculateAndRankUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculateAndRankUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.eachUserPoints = action.payload;
      })
      .addCase(calculateAndRankUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    ;
  },
});

export const { resetLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
