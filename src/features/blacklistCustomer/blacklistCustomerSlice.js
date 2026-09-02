import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blacklistCustomerService from './blacklistCustomerService'


const initialState = {
  blacklistCustomers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get Data
export const getBlacklistCustomers = createAsyncThunk(
    'blacklistCustomers',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.access_token
        return await blacklistCustomerService.getBlacklistCustomers(token)
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

// Create New
export const createBlacklistCustomer = createAsyncThunk(
  'blacklistCustomers/create',
  async (blacklistCustomerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await blacklistCustomerService.createBlacklistCustomer(blacklistCustomerData, token)
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

// update 
export const updateBlacklistCustomer = createAsyncThunk(
    'blacklistCustomers/update',
    async ({ id,newData }, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.access_token
        return await blacklistCustomerService.updateBlacklistCustomer(id, newData, token)
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

// Delete 
export const deleteBlacklistCustomer = createAsyncThunk(
  'blacklistCustomers/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await blacklistCustomerService.deleteBlacklistCustomer(id, token)
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

// batch delete 
export const batchDeleteBlacklistCustomers = createAsyncThunk(
  'blacklistCustomers/batchDelete',
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await blacklistCustomerService.batchDeleteBlacklistCustomers(ids, token)
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

// Get Data by Blacklist uuid
export const getBlacklistCustomersById = createAsyncThunk(
  'blacklistCustomers/uuid',
  async ({ uuid }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await blacklistCustomerService.getBlacklistCustomersById(token,uuid)
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

export const blacklistCustomerSlice = createSlice({
  name: 'blacklistCustomers',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlacklistCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlacklistCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blacklistCustomers = action.payload.data
      })
      .addCase(createBlacklistCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBlacklistCustomers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlacklistCustomers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blacklistCustomers = action.payload.data
      })
      .addCase(getBlacklistCustomers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteBlacklistCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBlacklistCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blacklistCustomers = state.blacklistCustomers.filter(
          (blacklistCustomer) => blacklistCustomer._id !== action.payload.id
        )
      })
      .addCase(deleteBlacklistCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateBlacklistCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBlacklistCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blacklistCustomers = action.payload.data
      })
      .addCase(updateBlacklistCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getBlacklistCustomersById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlacklistCustomersById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blacklistCustomers = action.payload.data
      })
      .addCase(getBlacklistCustomersById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = blacklistCustomerSlice.actions
export default blacklistCustomerSlice.reducer
