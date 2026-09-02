import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import kpayNotificationService from "./kpayNotificationService";
import { uniqBy } from "lodash";

const initialState = {
  kpayNotifications: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAllKpayNotifications = createAsyncThunk(
  "kpayNotifications/getAllKpayNotifications",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await kpayNotificationService.getAllKpayNotifications(
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


export const kpayNotificationSlice = createSlice({
  name: "kpayNotifications",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllKpayNotifications.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllKpayNotifications.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.kpayNotifications = data;
        } else {
          state.kpayNotifications = uniqBy(
            state.kpayNotifications.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllKpayNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      });
  },
});

export const { reset } = kpayNotificationSlice.actions;
export default kpayNotificationSlice.reducer;
