import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import applicationResponseService from './applicationResponseService'
// import Cookies from "js-cookie";
const initialState = {
  applicationResponses: [],
  externalResponses: [],
  internalResponses: [],
  applicationCardResponses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create 
export const createApplicationResponse = createAsyncThunk(
  'applicationResponse/create',
  async (departmentData, thunkAPI) => {
    try {
      return await applicationResponseService.createApplicationResponse(departmentData)
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

export const getApplicationAssessmentResponses = createAsyncThunk(
  'applicationResponses',
  async (_, thunkAPI) => {
    try {
      return await applicationResponseService.getApplicationAssessmentResponses()
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
);

export const getApplicationResponses = createAsyncThunk(
  'responses',
  async (_, thunkAPI) => {
    try {
      return await applicationResponseService.getApplicationResponses()
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
);

export const getAssessmentApprovedResponses = createAsyncThunk(
  'getAssessmentApprovedResponses',
  async (_, thunkAPI) => {
    try {
      return await applicationResponseService.getAssessmentApprovedResponses();
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
);

export const getExternalResponses = createAsyncThunk(
  'externalResponses',
  async ({type,status}, thunkAPI) => {
    try {
      return await applicationResponseService.getExternalResponses(type,status);
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
);

export const getInternalResponses = createAsyncThunk(
  'internalResponses',
  async ({type,status}, thunkAPI) => {
    try {
      return await applicationResponseService.getInternalResponses(type,status);
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
);


// Delete
export const deleteApplicationResponse = createAsyncThunk(
  'applicationResponse/delete',
  async (id, thunkAPI) => {
    try {
      return await applicationResponseService.deleteApplicationResponse(id)
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

export const updateApplicationResponse = createAsyncThunk(
  'applicationResponse/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      return await applicationResponseService.updateApplicationResponse(id, newData)
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

export const applicationResponseSlice = createSlice({
  name: 'applicationResponse',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApplicationResponse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createApplicationResponse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.applicationResponses.push(action.payload)
      })
      .addCase(createApplicationResponse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getApplicationAssessmentResponses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getApplicationAssessmentResponses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.applicationResponses = action.payload.data
      })
      .addCase(getApplicationAssessmentResponses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getApplicationResponses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getApplicationResponses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.applicationCardResponses = action.payload.data
      })
      .addCase(getApplicationResponses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAssessmentApprovedResponses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAssessmentApprovedResponses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.internalResponses = action.payload.data
      })
      .addCase(getAssessmentApprovedResponses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getExternalResponses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getExternalResponses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.externalResponses = action.payload.data
      })
      .addCase(getExternalResponses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getInternalResponses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInternalResponses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.internalResponses = action.payload.data
      })
      .addCase(getInternalResponses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteApplicationResponse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteApplicationResponse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.applicationResponses = state.applicationResponses.filter(
          (department) => department._id !== action.payload.id
        )
      })
      .addCase(deleteApplicationResponse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateApplicationResponse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateApplicationResponse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.applicationResponses = action.payload.data
      })
      .addCase(updateApplicationResponse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = applicationResponseSlice.actions
export default applicationResponseSlice.reducer
