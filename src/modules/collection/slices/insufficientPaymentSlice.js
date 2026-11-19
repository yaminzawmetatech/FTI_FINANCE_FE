import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import insufficientPaymentService from "../services/insufficientPaymentService";
import { uniqBy } from "lodash";

const initialState = {
  insufficientContracts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getInsufficientPayments = createAsyncThunk(
  "insufficientPayments",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await insufficientPaymentService.getInsufficientPayments(params);

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

export const getInsufficientPaymentIds = createAsyncThunk(
  "guarantors/getGuarantor",
  async ({ params }, thunkAPI) => {
    try {
      return await insufficientPaymentService.getInsufficientPaymentIds(params);
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

export const insufficientPaymentSlice = createSlice({
  name: "insufficientPayments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInsufficientPayments.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getInsufficientPayments.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.insufficientContracts = data;
        } else {
          state.insufficientContracts = uniqBy(state.insufficientContracts.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getInsufficientPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getInsufficientPaymentIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInsufficientPaymentIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insufficientContracts = action.payload.data;
      })
      .addCase(getInsufficientPaymentIds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = insufficientPaymentSlice.actions;
export default insufficientPaymentSlice.reducer;
