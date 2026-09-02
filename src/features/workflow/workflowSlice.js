import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workflowService from './workflowService'

const initialState = {
  workflows: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get Data
export const getWorkflows = createAsyncThunk(
    'workflows',
    async (_, thunkAPI) => {
      try {
        return await workflowService.getWorkflows()
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
export const createWorkflow = createAsyncThunk(
  'workflows/create',
  async (workflowData, thunkAPI) => {
    try {
      return await workflowService.createWorkflow(workflowData)
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
export const updateWorkflow = createAsyncThunk(
    'workflows/update',
    async ({ id,newData }, thunkAPI) => {
      try {
        return await workflowService.updateWorkflow(id, newData)
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
export const deleteWorkflow = createAsyncThunk(
  'workflows/delete',
  async (id, thunkAPI) => {
    try {
      return await workflowService.deleteWorkflow(id)
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

export const workflowSlice = createSlice({
  name: 'workflows',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkflow.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createWorkflow.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.workflows.push(action.payload)
      })
      .addCase(createWorkflow.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getWorkflows.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWorkflows.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.workflows = action.payload.data
      })
      .addCase(getWorkflows.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteWorkflow.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteWorkflow.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.workflows = state.workflows.filter(
          (workflow) => workflow._id !== action.payload.id
        )
      })
      .addCase(deleteWorkflow.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateWorkflow.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateWorkflow.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.workflows = action.payload.data
      })
      .addCase(updateWorkflow.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = workflowSlice.actions
export default workflowSlice.reducer
