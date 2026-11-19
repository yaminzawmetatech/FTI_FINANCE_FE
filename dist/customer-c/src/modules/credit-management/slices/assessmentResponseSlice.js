import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import assessmentResponseService from "../services/assessmentResponseService"
// import Cookies from "js-cookie";
const initialState = {
  assessmentResponses: [],
  externalAssessmentResponses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create 
export const createAssessmentResponse = createAsyncThunk(
  'assessmentResponses/create',
  async (departmentData, thunkAPI) => {
    try {
      return await assessmentResponseService.createAssessmentResponse(departmentData)
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

export const getAssessmentResponses = createAsyncThunk(
  'assessmentResponses',
  async (_, thunkAPI) => {
    try {
      return await assessmentResponseService.getAssessmentResponses()
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

export const getExternalResponses = createAsyncThunk(
  'externalResponses',
  async (status, thunkAPI) => {
    try {
      return await assessmentResponseService.getExternalResponses(status);
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
export const deleteAssessmentResponse = createAsyncThunk(
  'assessmentResponses/delete',
  async (id, thunkAPI) => {
    try {
      return await assessmentResponseService.deleteAssessmentResponse(id)
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

export const updateAssessmentResponse = createAsyncThunk(
  'department/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      return await assessmentResponseService.updateAssessmentResponse(id, newData)
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

export const assessmentResponseSlice = createSlice({
  name: 'assessmentResponse',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAssessmentResponse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAssessmentResponse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.assessmentResponses.push(action.payload)
      })
      .addCase(createAssessmentResponse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAssessmentResponses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAssessmentResponses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.assessmentResponses = action.payload.data
      })
      .addCase(getAssessmentResponses.rejected, (state, action) => {
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
        state.externalAssessmentResponses = action.payload.data
      })
      .addCase(getExternalResponses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteAssessmentResponse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAssessmentResponse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.assessmentResponses = state.assessmentResponses.filter(
          (department) => department._id !== action.payload.id
        )
      })
      .addCase(deleteAssessmentResponse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateAssessmentResponse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAssessmentResponse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.assessmentResponses = action.payload.data
      })
      .addCase(updateAssessmentResponse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = assessmentResponseSlice.actions
export default assessmentResponseSlice.reducer
