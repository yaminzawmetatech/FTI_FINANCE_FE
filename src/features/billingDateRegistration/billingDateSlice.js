import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import billingDateService from "./billingDateService";

const initialState = {
  billingDates: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createBillingDate = createAsyncThunk(
  "billingDate/create",
  async (billingDateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await billingDateService.createBillingDate(billingDateData, token);
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

export const getBillingDates = createAsyncThunk(
  "billingDate",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await billingDateService.getBillingDates(token);
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

export const deleteBillingDate = createAsyncThunk(
  "billingDate/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await billingDateService.deleteBillingDate(id, token);
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

export const updateBillingDate = createAsyncThunk(
  "billingDate/update",
  
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await billingDateService.updateBillingDate(id, newData, token);
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

export const billingDateSlice = createSlice({
  name: "billingDates",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBillingDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBillingDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.billingDates.push(action.payload);
      })
      .addCase(createBillingDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBillingDates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBillingDates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.billingDates = action.payload.data;
      })
      .addCase(getBillingDates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBillingDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBillingDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.billingDates = state.billingDates.filter(
          (subcategory) => subcategory._id !== action.payload.id
        );
      })
      .addCase(deleteBillingDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBillingDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBillingDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.billingDates = action.payload.data;
      })
      .addCase(updateBillingDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = billingDateSlice.actions;
export default billingDateSlice.reducer;
