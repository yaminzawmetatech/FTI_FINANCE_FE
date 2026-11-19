import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressVillageTractService from "../services/addressVillageTractService";
import { uniqBy } from "lodash";

const initialState = {
  addressVillageTracts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  addressVillageTractData: [],
  next_page_param: null,
  addressVillageTractsForPermanentAddress: {
    addressVillageTracts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  addressVillageTractsForParkingAddress: {
    addressVillageTracts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

// Create new
export const createAddressVillageTract = createAsyncThunk(
  "addressVillageTracts/create",
  async (addressVillageTractData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageTractService.createAddressVillageTract(
        addressVillageTractData,
        token
      );
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

// Get
export const getAddressVillageTracts = createAsyncThunk(
  "addressVillageTracts",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageTractService.getAddressVillageTracts(
        token,
        params
      );
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

export const getAddressVillageTractList = createAsyncThunk(
  "addressVillageTracts/list",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await addressVillageTractService.getAddressVillageTractList(params, url);

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

// Get For PermanentAddress
export const getAddressVillageTractsForPermanentAddress = createAsyncThunk(
  "addressVillageTractsForPermanentAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageTractService.getAddressVillageTracts(
        token,
        params
      );
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

// Get For ParkingAddress
export const getAddressVillageTractsForParkingAddress = createAsyncThunk(
  "addressVillageTractsForParkingAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageTractService.getAddressVillageTracts(
        token,
        params
      );
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

// Delete
export const deleteAddressVillageTract = createAsyncThunk(
  "addressVillageTracts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageTractService.deleteAddressVillageTract(
        id,
        token
      );
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

// update
export const updateAddressVillageTract = createAsyncThunk(
  "addressVillageTracts/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageTractService.updateAddressVillageTract(
        id,
        newData,
        token
      );
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

// batch delete
export const batchDeleteAddressVillageTracts = createAsyncThunk(
  "addressVillageTracts/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageTractService.batchDeleteAddressVillageTracts(
        ids,
        token
      );
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

export const addressVillageTractSlice = createSlice({
  name: "addressVillageTracts",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetAddressVillageTracts: (state) => {
      state.addressVillageTracts = initialState.addressVillageTracts;
    },
    resetPermanentAddressVillageTracts: (state) => {
      state.addressVillageTractsForPermanentAddress = initialState.addressVillageTractsForPermanentAddress;
    },
    resetParkingAddressVillageTracts: (state) => {
      state.addressVillageTractsForParkingAddress = initialState.addressVillageTractsForParkingAddress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddressVillageTract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddressVillageTract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressVillageTracts.push(action.payload);
      })
      .addCase(createAddressVillageTract.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressVillageTracts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddressVillageTracts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressVillageTracts = action.payload.data;
      })
      .addCase(getAddressVillageTracts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressVillageTractList.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAddressVillageTractList.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.addressVillageTractData = data;
        } else {
          state.addressVillageTractData = uniqBy(state.addressVillageTractData.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAddressVillageTractList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteAddressVillageTract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddressVillageTract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressVillageTracts = state.addressVillageTracts.filter(
          (addressVillageTracts) =>
            addressVillageTracts._id !== action.payload.id
        );
      })
      .addCase(deleteAddressVillageTract.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAddressVillageTract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddressVillageTract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressVillageTracts = action.payload.data;
      })
      .addCase(updateAddressVillageTract.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressVillageTractsForPermanentAddress.pending, (state) => {
        state.addressVillageTractsForPermanentAddress.isLoading = true;
      })
      .addCase(
        getAddressVillageTractsForPermanentAddress.fulfilled,
        (state, action) => {
          state.addressVillageTractsForPermanentAddress.isLoading = false;
          state.addressVillageTractsForPermanentAddress.isSuccess = true;
          state.addressVillageTractsForPermanentAddress.addressVillageTracts =
            action.payload.data;
        }
      )
      .addCase(
        getAddressVillageTractsForPermanentAddress.rejected,
        (state, action) => {
          state.addressVillageTractsForPermanentAddress.isLoading = false;
          state.addressVillageTractsForPermanentAddress.isError = true;
          state.addressVillageTractsForPermanentAddress.message =
            action.payload;
        }
      )
      // Add cases for ParkingAddress
      .addCase(getAddressVillageTractsForParkingAddress.pending, (state) => {
        state.addressVillageTractsForParkingAddress.isLoading = true;
      })
      .addCase(
        getAddressVillageTractsForParkingAddress.fulfilled,
        (state, action) => {
          state.addressVillageTractsForParkingAddress.isLoading = false;
          state.addressVillageTractsForParkingAddress.isSuccess = true;
          state.addressVillageTractsForParkingAddress.addressVillageTracts =
            action.payload.data;
        }
      )
      .addCase(
        getAddressVillageTractsForParkingAddress.rejected,
        (state, action) => {
          state.addressVillageTractsForParkingAddress.isLoading = false;
          state.addressVillageTractsForParkingAddress.isError = true;
          state.addressVillageTractsForParkingAddress.message =
            action.payload;
        }
      );
  },
});

export const { reset, resetPermanentAddressVillageTracts, resetAddressVillageTracts, resetParkingAddressVillageTracts, } = addressVillageTractSlice.actions;
export default addressVillageTractSlice.reducer;
