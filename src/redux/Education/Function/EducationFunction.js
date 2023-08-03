import { createAsyncThunk } from "@reduxjs/toolkit";
import EducationService from "../EducationService";

//Create Education
export const createEducation = createAsyncThunk(
    "education/create",
    async ({education, token },thunkAPI) => {
      try {
        return await EducationService.createEducation(education, token);
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

  export const getAllEducationByPages = createAsyncThunk(
    "education/getAllEducationByPages",
    async ({token, page }, thunkAPI) => {
      try {
        const educations = await EducationService.getAllEducationByPages(
          token,
          page
        );
  
        return educations;
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
  
    // Update Education by id
export const updateEducationById = createAsyncThunk(
  "education/updateEducationById",
  async ({ id, editFormData, token }, thunkAPI) => {
    try {
      const education = await EducationService.updateEducation(
        id,
        editFormData,
        token
      );
      return education;
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



  
