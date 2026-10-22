import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import incompleteFieldsService from './incompleteFieldsService';

// import Cookies from "js-cookie";
const initialState = {
  incompleteFields: null,
  kpayFields: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getIncompleteFields = createAsyncThunk(
  'getIncompleteFields',
  async ({id}, thunkAPI) => {
    try {
      return await incompleteFieldsService.getIncompleteFields(id)
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

export const getKPayFields = createAsyncThunk(
  'getKPayFields',
  async ({uuid}, thunkAPI) => {
    try {
      return await incompleteFieldsService.getKPayFields(uuid)
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

export const saveIncompleteFields = createAsyncThunk(
  "incompleteFields/save",
  async ({ body }, thunkAPI) => {
    try {
      return await incompleteFieldsService.saveIncompleteFields(body);
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


export const updateIncompleteFields = createAsyncThunk(
  "incompleteFields/update",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await incompleteFieldsService.updateIncompleteFields(uuid,body);
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

export const notifyIncompleteFields = createAsyncThunk(
  "incompleteFields/notify",
  async ({ uuid }, thunkAPI) => {
    try {
      return await incompleteFieldsService.notifyIncompleteFields(uuid);
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


export const incompleteFieldsSlice = createSlice({
  name: 'applicationFields',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncompleteFields.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getIncompleteFields.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.incompleteFields = action.payload.data
      })
      .addCase(getIncompleteFields.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getKPayFields.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getKPayFields.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.kpayFields = action.payload.data
      })
      .addCase(getKPayFields.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(saveIncompleteFields.pending, (state) => {
        state.isLoading = true
      })
      .addCase(saveIncompleteFields.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.incompleteFields = action.payload.data
      })
      .addCase(saveIncompleteFields.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateIncompleteFields.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateIncompleteFields.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.incompleteFields = action.payload.data
      })
      .addCase(updateIncompleteFields.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(notifyIncompleteFields.pending, (state) => {
        state.isLoading = true
      })
      .addCase(notifyIncompleteFields.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.incompleteFields = action.payload.data
      })
      .addCase(notifyIncompleteFields.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      });
  },
})

export const { reset } = incompleteFieldsSlice.actions
export default incompleteFieldsSlice.reducer
