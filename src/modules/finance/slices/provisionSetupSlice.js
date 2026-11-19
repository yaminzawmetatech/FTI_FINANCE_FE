import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import provisionSetupService from "../services/provisionSetupService";

const initialState = {
  provisionSetups: [],
  provisionSetupDetails: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getProvisionSetups = createAsyncThunk(
  "provision-setups",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await provisionSetupService.getProvisionSetups(params);

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

export const storeProvisionSetups = createAsyncThunk(
  "provision-setups/store",
  async (params, thunkAPI) => {
    try {

      return await provisionSetupService.storeProvisionSetups(params);

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

export const updateProvisionSetups = createAsyncThunk(
  "provision-setups/update",
  async (params, thunkAPI) => {
    try {

      return await provisionSetupService.updateProvisionSetups(params, params.uuid);

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

export const getProvisionSetupByUuid = createAsyncThunk(
  "provision-setups/getByUuid",
  async (uuid, thunkAPI) => {
    try {

      return await provisionSetupService.getProvisionSetupByUuid(uuid);

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

export const deleteProvisionSetupByUuid = createAsyncThunk(
  "provision-setups/resetDetails",
  async (uuid, thunkAPI) => {
    try {

      return await provisionSetupService.deleteProvisionSetupByUuid(uuid);

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

export const provisionSetupSlice = createSlice({
  name: "provisionSetup",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProvisionSetups.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getProvisionSetups.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.provisionSetups = data;
        } else {
          state.provisionSetups = uniqBy(
            state.provisionSetups.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getProvisionSetups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(storeProvisionSetups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(storeProvisionSetups.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(storeProvisionSetups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getProvisionSetupByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProvisionSetupByUuid.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.provisionSetupDetails = action.payload.data
      })
      .addCase(getProvisionSetupByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteProvisionSetupByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProvisionSetupByUuid.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteProvisionSetupByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateProvisionSetups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProvisionSetups.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(updateProvisionSetups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});


export const { reset } = provisionSetupSlice.actions;
export default provisionSetupSlice.reducer;
