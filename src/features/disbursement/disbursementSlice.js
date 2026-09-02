import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import disbursementService from "./disbursementService";

const initialState = {
  disbursements: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createDisbursement = createAsyncThunk(
  "disbursement/create",
  async (disbursementData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await disbursementService.createDisbursement(disbursementData, token);
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

export const getDisbursements = createAsyncThunk(
  "disbursements",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await disbursementService.getDisbursements(token);
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

export const deleteDisbursement = createAsyncThunk(
  "disbursement/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await disbursementService.deleteDisbursement(id, token);
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

export const updateDisbursement = createAsyncThunk(
  "disbursement/update",
  
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await disbursementService.updateDisbursement(id, newData, token);
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

export const disbursementSlice = createSlice({
  name: "disbursements",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDisbursement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDisbursement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.disbursements.push(action.payload);
      })
      .addCase(createDisbursement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDisbursements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDisbursements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.disbursements = action.payload.data;
      })
      .addCase(getDisbursements.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDisbursement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDisbursement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.disbursements = state.disbursements.filter(
          (subcategory) => subcategory._id !== action.payload.id
        );
      })
      .addCase(deleteDisbursement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDisbursement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDisbursement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.disbursements = action.payload.data;
      })
      .addCase(updateDisbursement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = disbursementSlice.actions;
export default disbursementSlice.reducer;
