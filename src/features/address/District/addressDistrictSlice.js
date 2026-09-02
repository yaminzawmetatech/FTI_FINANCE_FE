import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressDistrictService from "./addressDistrictService";
import { get } from "lodash";
// import Cookies from "js-cookie";
const initialState = {
  addressDistricts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  addressDistrictsForPermanentAddress: {
    addressDistricts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  addressDistrictsForParkingAddress: {
    addressDistricts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

// Create new District
export const createAddressDistrict = createAsyncThunk(
  "addressDistricts/create",
  async (addressDistrictData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.createAddressDistrict(
        addressDistrictData,
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

// Get Address District
export const getAddressDistricts = createAsyncThunk(
  "addressDistricts",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.getAddressDistricts(params, token);
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

export const getDistrictByStateAndTownship = createAsyncThunk(
  "getDistrictByStateAndTownship",
  async ({ addressStateId, addressTownshipId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.getDistrictByStateAndTownship(addressStateId, addressTownshipId, token);
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

export const getPermanentDistrictByStateAndTownship = createAsyncThunk(
  "getPermanentDistrictByStateAndTownship",
  async ({ addressStateId, addressTownshipId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.getPermanentDistrictByStateAndTownship(addressStateId, addressTownshipId, token);
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

// Get Address District For Permanent Address
export const getAddressDistrictsForPermanentAddress = createAsyncThunk(
  "addressDistrictsForPermanentAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.getAddressDistricts(params, token);
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

// Get Address Districts for Parking Address
export const getAddressDistrictsForParkingAddress = createAsyncThunk(
  "addressDistrictsForParkingAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.getAddressDistricts(params, token);
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

export const getParkingDistrictByStateAndTownship = createAsyncThunk(
  "getParkingDistrictByStateAndTownship",
  async ({ addressStateId, addressTownshipId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.getParkingDistrictByStateAndTownship(
        addressStateId,
        addressTownshipId,
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


// Delete District
export const deleteAddressDistrict = createAsyncThunk(
  "addressDistricts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.deleteAddressDistrict(id, token);
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

// update District
export const updateAddressDistrict = createAsyncThunk(
  "addressDistricts/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.updateAddressDistrict(
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

// batch delete District
export const batchDeleteAddressDistricts = createAsyncThunk(
  "addressDistricts/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressDistrictService.batchDeleteAddressDistricts(
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

export const addressDistrictSlice = createSlice({
  name: "addressDistricts",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetAddressDistricts: (state) => {
      state.addressDistricts = initialState.addressDistricts;
    },
    resetPermanentAddressDistricts: (state) => {
      state.addressDistrictsForPermanentAddress = initialState.addressDistrictsForPermanentAddress;
    },
    resetParkingAddressDistricts: (state) => {
      state.addressDistrictsForParkingAddress = initialState.addressDistrictsForParkingAddress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddressDistrict.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddressDistrict.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressDistricts.push(action.payload);
      })
      .addCase(createAddressDistrict.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressDistricts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddressDistricts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressDistricts = action.payload.data;
      })
      .addCase(getAddressDistricts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDistrictByStateAndTownship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDistrictByStateAndTownship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressDistricts = action.payload.data;
      })
      .addCase(getDistrictByStateAndTownship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAddressDistrict.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddressDistrict.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressDistricts = state.addressDistricts.filter(
          (addressDistricts) => addressDistricts._id !== action.payload.id
        );
      })
      .addCase(deleteAddressDistrict.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAddressDistrict.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddressDistrict.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressDistricts = action.payload.data;
      })
      .addCase(updateAddressDistrict.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressDistrictsForPermanentAddress.pending, (state) => {
        state.addressDistrictsForPermanentAddress.isLoading = true;
      })
      .addCase(
        getAddressDistrictsForPermanentAddress.fulfilled,
        (state, action) => {
          state.addressDistrictsForPermanentAddress.isLoading = false;
          state.addressDistrictsForPermanentAddress.isSuccess = true;
          state.addressDistrictsForPermanentAddress.addressDistricts =
            action.payload.data;
        }
      )
      .addCase(
        getAddressDistrictsForPermanentAddress.rejected,
        (state, action) => {
          state.addressDistrictsForPermanentAddress.isLoading = false;
          state.addressDistrictsForPermanentAddress.isError = true;
          state.addressDistrictsForPermanentAddress.message = action.payload;
        }
      ).addCase(getPermanentDistrictByStateAndTownship.pending, (state) => {
        state.addressDistrictsForPermanentAddress.isLoading = true;
      })
      .addCase(
        getPermanentDistrictByStateAndTownship.fulfilled,
        (state, action) => {
          state.addressDistrictsForPermanentAddress.isLoading = false;
          state.addressDistrictsForPermanentAddress.isSuccess = true;
          state.addressDistrictsForPermanentAddress.addressDistricts =
            action.payload.data;
        }
      )
      .addCase(
        getPermanentDistrictByStateAndTownship.rejected,
        (state, action) => {
          state.addressDistrictsForPermanentAddress.isLoading = false;
          state.addressDistrictsForPermanentAddress.isError = true;
          state.addressDistrictsForPermanentAddress.message = action.payload;
        }
      )
      // Parking Address District
      .addCase(getAddressDistrictsForParkingAddress.pending, (state) => {
        state.addressDistrictsForParkingAddress.isLoading = true;
      })
      .addCase(
        getAddressDistrictsForParkingAddress.fulfilled,
        (state, action) => {
          state.addressDistrictsForParkingAddress.isLoading = false;
          state.addressDistrictsForParkingAddress.isSuccess = true;
          state.addressDistrictsForParkingAddress.addressDistricts =
            action.payload.data;
        }
      )
      .addCase(
        getAddressDistrictsForParkingAddress.rejected,
        (state, action) => {
          state.addressDistrictsForParkingAddress.isLoading = false;
          state.addressDistrictsForParkingAddress.isError = true;
          state.addressDistrictsForParkingAddress.message = action.payload;
        }
      )
      // Parking Address District
      .addCase(getParkingDistrictByStateAndTownship.pending, (state) => {
        state.addressDistrictsForParkingAddress.isLoading = true;
      })
      .addCase(getParkingDistrictByStateAndTownship.fulfilled, (state, action) => {
        state.addressDistrictsForParkingAddress.isLoading = false;
        state.addressDistrictsForParkingAddress.isSuccess = true;
        state.addressDistrictsForParkingAddress.addressDistricts = action.payload.data;
      })
      .addCase(getParkingDistrictByStateAndTownship.rejected, (state, action) => {
        state.addressDistrictsForParkingAddress.isLoading = false;
        state.addressDistrictsForParkingAddress.isError = true;
        state.addressDistrictsForParkingAddress.message = action.payload;
      });
  },
});

export const { reset, resetPermanentAddressDistricts, resetAddressDistricts, resetParkingAddressDistricts } = addressDistrictSlice.actions;
export default addressDistrictSlice.reducer;
