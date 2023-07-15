import { createSlice} from "@reduxjs/toolkit";
import { createFeedback, getAllFeedbacksByPages } from "./FeedbackFunction/FeedbackFunction"

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    error: "",
    feedback: {},
    feedbacks: [],
    
  message: "",
  };

  export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(createFeedback.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createFeedback.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
        })
        .addCase(createFeedback.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })  .addCase(getAllFeedbacksByPages.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllFeedbacksByPages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.feedbacks = action.payload;
          })
          .addCase(getAllFeedbacksByPages.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.feedbacks = null;
          })
       
    },
  });

  export const {  } = feedbackSlice.actions;
export default feedbackSlice.reducer;
