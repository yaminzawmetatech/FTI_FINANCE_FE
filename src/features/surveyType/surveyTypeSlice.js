import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import surveyTypeService from './surveyTypeService'
// import Cookies from "js-cookie";
const initialState = {
  surveyTypes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user survey types
export const getsurveyTypes = createAsyncThunk(
  'surveyTypes',
  async (_, thunkAPI) => {
    try {
      return await surveyTypeService.getsurveyTypes()
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

export const surveyTypeSlice = createSlice({
  name: 'surveyTypes',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getsurveyTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getsurveyTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.surveyTypes = action.payload.data
      })
      .addCase(getsurveyTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = surveyTypeSlice.actions
export default surveyTypeSlice.reducer
