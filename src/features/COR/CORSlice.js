import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CORService from "./CORService";

const initialState = {
  COR: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCOR = createAsyncThunk(
  "getCOR",
  async ({ params }, thunkAPI) => {
    try {
      return await CORService.getCOR({
       params
      });
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

export const createCOR = createAsyncThunk(
  "createCOR",
  async ({ body }, thunkAPI) => {
    try {
      return await CORService.createCOR(body);
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

export const updateCOR = createAsyncThunk(
  "updateCOR",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await CORService.updateCOR(uuid, body);
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

export const getCORByUuid = createAsyncThunk(
  "getCORByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await CORService.getCORByUuid(uuid);
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


export const CORSlice = createSlice({
  name: "COR",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCOR.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCOR.fulfilled, (state, action) => {
        state.COR = action.payload.data;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getCOR.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCOR.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCOR.fulfilled, (state, action) => {
        state.COR = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateCOR.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCOR.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCOR.fulfilled, (state, action) => {
        state.COR = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createCOR.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCORByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCORByUuid.fulfilled, (state, action) => {
        state.COR = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getCORByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      ;
  },
});

export const {reset} = CORSlice.actions;
export default CORSlice.reducer;