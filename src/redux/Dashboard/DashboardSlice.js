import { createSlice } from "@reduxjs/toolkit";
import {
  getMostRecycledWasteTypeByUserId,
  getMostRecycledWasteType,
  getTotalRecyclingHistory,
  getTotalRecyclingHistoryByUserId,
  getRecyclingPercentagesByUser,
  getRecyclingPercentages,
} from "./DashboardFunction/DashboardFunction";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: "",
  totalRecyclingHistory: {},
  totalRecyclingHistoryByUserId: {},
  mostRecycledWasteType: "",
  mostRecycledWasteTypeByUserId: "",
  wasteTypePercentages: {},
  wasteTypePercentagesByUserId: {},
  message: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboard: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.totalRecyclingHistory = {};
      state.totalRecyclingHistoryByUserId = {};
      state.mostRecycledWasteType = "";
      state.mostRecycledWasteTypeByUserId = "";
      state.wasteTypePercentages = {};
      state.wasteTypePercentagesByUserId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalRecyclingHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalRecyclingHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalRecyclingHistory = action.payload;
      })
      .addCase(getTotalRecyclingHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Total Recycling History By User ID
      .addCase(getTotalRecyclingHistoryByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalRecyclingHistoryByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalRecyclingHistoryByUserId = action.payload;
      })
      .addCase(getTotalRecyclingHistoryByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.totalRecyclingHistoryByUserId = {};
      })
      // Get Most Recycled Waste Type By User ID
      .addCase(getMostRecycledWasteTypeByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMostRecycledWasteTypeByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mostRecycledWasteTypeByUserId = action.payload;
      })
      .addCase(getMostRecycledWasteTypeByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.mostRecycledWasteType = {};
      })
      // Get Most Recycled Waste Type
      .addCase(getMostRecycledWasteType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMostRecycledWasteType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mostRecycledWasteType = action.payload;
      })
      .addCase(getMostRecycledWasteType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.mostRecycledWasteType = {};
      })
      // Get Percentage of Waste Type based on User ID
      .addCase(getRecyclingPercentagesByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecyclingPercentagesByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wasteTypePercentagesByUserId = action.payload;
      })
      .addCase(getRecyclingPercentagesByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.wasteTypePercentagesByUserId = null;
      }) // Get Percentage of Waste Type For All Users
      .addCase(getRecyclingPercentages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecyclingPercentages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wasteTypePercentages = action.payload;
      })
      .addCase(getRecyclingPercentages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.wasteTypePercentages = null;
      });
  },
});

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
