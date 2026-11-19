import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import writeOffService from "../services/writeOffService";
import { uniqBy } from "lodash";

const initialState = {
  writeOffs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getWriteOffs = createAsyncThunk(
  "writeOffs",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await writeOffService.getWriteOffs(params);

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

export const getWriteOffIds = createAsyncThunk(
  "guarantors/getGuarantor",
  async ({ params }, thunkAPI) => {
    try {
      return await writeOffService.getWriteOffIds(params);
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

export const calculateAmountsByWriteOffMonth = createAsyncThunk(
  "writeOffs/changeStatusWriteOffBatch",
  async ({ params }, thunkAPI) => {
    try {
      return await writeOffService.calculateAmountsByWriteOffMonth( params );
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


export const writeOffSlice = createSlice({
  name: "writeOffs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWriteOffs.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getWriteOffs.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.writeOffs = data;
        } else {
          state.writeOffs = uniqBy(state.writeOffs.concat(data), "contract_id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getWriteOffs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(calculateAmountsByWriteOffMonth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculateAmountsByWriteOffMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffs = action.payload.data;
      })
      .addCase(calculateAmountsByWriteOffMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWriteOffIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWriteOffIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffs = action.payload.data;
      })
      .addCase(getWriteOffIds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = writeOffSlice.actions;
export default writeOffSlice.reducer;
