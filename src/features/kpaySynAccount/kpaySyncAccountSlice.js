import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import kpaySyncService from "./kpaySyncAccountService";

const initialState = {
  kpaySyncAccounts: null,
  next: null,
  previous: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
};

export const getKpaySyncAccounts = createAsyncThunk(
  "kpay/getKpaySyncAccounts",
  async (_, thunkAPI) => {
    try {
      return await kpaySyncService.getKpaySyncAccounts();
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

export const syncKpayAccounts = createAsyncThunk(
  "kpay/syncKpayAccounts",
  async (_, thunkAPI) => {
    try {
      return await kpaySyncService.syncKpayAccounts();
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

export const kpaySyncAccountsSlice = createSlice({
  name: "kpay",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKpaySyncAccounts.pending, (state) => {
        state.isLoading = true;
        state.kpaySyncAccounts = null;
        state.next = null;
        state.previous = null;
      })
      .addCase(getKpaySyncAccounts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.kpaySyncAccounts = action.payload.data;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.isLoading = false;
      })
      .addCase(getKpaySyncAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(syncKpayAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncKpayAccounts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.generalLedgerEntries = action.payload.data;
        state.isLoading = false;
      })
      .addCase(syncKpayAccounts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = kpaySyncAccountsSlice.actions;
export default kpaySyncAccountsSlice.reducer;
