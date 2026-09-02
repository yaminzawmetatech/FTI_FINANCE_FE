import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contactTypeService from './contactTypeService'
// import Cookies from "js-cookie";
const initialState = {
  contactTypes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user contact types
export const getContactTypes = createAsyncThunk(
  'contactTypes',
  async (_, thunkAPI) => {
    try {
      return await contactTypeService.getContactTypes()
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


export const contactTypeSlice = createSlice({
  name: 'contactTypes',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getContactTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contactTypes = action.payload.data
      })
      .addCase(getContactTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = contactTypeSlice.actions
export default contactTypeSlice.reducer
