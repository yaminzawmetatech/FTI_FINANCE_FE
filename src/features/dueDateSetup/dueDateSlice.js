import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dueDateService from "./dueDateService";

const initialState = {
  dueDates: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createDueDate = createAsyncThunk(
  "dueDates/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dueDateService.createDueDate(data, token);
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

export const getDueDates = createAsyncThunk(
  "dueDates",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dueDateService.getDueDates(token);
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

export const deleteDueDate = createAsyncThunk(
  "dueDates/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dueDateService.deleteDueDate(id, token);
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

export const updateDueDate = createAsyncThunk(
  "dueDates/update",
  
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dueDateService.updateDueDate(id, newData, token);
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

export const dueDateSlice = createSlice({
  name: "dueDates",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDueDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDueDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dueDates.push(action.payload);
      })
      .addCase(createDueDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDueDates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDueDates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dueDates = action.payload.data;
      })
      .addCase(getDueDates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDueDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDueDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dueDates = state.dueDates.filter(
          (subcategory) => subcategory._id !== action.payload.id
        );
      })
      .addCase(deleteDueDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDueDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDueDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dueDates = action.payload.data;
      })
      .addCase(updateDueDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dueDateSlice.actions;
export default dueDateSlice.reducer;
