import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VehicleInformationService from "./VehicleInformationService";
import { uniqBy } from "lodash";

const initialState = {
  vehicleInformation: [],
  latestVehicleInformation: [],
  selectedVehicle: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAllVehicleInformation = createAsyncThunk(
  "vehicleInformation/all",
  async ({ params }, thunkAPI) => {
    try {
      return await VehicleInformationService.getAllVehicleInformation(params);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getVehicleInformation = createAsyncThunk(
  "vehicleInformation",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await VehicleInformationService.getVehicleInformation(params, url);

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
        info,
        data: response.data,
        firstFetch,
        next_page_param,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getVehicleInformationByUuid = createAsyncThunk(
  "vehicleInformation/getByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await VehicleInformationService.getVehicleInformationByUuid(uuid);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createVehicleInformation = createAsyncThunk(
  "vehicleInformation/create",
  async ({ data }, thunkAPI) => {
    try {
      return await VehicleInformationService.createVehicleInformation(data);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateVehicleInformation = createAsyncThunk(
  "vehicleInformation/update",
  async ({ data, uuid }, thunkAPI) => {
    try {
      return await VehicleInformationService.updateVehicleInformation(data, uuid);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteVehicleInformation = createAsyncThunk(
  "vehicleInformation/delete",
  async ({ uuid }, thunkAPI) => {
    try {
      return await VehicleInformationService.deleteVehicleInformation(uuid);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLatestVehicleInformation = createAsyncThunk(
  "vehicleInformation/latestVehicleInformation",
  async ({ params }, thunkAPI) => {
    try {
      return await VehicleInformationService.getLatestVehicleInformation(params);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const vehicleInformationSlice = createSlice({
  name: "vehicleInformation",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicleInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVehicleInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicleInformation = action.payload.data;
      })
      .addCase(getAllVehicleInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(getLatestVehicleInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLatestVehicleInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.latestVehicleInformation = action.payload.data;
      })
      .addCase(getLatestVehicleInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(getVehicleInformation.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getVehicleInformation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.vehicleInformation = data;
        } else {
          state.vehicleInformation = uniqBy(state.vehicleInformation.concat(data), "id");
        }
        state.next_page_param = next_page_param;
      })
      .addCase(getVehicleInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getVehicleInformationByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicleInformationByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedVehicle = action.payload;
      })
      .addCase(getVehicleInformationByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.selectedVehicle = null;
      })
      .addCase(createVehicleInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVehicleInformation.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createVehicleInformation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateVehicleInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicleInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicleInformation = state.vehicleInformation.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateVehicleInformation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteVehicleInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVehicleInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicleInformation = state.vehicleInformation.filter(
          (item) => item.id !== action.meta.arg.uuid
        );
      })
      .addCase(deleteVehicleInformation.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = vehicleInformationSlice.actions;
export default vehicleInformationSlice.reducer;
