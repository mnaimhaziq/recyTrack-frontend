import { createAsyncThunk } from "@reduxjs/toolkit";
import recycleService from "../RecyclingService";

//Create Recycling History
export const createRecyclingHistory = createAsyncThunk(
    "recycle/createRecyclingHistory",
    async ({ newFormData, token }, thunkAPI) => {
      try {
        const recycleHistory = await recycleService.createRecyclingHistory(
          newFormData,
          token
        );
        return recycleHistory;
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

 //Delete recycling History
 export const deleteRecycleHistory = createAsyncThunk(
  "recycle/deleteRecycleHistory",
  async ({ id, token }, thunkAPI) => {
    try {
      const recycleHistory = await recycleService.deleteRecycleHistory(
        id,
        token
      );
      return recycleHistory;
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

// Get All Recycling Histories
export const getAllRecyclingHistories = createAsyncThunk(
  "recycle/getAllRecyclingHistories",
  async (token, thunkAPI) => {
    try {
      const recycleHistories = await recycleService.getAllRecyclingHistories(
        token
      );
      return recycleHistories;
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


// Get recycle History by id
export const getRecycleHistoryById = createAsyncThunk(
  "recycle/getRecycleHistoryById",
  async ({ id, token }, thunkAPI) => {
    try {
      const recycleHistory = await recycleService.getRecycleHistoryById(
        id,
        token
      );
      return recycleHistory;
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

// Get Recycle History by User ID and Page
export const getRecycleHistoryByUserIdAndPage = createAsyncThunk(
  "recycle/getRecycleHistoryByUserIdAndPage",
  async ({ id, page, token }, thunkAPI) => {
    try {
      const recyclingHistoriesByUserIdAndPage =
        await recycleService.getRecycleHistoryByUserIdAndPage(id, page, token);
      return recyclingHistoriesByUserIdAndPage;
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

// Get Recycle History For All User By Page
export const getRecyclingHistoryForAllUsersByPage = createAsyncThunk(
  "recycle/getRecycleHistoryForAllUsersByPage",
  async ({page, token }, thunkAPI) => {
    try {
      const recyclingHistoriesForAllUsersByPage =
        await recycleService.getRecyclingHistoryForAllUsersByPage(page, token);
      return recyclingHistoriesForAllUsersByPage;
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

// Update recycle history by id
export const updateRecycleHistoryById = createAsyncThunk(
  "recycle/updateRecycleHistoryById",
  async ({ id, newFormData, token }, thunkAPI) => {
    try {
      const recycleHistory = await recycleService.updateRecycleHistoryById(
        id,
        newFormData,
        token
      );
      return recycleHistory;
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

