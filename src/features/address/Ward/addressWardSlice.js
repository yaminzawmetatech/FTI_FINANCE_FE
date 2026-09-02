import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressWardService from "./addressWardService";
import { uniqBy } from "lodash";

// import Cookies from "js-cookie";
const initialState = {
  addressWards: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  addressWardData: [],
  next_page_param: null,
  addressWardsForPermanentAddress: {
    addressWards: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  addressWardsForParkingAddress: { // New state for Parking Address
    addressWards: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

// Create new Ward
export const createAddressWard = createAsyncThunk(
  "addressWards/create",
  async (addressWardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressWardService.createAddressWard(addressWardData, token);
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

// Get Address Ward
export const getAddressWards = createAsyncThunk(
  "addressWards",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressWardService.getAddressWards(token, params);
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

export const getAddressWardList = createAsyncThunk(
  "addressWards/list",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await addressWardService.getAddressWardList(params, url);

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

// Get Address Ward For PermanentAddress
export const getAddressWardsForPermanentAddress = createAsyncThunk(
  "addressWardsForPermanentAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressWardService.getAddressWards(token, params);
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


// Get Address Ward for Parking Address
export const getAddressWardsForParkingAddress = createAsyncThunk(
  "addressWardsForParkingAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressWardService.getAddressWards(token, params);
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

// Delete Ward
export const deleteAddressWard = createAsyncThunk(
  "addressWards/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressWardService.deleteAddressWard(id, token);
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

// update Ward
export const updateAddressWard = createAsyncThunk(
  "addressWards/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressWardService.updateAddressWard(id, newData, token);
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

// batch delete Ward
export const batchDeleteAddressWards = createAsyncThunk(
  "addressWards/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressWardService.batchDeleteAddressWards(ids, token);
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

export const addressWardSlice = createSlice({
  name: "addressWards",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetAddressWards: (state) => {
      state.addressWards = initialState.addressWards;
    },
    resetPermanentAddressWards: (state) => {
      state.addressWardsForPermanentAddress = initialState.addressWardsForPermanentAddress;
    },
    resetParkingAddressWards: (state) => {
      state.addressWardsForParkingAddress = initialState.addressWardsForParkingAddress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddressWard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddressWard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressWards.push(action.payload);
      })
      .addCase(createAddressWard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressWards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddressWards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressWards = action.payload.data;
      })
      .addCase(getAddressWards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressWardList.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAddressWardList.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.addressWardData = data;
        } else {
          state.addressWardData = uniqBy(state.addressWardData.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAddressWardList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteAddressWard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddressWard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressWards = state.addressWards.filter(
          (addressWards) => addressWards._id !== action.payload.id
        );
      })
      .addCase(deleteAddressWard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAddressWard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddressWard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressWards = action.payload.data;
      })
      .addCase(updateAddressWard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressWardsForPermanentAddress.pending, (state) => {
        state.addressWardsForPermanentAddress.isLoading = true;
      })
      .addCase(
        getAddressWardsForPermanentAddress.fulfilled,
        (state, action) => {
          state.addressWardsForPermanentAddress.isLoading = false;
          state.addressWardsForPermanentAddress.isSuccess = true;
          state.addressWardsForPermanentAddress.addressWards =
            action.payload.data;
        }
      )
      .addCase(getAddressWardsForPermanentAddress.rejected, (state, action) => {
        state.addressWardsForPermanentAddress.isLoading = false;
        state.addressWardsForPermanentAddress.isError = true;
        state.addressWardsForPermanentAddress.message = action.payload;
      })
      // Parking Address Reducers
      .addCase(getAddressWardsForParkingAddress.pending, (state) => {
        state.addressWardsForParkingAddress.isLoading = true;
      })
      .addCase(getAddressWardsForParkingAddress.fulfilled, (state, action) => {
        state.addressWardsForParkingAddress.isLoading = false;
        state.addressWardsForParkingAddress.isSuccess = true;
        state.addressWardsForParkingAddress.addressWards =
          action.payload.data;
      })
      .addCase(getAddressWardsForParkingAddress.rejected, (state, action) => {
        state.addressWardsForParkingAddress.isLoading = false;
        state.addressWardsForParkingAddress.isError = true;
        state.addressWardsForParkingAddress.message = action.payload;
      });
  },
});

export const { reset, resetPermanentAddressWards, resetAddressWards, resetParkingAddressWards } = addressWardSlice.actions;
export default addressWardSlice.reducer;
