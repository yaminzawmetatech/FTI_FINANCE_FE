import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import disbursementPaymentService from "./disbursementPaymentService";
import { uniqBy } from "lodash";

const initialState = {
  disbursementPayments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};


export const createDisbursementPayment = createAsyncThunk(
  "disbursementPayment/createDisbursementPayment",
  async ({ body }, thunkAPI) => {
    try {
      return await disbursementPaymentService.createDisbursementPayment(body);
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


export const updateDisbursementPayment = createAsyncThunk(
  "disbursementPayment/updateDisbursementPayment",
  async ({ body, uuid }, thunkAPI) => {
    try {
      return await disbursementPaymentService.updateDisbursementPayment(body, uuid);
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

export const changeStatusDisbursementPayment = createAsyncThunk(
  "disbursementPayment/changeStatusDisbursementPayment",
  async ({ status, uuid }, thunkAPI) => {
    try {
      return await disbursementPaymentService.changeStatusDisbursementPayment(
        status,
        uuid
      );
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

export const postDisbursementPayment = createAsyncThunk(
  "disbursementPayment/postDisbursementPayment",
  async ({ uuid }, thunkAPI) => {
    try {
      return await disbursementPaymentService.postDisbursementPayment(uuid);
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

export const settledDisbursementPayment = createAsyncThunk(
  "disbursementPayment/settledDisbursementPayment",
  async ({ body, uuid }, thunkAPI) => {
    try {
      return await disbursementPaymentService.settledDisbursementPayment(body, uuid);
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

export const getAllDisbursementPayments = createAsyncThunk(
  "disbursementPayment/getAllDisbursementPayment",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await disbursementPaymentService.getAllDisbursementPayments(
        params,
        url
      );

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
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDisbursementPaymentByUuid = createAsyncThunk(
  "disbursementPayment/getDisbursementPaymentByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await disbursementPaymentService.getDisbursementPaymentByUuid(uuid);
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

export const disbursementPaymentSlice = createSlice({
  name: "disbursementPayments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDisbursementPayments.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllDisbursementPayments.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.disbursementPayments = data;
        } else {
          state.disbursementPayments = uniqBy(
            state.disbursementPayments.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllDisbursementPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createDisbursementPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDisbursementPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.disbursementPayments = action.payload.data;
      })
      .addCase(createDisbursementPayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getDisbursementPaymentByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDisbursementPaymentByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.disbursementPayments = action.payload.data;
      })
      .addCase(getDisbursementPaymentByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeStatusDisbursementPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusDisbursementPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.disbursementPayments = action.payload.data;
      })
      .addCase(changeStatusDisbursementPayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateDisbursementPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDisbursementPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.disbursementPayments = action.payload.data;
      })
      .addCase(updateDisbursementPayment.rejected, (state, action) => {
        state.isLoading = false;
      }) 
      .addCase(postDisbursementPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postDisbursementPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.disbursementPayments = action.payload.data;
      })
      .addCase(postDisbursementPayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(settledDisbursementPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(settledDisbursementPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.disbursementPayments = action.payload.data;
      })
      .addCase(settledDisbursementPayment.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = disbursementPaymentSlice.actions;
export default disbursementPaymentSlice.reducer;