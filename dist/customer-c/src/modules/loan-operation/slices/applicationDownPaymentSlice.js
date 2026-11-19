import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import applicationDownPaymentService from "../services/applicationDownPaymentService";

const initialState = {
  applicationDownPayments: [],
  isLoading: false,
  next_page_url: null,
  createApplicationDownPayment: {
    isSubmitting: false,
  },
  applicationDownPaymentDetail: {
    downPayment: null,
    isLoading: false,
  },
  deleteApplicationDownPayment: {
    isLoading: false,
  },
};

export const getApplicationDownPaymentByUuid = createAsyncThunk(
  "getApplicationDownPaymentByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await applicationDownPaymentService.getApplicationDownPaymentByUuid(uuid);
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

export const getApplicationDownPayments = createAsyncThunk(
  "getApplicationDownPayments",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await applicationDownPaymentService.getApplicationDownPaymentsApi(params, url);
      return {
        data: response.data,
        firstFetch,
      };
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

export const createApplicationDownPayment = createAsyncThunk(
  "applicationDownPayments/createApplicationDownPayment",
  async ({ body }, thunkAPI) => {
    try {
      return await applicationDownPaymentService.createApplicationDownPaymentApi(body);
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

export const updateApplicationDownPaymentByUuid = createAsyncThunk(
  "updateApplicationDownPaymentByUuid",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await applicationDownPaymentService.updateApplicationDownPaymentByUuid(uuid, body);
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


export const deleteApplicationDownPayment = createAsyncThunk(
  "deleteApplicationDownPayment",
  async ({ uuid }, thunkAPI) => {
    try {
      return await applicationDownPaymentService.deleteApplicationDownPayment(uuid);
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


export const applicationDownPaymentSlice = createSlice({
  name: "applicationDownPayments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationDownPayments.pending, (state) => {
        state.isLoading = true;
        state.next_page_url = null;
      })
      .addCase(getApplicationDownPayments.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data } = action.payload;
        if (firstFetch) {
          state.applicationDownPayments = data;
        } else {
          state.applicationDownPayments = state.applicationDownPayments.concat(data);
        }
        state.next_page_url = data.next_page_url;
        state.isLoading = false;
      })
      .addCase(getApplicationDownPayments.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createApplicationDownPayment.pending, (state) => {
        state.createApplicationDownPayment.isSubmitting = true;
      })
      .addCase(createApplicationDownPayment.fulfilled, (state, action) => {
        state.createApplicationDownPayment.isSubmitting = false;
        // state.applicationDownPayments.unshift(action.payload.data);
      })
      .addCase(createApplicationDownPayment.rejected, (state, action) => {
        state.createApplicationDownPayment.isSubmitting = false;
      })
      .addCase(getApplicationDownPaymentByUuid.pending, (state) => {
        state.applicationDownPaymentDetail.isLoading = true;
      })
      .addCase(getApplicationDownPaymentByUuid.fulfilled, (state, action) => {
        state.applicationDownPaymentDetail.downPayment = action.payload.data;
        state.applicationDownPaymentDetail.isLoading = false;
      })
      .addCase(getApplicationDownPaymentByUuid.rejected, (state, action) => {
        state.applicationDownPaymentDetail.isLoading = false;
      })
      .addCase(updateApplicationDownPaymentByUuid.pending, (state) => {
        state.applicationDownPaymentDetail.isLoading = true;
      })
      .addCase(updateApplicationDownPaymentByUuid.fulfilled, (state, action) => {
        state.applicationDownPaymentDetail.downPayment = action.payload.data;
        state.applicationDownPaymentDetail.isLoading = false;
      })
      .addCase(updateApplicationDownPaymentByUuid.rejected, (state, action) => {
        state.applicationDownPaymentDetail.isLoading = false;
      })
      .addCase(deleteApplicationDownPayment.pending, (state) => {
        state.deleteApplicationDownPayment.isLoading = true;
      })
      .addCase(deleteApplicationDownPayment.fulfilled, (state, action) => {
        state.applicationDownPayments = state.applicationDownPayments.filter(
          (item) => item.id !== action.payload.id
        );
        state.deleteApplicationDownPayment.isLoading = false;
      })
      .addCase(deleteApplicationDownPayment.rejected, (state, action) => {
        state.deleteApplicationDownPayment.isLoading = false;
      });
  },
});

export const { reset } = applicationDownPaymentSlice.actions;
export default applicationDownPaymentSlice.reducer;
