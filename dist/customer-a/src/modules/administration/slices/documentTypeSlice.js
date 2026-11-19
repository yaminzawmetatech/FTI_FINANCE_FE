import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import documentTypeService from "../services/documentTypeService"
// import Cookies from "js-cookie";
const initialState = {
  documentTypes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new documentType
export const createDocumentType = createAsyncThunk(
  'documentType/create',
  async (documentTypeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await documentTypeService.createDocumentType(documentTypeData, token)
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



// Get documentTypes
export const getDocumentTypes = createAsyncThunk(
  'documentTypes',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await documentTypeService.getDocumentTypes(token)
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

// Delete user documentType
export const deleteDocumentType = createAsyncThunk(
  'documentType/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await documentTypeService.deleteDocumentType(id, token)
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

export const updatedocumentType = createAsyncThunk(
  'documentType/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await documentTypeService.updateDocumentType(id, newData, token)
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


export const documentTypeSlice = createSlice({
  name: 'documentType',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDocumentType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDocumentType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documentTypes.push(action.payload)
      })
      .addCase(createDocumentType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDocumentTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDocumentTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documentTypes = action.payload.data
      })
      .addCase(getDocumentTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteDocumentType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDocumentType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documentTypes = state.documentTypes.filter(
          (documentType) => documentType._id !== action.payload.id
        )
      })
      .addCase(deleteDocumentType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatedocumentType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatedocumentType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documentTypes = action.payload.data

      })
      .addCase(updatedocumentType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = documentTypeSlice.actions
export default documentTypeSlice.reducer
