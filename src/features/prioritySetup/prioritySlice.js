import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import priorityService from "./priorityService";
import {
  createSMS,
  deleteSMS,
  getSMS,
  getSMSByUuid,
  getValues,
  smsSlice,
  updateSMS,
} from "../smsSetup/smsSetupSlice";

const initialState = {
  priorities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  priority: {},
  priorityProperties: [],
};

export const getPriorities = createAsyncThunk(
  "getPriorities",
  async (_, thunkAPI) => {
    try {
      return await priorityService.getPriorities();
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

export const createPriority = createAsyncThunk(
  "priority/create",
  async (data, thunkAPI) => {
    try {
      return priorityService.createPriority(data);
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

export const updatePriority = createAsyncThunk(
  "priority/update",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return priorityService.updatePriority(uuid, body);
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

export const deletePriority = createAsyncThunk(
  "priority/delete",
  async (uuid, thunkAPI) => {
    try {
      return await priorityService.deletePriority(uuid);
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

export const getPriorityByUuid = createAsyncThunk(
  "priority/getByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await priorityService.getPriorityByUuid(uuid);
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

export const getPriorityProperties = createAsyncThunk(
  "priority/getPriorityProperties",
  async (_, thunkAPI) => {
    try {
      return await priorityService.getPriorityProperties();
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

export const prioritySlice = createSlice({
  name: "priorities",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPriority.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPriority.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.priorities = action.payload.data;
      })
      .addCase(createPriority.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPriorities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPriorities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.priorities = action.payload.data;
      })
      .addCase(getPriorities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePriority.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePriority.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.priorities = state.priorities.filter(
          (priority) => priority._id !== action.payload.id
        );
      })
      .addCase(deletePriority.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePriority.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePriority.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.priority = action.payload.data;
      })
      .addCase(updatePriority.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPriorityByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPriorityByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.priority = action.payload.data;
      })
      .addCase(getPriorityByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPriorityProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPriorityProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.priorityProperties = action.payload.data;
      })
      .addCase(getPriorityProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = prioritySlice.actions;
export default prioritySlice.reducer;
