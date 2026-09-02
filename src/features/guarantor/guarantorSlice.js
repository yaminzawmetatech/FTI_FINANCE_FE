import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import guarantorService from "./guarantorService";

const initialState = {
  guarantors: [],
  isLoading: false,
  next_page_url: null,
  createGuarantor: {
    isSubmitting: false,
  },
  guarantorDetail: {
    guarantor: null,
    isLoading: false,
  },
  deleteGuarantor: {
    isLoading: false,
  },
};

export const getGuarantor = createAsyncThunk(
  "guarantors/getGuarantor",
  async ({ id }, thunkAPI) => {
    try {
      return await guarantorService.getGuarantorApi(id);
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

export const getAllGuarantor = createAsyncThunk(
  "guarantors/getAllGuarantor",
  async (_, thunkAPI) => {
    try {
      return await guarantorService.getAllGuarantorApi();
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

export const getGuarantors = createAsyncThunk(
  "guarantors/getGuarantors",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await guarantorService.getGuarantorsApi(params, url);
      return {
        data: response.data,
        firstFetch,
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


export const createGuarantor = createAsyncThunk(
  "guarantors/createGuarantor",
  async ({ body }, thunkAPI) => {
    try {
      return await guarantorService.createGuarantorApi(body);
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

export const updateGuarantorByUuid = createAsyncThunk(
  "guarantors/updateGuarantorByUuid",
  async ({ id, body }, thunkAPI) => {
    try {
      return await guarantorService.updateGuarantorApi(id, body);
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


export const deleteGuarantorByUuid = createAsyncThunk(
  "guarantors/deleteGuarantorByUuid",
  async ({ id, applicationId }, thunkAPI) => {
    try {
      await guarantorService.deleteGuarantorApi(id, applicationId);
      return { id };
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
export const guarantorSlice = createSlice({
  name: "guarantors",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGuarantors.pending, (state) => {
        state.isLoading = true;
        state.next_page_url = null;
      })
      .addCase(getGuarantors.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data } = action.payload;
        if (firstFetch) {
          state.guarantors = data;
        } else {
          state.guarantors = state.guarantors.concat(data.data);
        }
        state.next_page_url = data.next_page_url;
        state.isLoading = false;
      })
      .addCase(getGuarantors.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createGuarantor.pending, (state) => {
        state.createGuarantor.isSubmitting = true;
      })
      .addCase(createGuarantor.fulfilled, (state, action) => {
        state.createGuarantor.isSubmitting = false;
        state.guarantors.unshift(action.payload.data);
      })
      .addCase(createGuarantor.rejected, (state, action) => {
        state.createGuarantor.isSubmitting = false;
      })
      .addCase(getGuarantor.pending, (state) => {
        state.guarantorDetail.isLoading = true;
      })
      .addCase(getGuarantor.fulfilled, (state, action) => {
        state.guarantorDetail.guarantor = action.payload.data;
        state.guarantorDetail.isLoading = false;
      })
      .addCase(getGuarantor.rejected, (state, action) => {
        state.guarantorDetail.isLoading = false;
      })
      .addCase(getAllGuarantor.pending, (state) => {
        state.guarantorDetail.isLoading = true;
      })
      .addCase(getAllGuarantor.fulfilled, (state, action) => {
        state.guarantorDetail.guarantor = action.payload.data.data;
        state.guarantorDetail.isLoading = false;
      })
      .addCase(getAllGuarantor.rejected, (state, action) => {
        state.guarantorDetail.isLoading = false;
      })
      .addCase(updateGuarantorByUuid.pending, (state) => {
        state.guarantorDetail.isLoading = true;
      })
      .addCase(updateGuarantorByUuid.fulfilled, (state, action) => {
        state.guarantorDetail.guarantor = action.payload.data;
        state.guarantorDetail.isLoading = false;
      })
      .addCase(updateGuarantorByUuid.rejected, (state, action) => {
        state.guarantorDetail.isLoading = false;
      })
      .addCase(deleteGuarantorByUuid.pending, (state) => {
        state.deleteGuarantor.isLoading = true;
      })
      .addCase(deleteGuarantorByUuid.fulfilled, (state, action) => {
        state.guarantors = state.guarantors.filter(
          (item) => item.id !== action.payload.id
        );
        state.deleteGuarantor.isLoading = false;
      })
      .addCase(deleteGuarantorByUuid.rejected, (state, action) => {
        state.deleteGuarantor.isLoading = false;
      });
  },
});

export const { reset } = guarantorSlice.actions;
export default guarantorSlice.reducer;
