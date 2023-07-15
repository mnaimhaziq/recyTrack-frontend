import { createAsyncThunk } from "@reduxjs/toolkit";
import feedbackService from "../feedbackService";

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
    "recycle/getAllFeedbacksByPages",
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
  
