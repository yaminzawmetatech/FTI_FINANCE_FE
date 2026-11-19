import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allocateActivityService from "../services/allocateActivitiesService";

const initialState = {
  allocateActivities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createAllocateActivity = createAsyncThunk(
  "allocateActivities/create",
  async (addressWardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await allocateActivityService.createAllocateActivity(addressWardData, token);
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

export const getAllocateActivities = createAsyncThunk(
  "allocateActivities",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await allocateActivityService.getAllocateActivities(token, params);
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

export const deleteAllocateActivity = createAsyncThunk(
  "allocateActivities/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await allocateActivityService.deleteAllocateActivity(id, token);
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


export const updateAllocateActivity = createAsyncThunk(
  "allocateActivities/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await allocateActivityService.updateAllocateActivity(id, newData, token);
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

export const allocateActivitySlice = createSlice({
  name: "allocateActivities",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAllocateActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAllocateActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allocateActivities.push(action.payload);
      })
      .addCase(createAllocateActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllocateActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllocateActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allocateActivities = action.payload.data;
      })
      .addCase(getAllocateActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAllocateActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllocateActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allocateActivities = state.allocateActivities.filter(
          (allocateActivities) => allocateActivities._id !== action.payload.id
        );
      })
      .addCase(deleteAllocateActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAllocateActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAllocateActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allocateActivities = action.payload.data;
      })
      .addCase(updateAllocateActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = allocateActivitySlice.actions;
export default allocateActivitySlice.reducer;
