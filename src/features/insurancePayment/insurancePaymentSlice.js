import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import insurancePaymentService from "./insurancePaymentService";
import { uniqBy } from "lodash";

const initialState = {
  insurancePayments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

// Create Insurance Payment
export const createInsurancePayment = createAsyncThunk(
  "insurancePayment/createInsurancePayment",
  async ({ body }, thunkAPI) => {
    try {
      return await insurancePaymentService.createInsurancePayment(body);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Insurance Payment
export const updateInsurancePayment = createAsyncThunk(
  "insurancePayment/updateInsurancePayment",
  async ({ body, uuid }, thunkAPI) => {
    try {
      return await insurancePaymentService.updateInsurancePayment(body, uuid);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Change Status of Insurance Payment
export const changeStatusInsurancePayment = createAsyncThunk(
  "insurancePayment/changeStatusInsurancePayment",
  async ({ status, uuid }, thunkAPI) => {
    try {
      return await insurancePaymentService.changeStatusInsurancePayment(status, uuid);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



// Post Insurance Payment
export const postInsurancePayment = createAsyncThunk(
  "insurancePayment/postInsurancePayment",
  async ({ uuid }, thunkAPI) => {
    try {
      return await insurancePaymentService.postInsurancePayment(uuid);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Settle Insurance Payment
export const settledInsurancePayment = createAsyncThunk(
  "insurancePayment/settledInsurancePayment",
  async ({ body, uuid }, thunkAPI) => {
    try {
      return await insurancePaymentService.settledInsurancePayment(body, uuid);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Insurance Payments
export const getAllInsurancePayments = createAsyncThunk(
  "insurancePayment/getAllInsurancePayments",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await insurancePaymentService.getAllInsurancePayments(params, url);
      const {
        metadata: { info },
      } = response;

      const remainingPages = Math.ceil(
        ((+info?.total || 0) - (+info?.offset || 0)) / +info?.limit || 10
      );

      const next_page_param =
        remainingPages >= 1
          ? {
              ...params,
              offset: (+info?.limit || 10) + (+info?.offset || 0),
            }
          : null;
      return {
        info: info,
        data: response.data,
        firstFetch,
        next_page_param,
      };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Insurance Payment by UUID
export const getInsurancePaymentByUuid = createAsyncThunk(
  "insurancePayment/getInsurancePaymentByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await insurancePaymentService.getInsurancePaymentByUuid(uuid);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const insurancePaymentSlice = createSlice({
  name: "insurancePayments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInsurancePayments.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllInsurancePayments.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.insurancePayments = data;
        } else {
          state.insurancePayments = uniqBy(
            state.insurancePayments.concat(data),
            "id"
          );
        }
        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllInsurancePayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createInsurancePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInsurancePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createInsurancePayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getInsurancePaymentByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInsurancePaymentByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insurancePayments = action.payload.data;
      })
      .addCase(getInsurancePaymentByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeStatusInsurancePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusInsurancePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insurancePayments = action.payload.data;
      })
      .addCase(changeStatusInsurancePayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateInsurancePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInsurancePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insurancePayments = action.payload.data;
      })
      .addCase(updateInsurancePayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(postInsurancePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postInsurancePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insurancePayments = action.payload.data;
      })
      .addCase(postInsurancePayment.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const { reset } = insurancePaymentSlice.actions;
export default insurancePaymentSlice.reducer;
