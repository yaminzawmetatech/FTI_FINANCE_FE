import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import partnerApplicationListService from './PartnerApplicationListService'

const initialState = {
  partnerApplicationList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getPartnerApplicationList = createAsyncThunk(
  'applicationSetupList',
  async (_, thunkAPI) => {
    try {
      return await partnerApplicationListService.getPartnerApplicationList()
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

export const applicationSetupListSlice = createSlice({
  name: 'applicationSetupList',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartnerApplicationList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPartnerApplicationList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.partnerApplicationList = action.payload.data
      })
      .addCase(getPartnerApplicationList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = applicationSetupListSlice.actions
export default applicationSetupListSlice.reducer
