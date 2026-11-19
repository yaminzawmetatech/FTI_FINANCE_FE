import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import kpayRepaymentHistoryService from "../services/kpayRepaymentHistoryService";
import { uniqBy } from "lodash";

const initialState = {
  kpayRepaymentHistories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAllKpayRepaymentHistories = createAsyncThunk(
  "generalLedger/getAllKpayRepaymentHistories",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response =
        await kpayRepaymentHistoryService.getAllKpayRepaymentHistories(params, url);
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

export const kpayRepaymentHistoriesSlice = createSlice({
  name: "kpayRepaymentHistories",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllKpayRepaymentHistories.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllKpayRepaymentHistories.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.kpayRepaymentHistories = data;
        } else {
          state.kpayRepaymentHistories = uniqBy(
            state.kpayRepaymentHistories.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      });
  },
});

export const { reset } = kpayRepaymentHistoriesSlice.actions;
export default kpayRepaymentHistoriesSlice.reducer;
