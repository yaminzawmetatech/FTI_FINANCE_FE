import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dealerService from "./dealerService";
import { uniqBy } from "lodash";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  guaranteeData: [],
  guaranteeCount: []
};

export const createGuaranteeData = createAsyncThunk(
  "guarantee/create",
  async (data, thunkAPI) => {
    try {
      return await dealerService.createGuaranteeData(data);
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

export const getGuaranteeData = createAsyncThunk(
  "guarantee",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await dealerService.getGuaranteeData(params, url);

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

export const updateGuaranteeData = createAsyncThunk(
  "guarantee/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await dealerService.updateGuaranteeData(id, newData);
    } catch (error) {
      console.log(error);
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

export const batchDeleteGuaranteeData = createAsyncThunk(
  "guaranteeData/batchDelete",
  async (ids, thunkAPI) => {
    try {
      return await dealerService.batchDeleteGuaranteeData(ids);
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

export const deleteGuaranteeData = createAsyncThunk(
  "guarantee/delete",
  async ({ id }, thunkAPI) => {
    try {
      return await dealerService.deleteGuaranteeData(id);
    } catch (error) {
      console.log(error);
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

export const getGuaranteeDataCount = createAsyncThunk(
  "guarantee/count",
  async ({ params }, thunkAPI) => {
    try {
      return await dealerService.getGuaranteeDataCount(params);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const dealerGuaranteeSlice = createSlice({
  name: "guarntee",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGuaranteeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGuaranteeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.guaranteeData.push(action.payload);
      })
      .addCase(createGuaranteeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGuaranteeData.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getGuaranteeData.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.guaranteeData = data;
        } else {
          state.guaranteeData = uniqBy(state.guaranteeData.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getGuaranteeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(updateGuaranteeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGuaranteeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.guaranteeData.push(action.payload);
      })
      .addCase(updateGuaranteeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGuaranteeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGuaranteeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.guaranteeData.push(action.payload);
      })
      .addCase(deleteGuaranteeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(batchDeleteGuaranteeData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(batchDeleteGuaranteeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.guaranteeData.push(action.payload);
      })
      .addCase(batchDeleteGuaranteeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGuaranteeDataCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGuaranteeDataCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.guaranteeCount = action.payload; // Store the count
      })
      .addCase(getGuaranteeDataCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

  },
});

export const { reset } = dealerGuaranteeSlice.actions;
export default dealerGuaranteeSlice.reducer;
