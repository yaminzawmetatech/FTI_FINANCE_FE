import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import insufficientPaymentBatchService from "./insufficientPaymentBatchService";
import { uniqBy } from "lodash";

const initialState = {
  insufficientPaymentBatchs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createInsufficientPaymentBatch = createAsyncThunk(
  "insufficientPaymentBatch/createInsufficientPaymentBatch",
  async ({ body }, thunkAPI) => {
    try {
      return await insufficientPaymentBatchService.createInsufficientPaymentBatch(body);
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

export const updateInsufficientPaymentBatch = createAsyncThunk(
  "insufficientPaymentBatch/updateInsufficientPaymentBatch",
  async ({ body, uuid }, thunkAPI) => {
    try {
      return await insufficientPaymentBatchService.updateInsufficientPaymentBatch(body, uuid);
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

export const removeInsufficientPaymentContract = createAsyncThunk(
  "insufficientPaymentContract/remove",
  async ({ contract_id }, thunkAPI) => {
    try {
      return await insufficientPaymentBatchService.removeInsufficientPaymentContract(contract_id);
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

export const changeStatusInsufficientPaymentBatch = createAsyncThunk(
  "insufficientPaymentBatch/changeStatusInsufficientPaymentBatch",
  async ({ status, uuid }, thunkAPI) => {
    try {
      return await insufficientPaymentBatchService.changeStatusInsufficientPaymentBatch(
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

export const getAllInsufficientPaymentBatchs = createAsyncThunk(
  "insufficientPaymentBatch/getAllInsufficientPaymentBatchs",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await insufficientPaymentBatchService.getAllInsufficientPaymentBatchs(
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

export const getInsufficientPaymentBatchByUuid = createAsyncThunk(
  "insufficientPaymentBatch/getInsufficientPaymentBatchByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await insufficientPaymentBatchService.getInsufficientPaymentBatchByUuid(uuid);
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

// Post Insurance Payment
export const applyInsufficientPayment = createAsyncThunk(
  "insufficientPaymentBatch/applyInsufficientPayment",
  async ({ uuid }, thunkAPI) => {
    try {
      return await insufficientPaymentBatchService.applyInsufficientPayment(uuid);
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
export const changeRejectStatusInsufficientPaymentBatch = createAsyncThunk(
  "insurancePayment/changeRejectStatus",
  async ({ uuid }, thunkAPI) => {
    try {
      return await insufficientPaymentBatchService.changeRejectStatusInsufficientPaymentBatch(uuid);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const insufficientPaymentBatchSlice = createSlice({
  name: "insufficientPaymentBatchs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInsufficientPaymentBatchs.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllInsufficientPaymentBatchs.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.insufficientPaymentBatchs = data;
        } else {
          state.insufficientPaymentBatchs = uniqBy(
            state.insufficientPaymentBatchs.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllInsufficientPaymentBatchs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createInsufficientPaymentBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInsufficientPaymentBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createInsufficientPaymentBatch.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getInsufficientPaymentBatchByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInsufficientPaymentBatchByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insufficientPaymentBatchs = action.payload.data;
      })
      .addCase(getInsufficientPaymentBatchByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeStatusInsufficientPaymentBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusInsufficientPaymentBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insufficientPaymentBatchs = action.payload.data;
      })
      .addCase(changeStatusInsufficientPaymentBatch.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateInsufficientPaymentBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInsufficientPaymentBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insufficientPaymentBatchs = action.payload.data;
      })
      .addCase(updateInsufficientPaymentBatch.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeInsufficientPaymentContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeInsufficientPaymentContract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insufficientPaymentBatchs = action.payload.data;
      })
      .addCase(removeInsufficientPaymentContract.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(applyInsufficientPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyInsufficientPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //state.insufficientPaymentBatchs = action.payload.data;
      })
      .addCase(applyInsufficientPayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeRejectStatusInsufficientPaymentBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeRejectStatusInsufficientPaymentBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insufficientPaymentBatchs = action.payload.data;
      })
      .addCase(changeRejectStatusInsufficientPaymentBatch.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = insufficientPaymentBatchSlice.actions;
export default insufficientPaymentBatchSlice.reducer;
