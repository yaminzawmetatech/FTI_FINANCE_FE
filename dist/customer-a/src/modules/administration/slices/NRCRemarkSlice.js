import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import nrcRemarkService from "../services/NRCRemarkService"

const initialState = {
  nrcRemarks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get NRC Remark
export const getNRCRemarks = createAsyncThunk(
  'nrcRemarks',
  async (_, thunkAPI) => {
    try {
      return await nrcRemarkService.getNRCRemarks()
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

export const NRCRemarkSlice = createSlice({
  name: 'nrcRemarks',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNRCRemarks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNRCRemarks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nrcRemarks = action.payload.data
      })
      .addCase(getNRCRemarks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })      
  },
})

export const { reset } = NRCRemarkSlice.actions
export default NRCRemarkSlice.reducer
