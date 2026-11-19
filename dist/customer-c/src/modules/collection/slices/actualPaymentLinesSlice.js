import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import actualPaymentLinesService from "../services/actualPaymentLinesService";
import { uniqBy } from "lodash";


const initialState = {
  actualPaymentLines: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  paymentHistory: null
};

export const getAllActualPaymentLines = createAsyncThunk(
  "actualPaymentLines",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      const response = await actualPaymentLinesService.getAllActualPaymentLines(params,token);

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
        info : info,
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

export const getPaymentLinesHistory = createAsyncThunk(
  "getPaymentLinesHistory",
  async ({uuid}, thunkAPI) => {
    try {
      return  await actualPaymentLinesService.getPaymentLinesHistory(uuid);
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


export const actualPaymentLinesSlice = createSlice({
  name: "actualPaymentLines",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllActualPaymentLines.pending, (state) => {
      state.isLoading = true;
      state.next_page_param = null;
    })
    .addCase(getAllActualPaymentLines.fulfilled, (state, action) => {
      state.isSuccess = true;
      const { firstFetch, data, next_page_param } = action.payload;
      if (firstFetch) {
        state.actualPaymentLines = data;
      } else {
        state.actualPaymentLines = uniqBy(state.actualPaymentLines.concat(data), "id");
      }

      state.next_page_param = next_page_param;
      state.isLoading = false;
    })
    .addCase(getAllActualPaymentLines.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.next_page_param = null;
    })
    .addCase(getPaymentLinesHistory.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getPaymentLinesHistory.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.paymentHistory = action.payload.data
    })
    .addCase(getPaymentLinesHistory.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  },
});

export const { reset } = actualPaymentLinesSlice.actions;
export default actualPaymentLinesSlice.reducer;
