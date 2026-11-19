import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import smsSetupService from "../services/smsSetupService"

const initialState = {
  sms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  values: []
}

// Get Data
export const getSMS = createAsyncThunk(
    'sms',
    async (_, thunkAPI) => {
      try {
        return await smsSetupService.getSMS()
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
export const createSMS = createAsyncThunk(
  'sms/create',
  async (data, thunkAPI) => {
    try {
      return await smsSetupService.createSMS(data)
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
export const updateSMS = createAsyncThunk(
    'sms/update',
    async ({ uuid, body }, thunkAPI) => {
      try {
        return await smsSetupService.updateSMS(uuid, body)
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
export const deleteSMS = createAsyncThunk(
  'sms/delete',
  async (id, thunkAPI) => {
    try {
      return await smsSetupService.deleteSMS(id)
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

export const getSMSByUuid = createAsyncThunk(
  'sms/getSMSByUUid',
  async ({ uuid }, thunkAPI) => {
    try {
      return await smsSetupService.getSMSByUuid(uuid)
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

export const getValues = createAsyncThunk(
  'sms/getValues',
  async (_, thunkAPI) => {
    try {
      return await smsSetupService.getValues()
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

export const smsSlice = createSlice({
  name: 'sms',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSMS.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSMS.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sms = action.payload.data
      })
      .addCase(createSMS.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSMS.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSMS.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sms = action.payload.data
      })
      .addCase(getSMS.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteSMS.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSMS.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sms = state.sms.filter(
          (approvalWorkflow) => approvalWorkflow._id !== action.payload.id
        )
      })
      .addCase(deleteSMS.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateSMS.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSMS.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sms = action.payload.data
      })
      .addCase(updateSMS.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSMSByUuid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSMSByUuid.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sms = action.payload.data
      })
      .addCase(getSMSByUuid.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getValues.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getValues.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.values = action.payload.data
      })
      .addCase(getValues.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = smsSlice.actions
export default smsSlice.reducer
