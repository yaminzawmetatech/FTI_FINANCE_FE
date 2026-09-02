import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reminderSetupService from './reminderSetupService'

const initialState = {
  reminders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get Data
export const getReminders = createAsyncThunk(
    'reminders',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.access_token
        return await reminderSetupService.getReminders(token)
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
export const createReminder = createAsyncThunk(
  'reminders/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await reminderSetupService.createReminder(data, token)
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
export const updateReminder = createAsyncThunk(
    'reminders/update',
    async ({ id,newData }, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.access_token
        return await reminderSetupService.updateReminder(id, newData, token)
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
export const deleteReminder = createAsyncThunk(
  'reminders/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await reminderSetupService.deleteReminder(id, token)
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

export const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReminder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createReminder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reminders.push(action.payload)
      })
      .addCase(createReminder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getReminders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getReminders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reminders = action.payload.data
      })
      .addCase(getReminders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteReminder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteReminder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reminders = state.reminders.filter(
          (approvalWorkflow) => approvalWorkflow._id !== action.payload.id
        )
      })
      .addCase(deleteReminder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateReminder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateReminder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reminders = action.payload.data
      })
      .addCase(updateReminder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = reminderSlice.actions
export default reminderSlice.reducer
