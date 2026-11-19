import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressVillageService from "../services/addressVillageService";
import { uniqBy } from "lodash";

const initialState = {
  addressVillages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  addressVillageData: [],
  next_page_param: null,
  addressVillagesForPermanentAddress: {
    addressVillages: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  addressVillagesForParkingAddress: {
    addressVillages: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

// Create new
export const createAddressVillage = createAsyncThunk(
  "addressVillages/create",
  async (addressVillageData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageService.createAddressVillage(
        addressVillageData,
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
export const getAddressVillages = createAsyncThunk(
  "addressVillages",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageService.getAddressVillages(token, params);
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

export const getAddressVillageList = createAsyncThunk(
  "addressVillages/list",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await addressVillageService.getAddressVillageList(params, url);

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
export const getAddressVillagesForPermanentAddress = createAsyncThunk(
  "addressVillagesForPermanentAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageService.getAddressVillages(token, params);
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
export const getAddressVillagesForParkingAddress = createAsyncThunk(
  "addressVillagesForParkingAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageService.getAddressVillages(token, params);
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
export const deleteAddressVillage = createAsyncThunk(
  "addressVillages/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageService.deleteAddressVillage(id, token);
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

// Update
export const updateAddressVillage = createAsyncThunk(
  "addressVillages/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageService.updateAddressVillage(
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
export const batchDeleteAddressVillages = createAsyncThunk(
  "addressVillages/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressVillageService.batchDeleteAddressVillages(ids, token);
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

export const addressVillageSlice = createSlice({
  name: "addressVillages",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetAddressVillages: (state) => {
      state.addressVillages = initialState.addressVillages;
    },
    resetPermanentAddressVillages: (state) => {
      state.addressVillagesForPermanentAddress = initialState.addressVillagesForPermanentAddress;
    },
    resetParkingAddressVillages: (state) => {
      state.addressVillagesForParkingAddress = initialState.addressVillagesForParkingAddress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddressVillage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddressVillage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressVillages.push(action.payload);
      })
      .addCase(createAddressVillage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressVillages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddressVillages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressVillages = action.payload.data;
      })
      .addCase(getAddressVillages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressVillageList.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAddressVillageList.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.addressVillageData = data;
        } else {
          state.addressVillageData = uniqBy(state.addressVillageData.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAddressVillageList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteAddressVillage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddressVillage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressVillages = state.addressVillages.filter(
          (addressVillages) => addressVillages._id !== action.payload.id
        );
      })
      .addCase(deleteAddressVillage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAddressVillage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddressVillage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressVillages = action.payload.data;
      })
      .addCase(updateAddressVillage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressVillagesForPermanentAddress.pending, (state) => {
        state.addressVillagesForPermanentAddress.isLoading = true;
      })
      .addCase(
        getAddressVillagesForPermanentAddress.fulfilled,
        (state, action) => {
          state.addressVillagesForPermanentAddress.isLoading = false;
          state.addressVillagesForPermanentAddress.isSuccess = true;
          state.addressVillagesForPermanentAddress.addressVillages =
            action.payload.data;
        }
      )
      .addCase(
        getAddressVillagesForPermanentAddress.rejected,
        (state, action) => {
          state.addressVillagesForPermanentAddress.isLoading = false;
          state.addressVillagesForPermanentAddress.isError = true;
          state.addressVillagesForPermanentAddress.message = action.payload;
        }
      )
      // Parking Address
      .addCase(getAddressVillagesForParkingAddress.pending, (state) => {
        state.addressVillagesForParkingAddress.isLoading = true;
      })
      .addCase(
        getAddressVillagesForParkingAddress.fulfilled,
        (state, action) => {
          state.addressVillagesForParkingAddress.isLoading = false;
          state.addressVillagesForParkingAddress.isSuccess = true;
          state.addressVillagesForParkingAddress.addressVillages =
            action.payload.data;
        }
      )
      .addCase(
        getAddressVillagesForParkingAddress.rejected,
        (state, action) => {
          state.addressVillagesForParkingAddress.isLoading = false;
          state.addressVillagesForParkingAddress.isError = true;
          state.addressVillagesForParkingAddress.message = action.payload;
        }
      );
  },
});

export const { reset, resetPermanentAddressVillages, resetAddressVillages, resetParkingAddressVillages } = addressVillageSlice.actions;
export default addressVillageSlice.reducer;
