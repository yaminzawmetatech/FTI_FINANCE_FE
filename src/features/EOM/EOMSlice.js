import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EOMService from "./EOMService";
import { uniqBy } from "lodash";

const initialState = {
  jobQueueLogEntries: [],
  jobQueueLogEntryDetails: null,
  createdJobQueueLogEntry: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  logTableLoading: false,
  message: "",
  next_page_param: null,
};

export const createEOM = createAsyncThunk(
  "EOMBOM/jobQueueLogEntry",
  async (body, thunkAPI) => {
    try {
      return await EOMService.createEOM(body);
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

export const getEOMLogEntries = createAsyncThunk(
  "EOMBOM/getEOMLogEntries",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {

      const response = await EOMService.getEOMLogEntries(params);

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

export const getEOMLogEntryByUuid = createAsyncThunk(
  "EOMBOM/getEOMLogEntryByUuid",
  async (Uuid, thunkAPI) => {
    try {

      return EOMService.getEOMLogEntryByUuid(Uuid);

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

export const EOMSlice = createSlice({
  name: "EOM",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEOM.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(createEOM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdJobQueueLogEntry = action.payload.data;
      })
      .addCase(createEOM.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getEOMLogEntries.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getEOMLogEntries.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.jobQueueLogEntries = data;
        } else {
          state.jobQueueLogEntries = uniqBy(
            state.jobQueueLogEntries.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getEOMLogEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getEOMLogEntryByUuid.pending, (state) => {
        state.logTableLoading = true;
      })
      .addCase(getEOMLogEntryByUuid.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.logTableLoading = false;
        state.jobQueueLogEntryDetails = action.payload.data
      })
      .addCase(getEOMLogEntryByUuid.rejected, (state, action) => {
        state.logTableLoading = false;
        state.isError = true;
      })
  },
});

export const { reset } = EOMSlice.actions;
export default EOMSlice.reducer;
