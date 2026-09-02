import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bankService from './bankService'
// import Cookies from "js-cookie";
const initialState = {
  banks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new bank
export const createBank = createAsyncThunk(
  'banks/create',
  async (bankData, thunkAPI) => {
    try {
      return await bankService.createBank(bankData)
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



// Get bank
export const getBanks = createAsyncThunk(
  'banks',
  async (_, thunkAPI) => {
    try {
      return await bankService.getBanks();
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

// Delete bank
export const deleteBank = createAsyncThunk(
  'banks/delete',
  async (id, thunkAPI) => {
    try {
      return await bankService.deleteBank(id)
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

export const updateBank = createAsyncThunk(
  'bank/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      return await bankService.updateBank(id, newData)
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

export const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBank.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBank.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.banks.push(action.payload)
      })
      .addCase(createBank.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBanks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBanks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.banks = action.payload.data
      })
      .addCase(getBanks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteBank.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBank.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.banks = state.banks.filter(
          (bank) => bank._id !== action.payload.id
        )
      })
      .addCase(deleteBank.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateBank.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBank.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.banks = action.payload.data
        // state.departments = state.departments.filter(
        //   (department) => department._id !== action.payload.id
        // )
      })
      .addCase(updateBank.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = bankSlice.actions
export default bankSlice.reducer
