import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mobCountService from "./mobCountService";
import { uniqBy } from "lodash";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  mobApplicationsCount: [],
  mobSurveysCount: [],
  mobDownPaymentsCount: [],
  mobContractsCount: [],
  mobSaleInvoicesCount: [],
  mobRemindersCount: [],
};

export const getMobApplicationsCount = createAsyncThunk(
  "mob/applicationsCount",
  async ({params}, thunkAPI) => {
    try {
      return await mobCountService.getMobApplicationsCount(params);
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

export const getMobSurveysCount = createAsyncThunk(
  "mob/surveysCount",
  async (_, thunkAPI) => {
    try {
      return await mobCountService.getMobSurveysCount();
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


export const getMobDownPaymentsCount = createAsyncThunk(
  "mob/downPaymentsCount",
  async (_, thunkAPI) => {
    try {
      return await mobCountService.getMobDownPaymentsCount();
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


export const getMobContractsCount = createAsyncThunk(
  "mob/contractsCount",
  async ({params}, thunkAPI) => {
    try {
      return await mobCountService.getMobContractsCount(params);
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

export const getMobSaleInvoicesCount = createAsyncThunk(
  "mob/saleInvoicesCount",
  async (_, thunkAPI) => {
    try {
      return await mobCountService.getMobSaleInvoicesCount();
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


export const getMobRemindersCount = createAsyncThunk(
  "mob/remindersCount",
  async (_, thunkAPI) => {
    try {
      return await mobCountService.getMobRemindersCount();
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

export const mobCountSlice = createSlice({
  name: "mobCount",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMobApplicationsCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMobApplicationsCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mobApplicationsCount = action.payload.data;
      })
      .addCase(getMobApplicationsCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMobSurveysCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMobSurveysCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mobSurveysCount = action.payload.data;
      })
      .addCase(getMobSurveysCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMobDownPaymentsCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMobDownPaymentsCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mobDownPaymentsCount = action.payload.data;
      })
      .addCase(getMobDownPaymentsCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMobContractsCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMobContractsCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mobContractsCount = action.payload.data;
      })
      .addCase(getMobContractsCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMobSaleInvoicesCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMobSaleInvoicesCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mobSaleInvoicesCount = action.payload.data;
      })
      .addCase(getMobSaleInvoicesCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMobRemindersCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMobRemindersCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mobRemindersCount = action.payload.data;
      })
      .addCase(getMobRemindersCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = mobCountSlice.actions;
export default mobCountSlice.reducer;
