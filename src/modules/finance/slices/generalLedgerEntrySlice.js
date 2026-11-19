import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import generalLedgerEntryService from "../services/generalLedgerEntryService";
import { uniqBy } from "lodash";

const initialState = {
  generalLedgerEntries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const syncGeneralLedgerEntries = createAsyncThunk(
  "generalLedger/syncGeneralLedgerEntries",
  async (_, thunkAPI) => {
    try {
      return await generalLedgerEntryService.syncGeneralLedgerEntries();
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

export const getAllGeneralLedgerEntries = createAsyncThunk(
  "generalLedger/getAllGeneralLedgerEntries",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response =
        await generalLedgerEntryService.getAllGeneralLedgerEntries(params, url);
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

export const generalLedgerEntrySlice = createSlice({
  name: "generalLedgerEntries",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGeneralLedgerEntries.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllGeneralLedgerEntries.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.generalLedgerEntries = data;
        } else {
          // state.applications = state.applications.concat(data);
          state.generalLedgerEntries = uniqBy(
            state.generalLedgerEntries.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllGeneralLedgerEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(syncGeneralLedgerEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncGeneralLedgerEntries.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.generalLedgerEntries = action.payload.data;
        state.isLoading = false;
      })
      .addCase(syncGeneralLedgerEntries.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = generalLedgerEntrySlice.actions;
export default generalLedgerEntrySlice.reducer;
