import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import earlyTerminationFeesService from './earlyTerminationFeesSetupService'

const initialState = {
  earlyTerminationFees: [],
  earlyTerminationInfo: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get Data
export const getEarlyTerminationFees = createAsyncThunk(
    'earlyTerminationFees',
    async (_, thunkAPI) => {
      try {
        return await earlyTerminationFeesService.getEarlyTerminationFees()
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

export const getDataForEarlyTerminationByApplicationId = createAsyncThunk(
    'getInfoByApplicationId',
    async ({body}, thunkAPI) => {
      try {
        return await earlyTerminationFeesService.getDataForEarlyTerminationByApplicationId(body);
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
export const createEarlyTerminationFees = createAsyncThunk(
  'earlyTerminationFees/create',
  async (approvalWorkflowData, thunkAPI) => {
    try {
      return await earlyTerminationFeesService.createEarlyTerminationFees(approvalWorkflowData)
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
export const updateEarlyTerminationFees = createAsyncThunk(
    'earlyTerminationFees/update',
    async ({ id,newData }, thunkAPI) => {
      try {
        return await earlyTerminationFeesService.updateEarlyTerminationFees(id, newData)
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
export const deleteEarlyTerminationFees = createAsyncThunk(
  'earlyTerminationFees/delete',
  async (id, thunkAPI) => {
    try {
      return await earlyTerminationFeesService.deleteEarlyTerminationFees(id)
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

export const earlyTerminationFeesSlice = createSlice({
  name: 'earlyTerminationFees',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEarlyTerminationFees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEarlyTerminationFees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.earlyTerminationFees.push(action.payload)
      })
      .addCase(createEarlyTerminationFees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getEarlyTerminationFees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEarlyTerminationFees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.earlyTerminationFees = action.payload.data
      })
      .addCase(getEarlyTerminationFees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteEarlyTerminationFees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEarlyTerminationFees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.earlyTerminationFees = state.earlyTerminationFees.filter(
          (approvalWorkflow) => approvalWorkflow._id !== action.payload.id
        )
      })
      .addCase(deleteEarlyTerminationFees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateEarlyTerminationFees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEarlyTerminationFees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.earlyTerminationFees = action.payload.data
      })
      .addCase(updateEarlyTerminationFees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDataForEarlyTerminationByApplicationId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDataForEarlyTerminationByApplicationId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.earlyTerminationInfo = action.payload.data
      })
      .addCase(getDataForEarlyTerminationByApplicationId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = earlyTerminationFeesSlice.actions
export default earlyTerminationFeesSlice.reducer
