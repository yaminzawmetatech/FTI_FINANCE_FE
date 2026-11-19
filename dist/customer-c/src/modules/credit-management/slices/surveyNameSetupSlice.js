import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import surveyNameSetupService from "../services/surveyNameSetupService"
// import Cookies from "js-cookie";
const initialState = {
  surveyHeaders: [],
  surveyHeader:{},
  surveyQAsByHeader : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

}

// Create new survey header
export const createSurveyHeader = createAsyncThunk(
  'survey-headers/create',
  async (surveyHeaderData, thunkAPI) => {
    try {
      return await surveyNameSetupService.createSurveyHeader(surveyHeaderData)
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

// Get user survey-headers
export const getSurveyHeaders = createAsyncThunk(
  'survey-headers',
  async (_, thunkAPI) => {
    try {
      return await surveyNameSetupService.getSurveyHeaders()
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
export const deleteSurveyHeader = createAsyncThunk(
  'survey-headers/delete',
  async (id, thunkAPI) => {
    try {
      return await surveyNameSetupService.deleteSurveyHeader(id)
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

export const updateSurveyHeader = createAsyncThunk(
  'survey-headers/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      return await surveyNameSetupService.updateSurveyHeader(id, newData)
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

export const getSurveyHeaderByUuid = createAsyncThunk(
  'survey-headers/get-by-uuid',
  async ({ id }, thunkAPI) => {
    try {
      return await surveyNameSetupService.getSurveyHeaderByUuid(id)
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

export const getSurveyQAsByHeaderUuid = createAsyncThunk(
  'survey-headers/get-survey-qas-by-uuid',
  async ({ id,newData }, thunkAPI) => {
    try {
      return await surveyNameSetupService.getSurveyQAsByHeaderUuid(id)
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

export const surveyHeaderSlice = createSlice({
  name: 'surveyHeader',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSurveyHeader.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSurveyHeader.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyHeaders.push(action.payload)
      })
      .addCase(createSurveyHeader.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSurveyHeaders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSurveyHeaders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyHeaders = action.payload.data
      })
      .addCase(getSurveyHeaders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSurveyHeaderByUuid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSurveyHeaderByUuid.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyHeader = action.payload.data
      })
      .addCase(getSurveyHeaderByUuid.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSurveyQAsByHeaderUuid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSurveyQAsByHeaderUuid.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyQAsByHeader = action.payload.data
      })
      .addCase(getSurveyQAsByHeaderUuid.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteSurveyHeader.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSurveyHeader.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyHeaders = state.surveyHeaders.filter(
          (survey_header) => survey_header._id !== action.payload.id
        )
      })
      .addCase(deleteSurveyHeader.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateSurveyHeader.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSurveyHeader.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyHeaders = action.payload.data
        // state.survey-headers = state.survey-headers.filter(
        //   (department) => department._id !== action.payload.id
        // )
      })
      .addCase(updateSurveyHeader.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = surveyHeaderSlice.actions
export default surveyHeaderSlice.reducer
