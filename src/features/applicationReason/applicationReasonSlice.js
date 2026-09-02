import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import applicationReasonService from "./applicationReasonService";

const initialState = {
  applicationReasons: [],
  applicationReasonsByStatus: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createApplicationReason = createAsyncThunk(
  "applicationReason/create",
  async (data, thunkAPI) => {
    try {
      return await applicationReasonService.createApplicationReason(data);
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

export const getApplicationReasons = createAsyncThunk(
  "applicationReasons", 
  async (_, thunkAPI) => {
  try {
    return await applicationReasonService.getApplicationReasons();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getApplicationReasonsByStatus = createAsyncThunk(
  "applicationReasonsByStatus", 
  async ({status}, thunkAPI) => {
  try {
    return await applicationReasonService.getApplicationReasonsByStatus(status);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteApplicationReason = createAsyncThunk(
  "applicationReason/delete",
  async (id, thunkAPI) => {
    try {
      return await applicationReasonService.deleteApplicationReason(id);
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

export const updateApplicationReason = createAsyncThunk(
  "applicationReason/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await applicationReasonService.updateApplicationReason(id, newData);
    } catch (error) {
      console.log(error);
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

export const applicationReasonSlice = createSlice({
  name: "applicationReasons",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApplicationReason.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApplicationReason.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applicationReasons = action.payload.data;
      })
      .addCase(createApplicationReason.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getApplicationReasonsByStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicationReasonsByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applicationReasonsByStatus = action.payload.data;
      })
      .addCase(getApplicationReasonsByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getApplicationReasons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicationReasons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applicationReasons = action.payload.data;
      })
      .addCase(getApplicationReasons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteApplicationReason.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApplicationReason.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applicationReasons = state.applicationReasons.filter(
          (position) => position._id !== action.payload.id
        );
      })
      .addCase(deleteApplicationReason.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateApplicationReason.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApplicationReason.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applicationReasons = action.payload.data;
      })
      .addCase(updateApplicationReason.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = applicationReasonSlice.actions;
export default applicationReasonSlice.reducer;
