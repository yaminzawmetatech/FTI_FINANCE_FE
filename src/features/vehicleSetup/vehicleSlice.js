import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import VehicleService from "./VehicleService";
import { uniqBy } from "lodash";

const initialState = {
  vehicles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAllVehicles = createAsyncThunk(
  "vehicles/all",
  async ({ params }, thunkAPI) => {
    try {
      return await VehicleService.getAllVehicles(params);
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

export const getVehicles = createAsyncThunk(
  "vehicles",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await VehicleService.getVehicles(params, url);

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

export const createVehicle = createAsyncThunk(
  "vehicle/create",
  async ({ data }, thunkAPI) => {
    try {
      return await VehicleService.createVehicle(data);
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

export const updateVehicle = createAsyncThunk(
  "vehicle/update",
  async ({ data, uuid }, thunkAPI) => {
    try {
      return await VehicleService.updateVehicle(data, uuid);
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

export const deleteVehicle = createAsyncThunk(
  "vehicle/delete",
  async ({ uuid }, thunkAPI) => {
    try {
      return await VehicleService.deleteVehicle(uuid);
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

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicles = action.payload.data;
      })
      .addCase(getAllVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(getVehicles.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.vehicles = data;
        } else {
          state.vehicles = uniqBy(state.vehicles.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.vehicles = state.vehicles.push(action.payload);
        // state.vehicles = state.vehicles.push(data);

      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicles = state.vehicles.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = vehicleSlice.actions;
export default vehicleSlice.reducer;
