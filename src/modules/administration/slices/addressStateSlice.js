import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import addressStateService from "../services/addressStateService"
// import Cookies from "js-cookie";
const initialState = {
  addressStates: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new State
export const createAddressState = createAsyncThunk(
  'addressStates/create',
  async (addressStateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await addressStateService.createAddressState(addressStateData, token)
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

// Get Address States
export const getAddressStates = createAsyncThunk(
  'addressStates',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await addressStateService.getAddressStates(token)
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

// Delete state
export const deleteAddressState = createAsyncThunk(
  'addressStates/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await addressStateService.deleteAddressState(id, token)
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

// update State
export const updateAddressState = createAsyncThunk(
  'addressStates/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await addressStateService.updateAddressState(id, newData, token)
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

// batch delete state
export const batchDeleteAddressStates = createAsyncThunk(
  'addressStates/batch-delete',
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await addressStateService.batchDeleteAddressStates(ids, token)
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

export const addressStateSlice = createSlice({
  name: 'addressStates',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddressState.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAddressState.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.addressStates.push(action.payload)
      })
      .addCase(createAddressState.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAddressStates.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAddressStates.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.addressStates = action.payload.data
      })
      .addCase(getAddressStates.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteAddressState.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAddressState.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.addressStates = state.addressStates.filter(
          (addressStates) => addressStates.id !== action.payload.id
        )
      })
      .addCase(deleteAddressState.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateAddressState.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAddressState.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.addressStates = action.payload.data
      })
      .addCase(updateAddressState.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = addressStateSlice.actions
export default addressStateSlice.reducer
