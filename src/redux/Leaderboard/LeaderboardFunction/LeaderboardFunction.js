import { createAsyncThunk } from "@reduxjs/toolkit";
import LeaderboardService from "../LeaderboardService";

export const calculatePoints = createAsyncThunk(
    "leaderboard/calculatePoints",
    async ({token }, thunkAPI) => {
      try {
        const recyclingPoints =
          await LeaderboardService.calculatePoints(token);
        return recyclingPoints;
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
  

export const calculatePointsById = createAsyncThunk(
  "leaderboard/calculatePointsById",
  async ({ id, token }, thunkAPI) => {
    try {
      const recyclingPointsById =
        await LeaderboardService.calculatePointsById(id, token);
      return recyclingPointsById;
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

export const calculateAndRankUsers = createAsyncThunk(
  "leaderboard/calculateAndRankUsers",
  async ({token }, thunkAPI) => {
    try {
      const eachUserPoints =
        await LeaderboardService.calculateAndRankUsers(token);
      return eachUserPoints;
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
