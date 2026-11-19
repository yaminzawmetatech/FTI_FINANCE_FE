import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import smsHistoryService from "../services/smsHistoryService";
import { uniqBy } from "lodash";

const initialState = {
  smsHistories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAllSms = createAsyncThunk(
  "smsHistory/getAllSms",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await smsHistoryService.getAllSms(
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

export const smsHistorySlice = createSlice({
  name: "smsHistories",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSms.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllSms.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.smsHistories = data;
        } else {
          state.smsHistories = uniqBy(
            state.smsHistories.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllSms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      });
  },
});

export const { reset } = smsHistorySlice.actions;
export default smsHistorySlice.reducer;
