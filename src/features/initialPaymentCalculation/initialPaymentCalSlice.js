import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialPaymentCalculationService from "./initialPaymentCalService";

const initialState = {
  initialPaymentCalculations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isCalculating: false,
};

export const getInitialPaymentCalculation = createAsyncThunk(
  "initialPaymentCalculation/getInitialPaymentCalculation",
  async ({ params }, thunkAPI) => {
    try {
      return await initialPaymentCalculationService.getInitialPaymentCalculation({
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

export const createInitialPaymentCalculation = createAsyncThunk(
  "initialPaymentCalculation/createInitialPaymentCalculation",
  async ({ body }, thunkAPI) => {
    try {
      return await initialPaymentCalculationService.createInitialPaymentCalculationApi(body);
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

export const updateInitialPaymentCalculation = createAsyncThunk(
  "initialPaymentCalculation/updateInitialPaymentCalculation",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await initialPaymentCalculationService.updateInitialPaymentCalculation(uuid, body);
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

export const calculateInitialDownPayment = createAsyncThunk(
  "calculateInitialDownPayment",
  async ({ uuid,body }, thunkAPI) => {
    try {
      return await initialPaymentCalculationService.calculateInitialDownPayment(uuid,body);
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

export const initialPaymentCalculationSlice = createSlice({
  name: "initialPaymentCalculation",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialPaymentCalculation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInitialPaymentCalculation.fulfilled, (state, action) => {
        state.initialPaymentCalculations = action.payload.data;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getInitialPaymentCalculation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateInitialPaymentCalculation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInitialPaymentCalculation.fulfilled, (state, action) => {
        state.initialPaymentCalculations = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateInitialPaymentCalculation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createInitialPaymentCalculation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInitialPaymentCalculation.fulfilled, (state, action) => {
        state.initialPaymentCalculations = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createInitialPaymentCalculation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(calculateInitialDownPayment.pending, (state) => {
        state.isCalculating = true;
      })
      .addCase(calculateInitialDownPayment.fulfilled, (state, action) => {
        state.isSuccess = true;
        //state.initialPaymentCalculations = action.payload.data;
        state.isCalculating = false;
      })
      .addCase(calculateInitialDownPayment.rejected, (state, action) => {
        state.isCalculating = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {reset} = initialPaymentCalculationSlice.actions;
export default initialPaymentCalculationSlice.reducer;