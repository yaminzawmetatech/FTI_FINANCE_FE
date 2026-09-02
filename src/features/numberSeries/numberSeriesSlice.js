import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import numberSeriesService from './numberSeriesService'
// import Cookies from "js-cookie";
const initialState = {
  numberSeries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new number series
export const createNumberSeries = createAsyncThunk(
  'number-series/create',
  async (numberSeriesData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await numberSeriesService.createNumberSeries(numberSeriesData, token)
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

// Get user number-series
export const getNumberSeries = createAsyncThunk(
  'number-series',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await numberSeriesService.getNumberSeries(token)
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

// Delete user number series
export const deleteNumberSeries = createAsyncThunk(
  'number-series/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await numberSeriesService.deleteNumberSeries(id, token)
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

export const updateNumberSeries = createAsyncThunk(
  'number-series/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await numberSeriesService.updateNumberSeries(id, newData, token)
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

export const numberSeriesSlice = createSlice({
  name: 'numberSeries',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNumberSeries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNumberSeries.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.numberSeries.push(action.payload)
      })
      .addCase(createNumberSeries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getNumberSeries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNumberSeries.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.numberSeries = action.payload.data
      })
      .addCase(getNumberSeries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteNumberSeries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNumberSeries.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.numberSeries = state.numberSeries.filter(
          (number_series) => number_series._id !== action.payload.id
        )
      })
      .addCase(deleteNumberSeries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateNumberSeries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNumberSeries.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.numberSeries = action.payload.data
        // state.number-series = state.number-series.filter(
        //   (department) => department._id !== action.payload.id
        // )
      })
      .addCase(updateNumberSeries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = numberSeriesSlice.actions
export default numberSeriesSlice.reducer
