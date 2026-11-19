import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import collectionFeesService from "../services/collectionFeesSetupService";

const initialState = {
  collectionFees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  collectionFeesPercentageTypes: []
}

// Get Data
export const getCollectionFees = createAsyncThunk(
    'collectionFees',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.access_token
        return await collectionFeesService.getCollectionFees(token)
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
export const createCollectionFees = createAsyncThunk(
  'collectionFees/create',
  async (approvalWorkflowData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await collectionFeesService.createCollectionFees(approvalWorkflowData, token)
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
export const updateCollectionFees = createAsyncThunk(
    'collectionFees/update',
    async ({ id,newData }, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.access_token
        return await collectionFeesService.updateCollectionFees(id, newData, token)
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
export const deleteCollectionFees = createAsyncThunk(
  'collectionFees/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await collectionFeesService.deleteCollectionFees(id, token)
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
);

export const getCollectionFeesPercentageTypes = createAsyncThunk(
  "collectionFeesPercentageType",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await collectionFeesService.getCollectionFeesPercentageTypes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const collectionFeesSlice = createSlice({
  name: 'collectionFees',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCollectionFees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCollectionFees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collectionFees.push(action.payload)
      })
      .addCase(createCollectionFees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCollectionFees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCollectionFees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collectionFees = action.payload.data
      })
      .addCase(getCollectionFees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCollectionFees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCollectionFees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collectionFees = state.collectionFees.filter(
          (approvalWorkflow) => approvalWorkflow._id !== action.payload.id
        )
      })
      .addCase(deleteCollectionFees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCollectionFees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCollectionFees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collectionFees = action.payload.data
      })
      .addCase(updateCollectionFees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCollectionFeesPercentageTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCollectionFeesPercentageTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collectionFeesPercentageTypes = action.payload.data
      })
      .addCase(getCollectionFeesPercentageTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = collectionFeesSlice.actions
export default collectionFeesSlice.reducer
