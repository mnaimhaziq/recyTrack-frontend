import { createSlice} from "@reduxjs/toolkit";
import { createEducation, getAllEducationByPages, updateEducationById} from "./Function/EducationFunction"

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    error: "",
    education: {},
    educations: [],
    media: [],
    message: "",
  };

  export const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {
      resetEducation: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.education =  {};
        state.educations = [];
      },
      currentEditEducation: (state, currentContent) => {
        state.education = currentContent;
      },
      setMedia: (state, media) => {
        state.media = media
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createEducation.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createEducation.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
        })
        .addCase(createEducation.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }) 
        .addCase(getAllEducationByPages.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllEducationByPages.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.educations = action.payload;
        })
        .addCase(getAllEducationByPages.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.educations = null;
        })
        .addCase(updateEducationById.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateEducationById.fulfilled, (state) => {
          state.isLoading = false;
          state.isSuccess = true;
        })
        .addCase(updateEducationById.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
       
    },
  });

  export const { resetEducation, currentEditEducation, setMedia } = educationSlice.actions;
export default educationSlice.reducer;
