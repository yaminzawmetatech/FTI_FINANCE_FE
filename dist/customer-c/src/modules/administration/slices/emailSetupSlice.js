import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import editEmailSetupService from "../services/emailSetupService"

const initialState = {
  emailSetups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new email setup
export const createEmailSetup = createAsyncThunk(
  'emailSetups/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await editEmailSetupService.createEmailSetup(data, token)
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

// Get email setups
export const getEmailSetups = createAsyncThunk(
  'emailSetups',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await editEmailSetupService.getEmailSetups(token)
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

// Delete email setup
export const deleteEmailSetup = createAsyncThunk(
  'emailSetups/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await editEmailSetupService.deleteEmailSetup(id, token)
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

// update email setup
export const updateEmailSetup = createAsyncThunk(
  'emailSetups/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await editEmailSetupService.updateEmailSetup(id, newData, token)
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

export const editEmailSetupSlice = createSlice({
  name: 'emailSetup',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmailSetup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEmailSetup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.emailSetups.push(action.payload)
      })
      .addCase(createEmailSetup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getEmailSetups.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEmailSetups.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.emailSetups = action.payload.data
      })
      .addCase(getEmailSetups.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteEmailSetup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEmailSetup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.emailSetups = state.emailSetups.filter(
          (emailSetup) => emailSetup._id !== action.payload.id
        )
      })
      .addCase(deleteEmailSetup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateEmailSetup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEmailSetup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.emailSetups = action.payload.data
        // state.departments = state.departments.filter(
        //   (department) => department._id !== action.payload.id
        // )
      })
      .addCase(updateEmailSetup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = editEmailSetupSlice.actions
export default editEmailSetupSlice.reducer
