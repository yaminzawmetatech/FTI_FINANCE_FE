import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import permissionsetsService from './permissionsetsService'

const initialState = {
  permissions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get permission sets data
export const getPermissionsets = createAsyncThunk(
  'permissions',
  async (_, thunkAPI) => {
    try {
      return await permissionsetsService.getPermissions()
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

export const permissionsetsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermissionsets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPermissionsets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.permissions = action.payload.data
      })
      .addCase(getPermissionsets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = permissionsetsSlice.actions
export default permissionsetsSlice.reducer
