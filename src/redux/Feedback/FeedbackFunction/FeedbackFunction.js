import { createAsyncThunk } from "@reduxjs/toolkit";
import feedbackService from "../FeedbackService";

//Create Feedback
export const createFeedback = createAsyncThunk(
    "feedback/create",
    async ({feedback, token },thunkAPI) => {
      try {
        return await feedbackService.createFeedback(feedback, token);
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

  export const getAllFeedbacksByPages = createAsyncThunk(
    "feedback/getAllFeedbacksByPages",
    async ({token, page }, thunkAPI) => {
      try {
        const feedbacks = await feedbackService.getAllFeedbacksByPages(
          token,
          page
        );
  
        return feedbacks;
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

  // Toggle Resolve Feedback
export const toggleResolveFeedback = createAsyncThunk(
  "feedback/toggleResolve",
  async ({ feedbackId, token }, thunkAPI) => {
    try {
      const updatedFeedback = await feedbackService.toggleResolveFeedback(feedbackId, token);
      return updatedFeedback;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

  //Delete Feedback
  export const deleteFeedback = createAsyncThunk(
    "feedback/deleteFeedback",
    async ({ id, token }, thunkAPI) => {
      try {
        const recycleCollection = await feedbackService.deleteRecycleCollection(
          id,
          token
        );
        return recycleCollection;
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
  
