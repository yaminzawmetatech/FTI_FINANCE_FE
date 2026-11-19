import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import surveyResultListService from "../services/surveyResultListService";
// import Cookies from "js-cookie";
const initialState = {
  surveyResultList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user survey question/answer
export const getSurveyResultList = createAsyncThunk(
  'survey-result-list',
  async (_, thunkAPI) => {
    try {
      return await surveyResultListService.getSurveyResultList()
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

export const surveyResultListSlice = createSlice({
  name: 'surveyResultList',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSurveyResultList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSurveyResultList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyResultList = action.payload.data
      })
      .addCase(getSurveyResultList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = surveyResultListSlice.actions
export default surveyResultListSlice.reducer
