import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appliedSettlementDataService from "../services/appliedSettlementService";
import { uniqBy } from "lodash";

const initialState = {
  appliedSettlementData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAppliedSettlementData = createAsyncThunk(
  "generalLedger/getAppliedSettlementData",
  async ({ uuid, params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response =
        await appliedSettlementDataService.getAppliedSettlementData(uuid, params, url);
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

export const getAppliedSettlementInsufficientData = createAsyncThunk(
  "generalLedger/getAppliedSettlementInsufficientData",
  async ({ uuid, params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response =
        await appliedSettlementDataService.getAppliedSettlementInsufficientData(uuid, params, url);
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

export const postAppliedSettlementData = createAsyncThunk(
  "postAppliedSettlementData/post",
  async ({ uuid, params }, thunkAPI) => {
    try {
      return await appliedSettlementDataService.postAppliedSettlementData(uuid,params);
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

export const postAppliedSettlementinsufficientData = createAsyncThunk(
  "postAppliedSettlementinsufficientData/post",
  async ({ batch_id, params }, thunkAPI) => {
    try {
      return await appliedSettlementDataService.postAppliedSettlementinsufficientData(batch_id,params);
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
  name: "appliedSettlementData",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppliedSettlementData.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAppliedSettlementData.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.appliedSettlementData = data;
        } else {
          // state.applications = state.applications.concat(data);
          state.appliedSettlementData = uniqBy(
            state.appliedSettlementData.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAppliedSettlementData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getAppliedSettlementInsufficientData.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAppliedSettlementInsufficientData.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.appliedSettlementData = data;
        } else {
          // state.applications = state.applications.concat(data);
          state.appliedSettlementData = uniqBy(
            state.appliedSettlementData.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAppliedSettlementInsufficientData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(postAppliedSettlementData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postAppliedSettlementData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appliedSettlementData = action.payload.data;
      })
      .addCase(postAppliedSettlementData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postAppliedSettlementinsufficientData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postAppliedSettlementinsufficientData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appliedSettlementData = action.payload.data;
      })
      .addCase(postAppliedSettlementinsufficientData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = generalLedgerEntrySlice.actions;
export default generalLedgerEntrySlice.reducer;
