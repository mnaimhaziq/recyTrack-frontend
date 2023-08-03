import { createAsyncThunk } from "@reduxjs/toolkit";
import DashboardService from "../DashboardService";

export const getTotalRecyclingHistory = createAsyncThunk(
  "dashboard/getTotalRecyclingHistory",
  async ({ token }, thunkAPI) => {
    try {
      const totalRecyclingHistory =
        await DashboardService.getTotalRecyclingHistory(token);

      return totalRecyclingHistory;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTotalRecyclingHistoryByUserId = createAsyncThunk(
  "dashboard/getTotalRecyclingHistoryByUserId",
  async ({ id, token }, thunkAPI) => {
    try {
      const totalRecyclingHistoryByUserId =
        await DashboardService.getTotalRecyclingHistoryByUserId(id, token);
      return totalRecyclingHistoryByUserId;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Most Recycled Waste Type by id
export const getMostRecycledWasteTypeByUserId = createAsyncThunk(
  "dashboard/getMostRecycledWasteTypeByUserId",
  async ({ id, token }, thunkAPI) => {
    try {
      const mostRecycledWasteTypeByUserId =
        await DashboardService.getMostRecycledWasteTypeByUserId(id, token);
      return mostRecycledWasteTypeByUserId;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Most Recycled Waste Type
export const getMostRecycledWasteType = createAsyncThunk(
  "dashboard/getMostRecycledWasteType",
  async ({token }, thunkAPI) => {
    try {
      const mostRecycledWasteType =
        await DashboardService.getMostRecycledWasteType(token);
      return mostRecycledWasteType;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Percentage of Waste Type based on User ID
export const getRecyclingPercentagesByUser = createAsyncThunk(
  "dashboard/getRecyclingPercentagesByUser",
  async ({ id, token }, thunkAPI) => {
    try {
      const recyclingPercentagesByUser =
        await DashboardService.getRecyclingPercentagesByUser(id, token);
      return recyclingPercentagesByUser;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Percentage of Waste Type For All Users
export const getRecyclingPercentages = createAsyncThunk(
  "dashboard/getRecyclingPercentages",
  async ({ token }, thunkAPI) => {
    try {
      const recyclingPercentages =
        await DashboardService.getRecyclingPercentages(token);
      return recyclingPercentages;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
