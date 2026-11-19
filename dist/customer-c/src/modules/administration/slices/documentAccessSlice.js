import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import documentAccessService from "../services/documentAccessService"
const initialState = {
  documentAccess: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new documentAccess
export const createDocumentAccess = createAsyncThunk(
  'documentAccess/create',
  async (documentAccessData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await documentAccessService.createDocumentAccess(documentAccessData, token)
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



// Get user documentAccess
export const getDocumentAccesses = createAsyncThunk(
  'documentAccesses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await documentAccessService.getDocumentAccesses(token)
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

// Delete user documentAccess
export const deleteDocumentAccess = createAsyncThunk(
  'documentAccess/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await documentAccessService.deleteDocumentAccess(id, token)
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

export const updateDocumentAccess = createAsyncThunk(
  'documentAccess/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await documentAccessService.updateDocumentAccess(id, newData, token)
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

export const documentAccessSlice = createSlice({
  name: 'documentAccess',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDocumentAccess.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDocumentAccess.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documentAccesses.push(action.payload)
      })
      .addCase(createDocumentAccess.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDocumentAccesses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDocumentAccesses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documentAccesses = action.payload.data
      })
      .addCase(getDocumentAccesses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteDocumentAccess.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDocumentAccess.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documentAccesses = state.documentAccesses.filter(
          (documentAccess) => documentAccess._id !== action.payload.id
        )
      })
      .addCase(deleteDocumentAccess.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateDocumentAccess.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDocumentAccess.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documentAccess = action.payload.data
      })
      .addCase(updateDocumentAccess.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = documentAccessSlice.actions
export default documentAccessSlice.reducer
