import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import nrcStateService from "../services/nrcStateService"
// import Cookies from "js-cookie";
const initialState = {
  nrcStates: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new State
export const createNRCState = createAsyncThunk(
  'nrcStates/create',
  async (nrcStateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await nrcStateService.createNRCState(nrcStateData, token)
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
export const getNRCStates = createAsyncThunk(
  'nrcStates',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await nrcStateService.getNRCStates(token)
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
export const deleteNRCState = createAsyncThunk(
  'nrcStates/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await nrcStateService.deleteNRCState(id, token)
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
export const updateNRCState = createAsyncThunk(
  'addressStates/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await nrcStateService.updateNRCState(id, newData, token)
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
export const batchDeleteNRCStates = createAsyncThunk(
  'nrcStates/batchDelete',
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await nrcStateService.batchDeleteNRCStates(ids, token)
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

export const NRCStateSlice = createSlice({
  name: 'nrcStates',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNRCState.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNRCState.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nrcStates.push(action.payload)
      })
      .addCase(createNRCState.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getNRCStates.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNRCStates.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nrcStates = action.payload.data
      })
      .addCase(getNRCStates.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteNRCState.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNRCState.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nrcStates = state.nrcStates.filter(
          (nrcStates) => nrcStates.id !== action.payload.id
        )
      })
      .addCase(deleteNRCState.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateNRCState.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNRCState.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nrcStates = action.payload.data
      })
      .addCase(updateNRCState.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = NRCStateSlice.actions
export default NRCStateSlice.reducer
