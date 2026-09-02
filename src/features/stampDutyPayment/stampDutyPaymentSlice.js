import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import stampDutyPaymentService from "./stampDutyPaymentService";
import { uniqBy } from "lodash";

const initialState = {
  stampDutyPayments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  generalLedgerEnteriesSyncPost: [],
};

export const createStampDutyPayment = createAsyncThunk(
  "stampDutyPayment/createStampDutyPayment",
  async ({ body }, thunkAPI) => {
    try {
      return await stampDutyPaymentService.createStampDutyPayment(body);
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

export const updateStampDutyPayment = createAsyncThunk(
  "stampDutyPayment/updateStampDutyPayment",
  async ({ body, uuid }, thunkAPI) => {
    try {
      return await stampDutyPaymentService.updateStampDutyPayment(body, uuid);
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

export const changeStatusStampDutyPayment = createAsyncThunk(
  "stampDutyPayment/changeStatusStampDutyPayment",
  async ({ status, uuid }, thunkAPI) => {
    try {
      return await stampDutyPaymentService.changeStatusStampDutyPayment(
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

export const postStampDutyPayment = createAsyncThunk(
  "stampDutyPayment/postStampDutyPayment",
  async ({ uuid }, thunkAPI) => {
    try {
      return await stampDutyPaymentService.postStampDutyPayment(uuid);
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

export const settledStampDutyPayment = createAsyncThunk(
  "stampDutyPayment/settledStampDutyPayment",

  async ({ body, uuid }, thunkAPI) => {
    try {

      return await stampDutyPaymentService.settledStampDutyPayment(body, uuid);
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

export const getAllStampDutyPayments = createAsyncThunk(
  "stampDutyPayment/getAllStampDutyPayment",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await stampDutyPaymentService.getAllStampDutyPayments(
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

export const getStampDutyPaymentByUuid = createAsyncThunk(
  "stampDutyPayment/getStampDutyPaymentByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await stampDutyPaymentService.getStampDutyPaymentByUuid(uuid);
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

export const getGeneralLedgerEnteriesSyncPost = createAsyncThunk(
  "getGeneralLedgerEnteriesSyncPost",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await stampDutyPaymentService.getGeneralLedgerEnteriesSyncPost(
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

export const stampDutyPaymentSlice = createSlice({
  name: "stampDutyPayments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStampDutyPayments.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllStampDutyPayments.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.stampDutyPayments = data;
        } else {
          state.stampDutyPayments = uniqBy(
            state.stampDutyPayments.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllStampDutyPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createStampDutyPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStampDutyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.stampDutyPayments = action.payload.data;
      })
      .addCase(createStampDutyPayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getStampDutyPaymentByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStampDutyPaymentByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stampDutyPayments = action.payload.data;
      })
      .addCase(getStampDutyPaymentByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeStatusStampDutyPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusStampDutyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stampDutyPayments = action.payload.data;
      })
      .addCase(changeStatusStampDutyPayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateStampDutyPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStampDutyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stampDutyPayments = action.payload.data;
      })
      .addCase(updateStampDutyPayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(postStampDutyPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postStampDutyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stampDutyPayments = action.payload.data;
      })
      .addCase(postStampDutyPayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(settledStampDutyPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(settledStampDutyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stampDutyPayments = action.payload.data;
      })
      .addCase(settledStampDutyPayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getGeneralLedgerEnteriesSyncPost.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getGeneralLedgerEnteriesSyncPost.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.generalLedgerEnteriesSyncPost = data;
        } else {
          state.generalLedgerEnteriesSyncPost = uniqBy(
            state.generalLedgerEnteriesSyncPost.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getGeneralLedgerEnteriesSyncPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
  },
});

export const { reset } = stampDutyPaymentSlice.actions;
export default stampDutyPaymentSlice.reducer;
