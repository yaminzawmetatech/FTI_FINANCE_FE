import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import surveyQASetupService from './surveyQASetupService';
// import Cookies from "js-cookie";
const initialState = {
  surveyQAs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new survey header
export const createSurveyQA = createAsyncThunk(
  'survey-qa-setups/create',
  async (surveyQAData, thunkAPI) => {
    try {
      return await surveyQASetupService.createSurveyQA(surveyQAData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Create new survey header
export const copySurveyQA = createAsyncThunk(
  'survey-qa-setups/copy',
  async (surveyQAData, thunkAPI) => {
    try {
      return await surveyQASetupService.copySurveyQA(surveyQAData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user survey question/answer
export const getSurveyQAs = createAsyncThunk(
  'survey-qa-setups',
  async (_, thunkAPI) => {
    try {
      return await surveyQASetupService.getSurveyQAs()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user survey question/answer
export const getSurveyQuestions = createAsyncThunk(
  'survey-questions',
  async ({ id }, thunkAPI) => {
    try {
      return await surveyQASetupService.getSurveyQuestions(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user survey header
export const deleteSurveyQA = createAsyncThunk(
  'survey-qa-setups/delete',
  async (id, thunkAPI) => {
    try {
      return await surveyQASetupService.deleteSurveyQA(id)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateSurveyQA = createAsyncThunk(
  'survey-qa-setups/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      return await surveyQASetupService.updateSurveyQA(id, newData)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const surveyQASlice = createSlice({
  name: 'surveyQA',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSurveyQA.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSurveyQA.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyQAs.push(action.payload)
      })
      .addCase(createSurveyQA.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSurveyQAs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSurveyQAs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyQAs = action.payload.data
      })
      .addCase(getSurveyQAs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteSurveyQA.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSurveyQA.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyQAs = state.surveyQAs.filter(
          (survey_header) => survey_header._id !== action.payload.id
        )
      })
      .addCase(deleteSurveyQA.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateSurveyQA.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSurveyQA.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyQAs = [action.payload.data];
        // state.survey-headers = state.survey-headers.filter(
        //   (department) => department._id !== action.payload.id
        // )
      })
      .addCase(updateSurveyQA.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSurveyQuestions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSurveyQuestions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyQuestions = action.payload.data
      })
      .addCase(getSurveyQuestions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = surveyQASlice.actions
export default surveyQASlice.reducer
