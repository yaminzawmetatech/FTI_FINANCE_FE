import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressCityService from "../services/addressCityService";

const initialState = {
  addressCities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  addressCitiesForPermanentAddress: {
    addressCities: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  addressCitiesForParkingAddress: {
    addressCities: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

// Get address cities
export const getAddressCities = createAsyncThunk(
  "addressCities",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressCityService.getAddressCities(token, params);
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

// Get address cities For PermanentAddress
export const getAddressCitiesForPermanentAddress = createAsyncThunk(
  "addressCitiesForPermanentAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressCityService.getAddressCities(token, params);
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

// Get address cities for ParkingAddress
export const getAddressCitiesForParkingAddress = createAsyncThunk(
  "addressCitiesForParkingAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressCityService.getAddressCities(token, params);
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


// Create new address city
export const createAddressCity = createAsyncThunk(
  "addressCities/create",
  async (addressCityData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressCityService.createAddressCity(addressCityData, token);
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

// update address city
export const updateAddressCity = createAsyncThunk(
  "addressCities/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressCityService.updateAddressCity(id, newData, token);
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

// Delete address city
export const deleteAddressCity = createAsyncThunk(
  "addressCities/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressCityService.deleteAddressCity(id, token);
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

// batch delete address cities
export const batchDeleteAddressCities = createAsyncThunk(
  "addressCities/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressCityService.batchDeleteAddressCities(ids, token);
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

export const addressCitySlice = createSlice({
  name: "addressCities",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetAddressCities: (state) => {
      state.addressCities = initialState.addressCities;
    },
    resetPermanentAddressCities: (state) => {
      state.addressCitiesForPermanentAddress = initialState.addressCitiesForPermanentAddress;
    },
    resetParkingAddressCities: (state) => {
      state.addressCitiesForParkingAddress = initialState.addressCitiesForParkingAddress;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddressCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddressCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressCities.push(action.payload);
      })
      .addCase(createAddressCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddressCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressCities = action.payload.data;
      })
      .addCase(getAddressCities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAddressCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddressCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressCities = state.addressCities.filter(
          (addressCities) => addressCities._id !== action.payload.id
        );
      })
      .addCase(deleteAddressCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAddressCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddressCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressCities = action.payload.data;
      })
      .addCase(updateAddressCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressCitiesForPermanentAddress.pending, (state) => {
        state.addressCitiesForPermanentAddress.isLoading = true;
      })
      .addCase(
        getAddressCitiesForPermanentAddress.fulfilled,
        (state, action) => {
          state.addressCitiesForPermanentAddress.isLoading = false;
          state.addressCitiesForPermanentAddress.isSuccess = true;
          state.addressCitiesForPermanentAddress.addressCities =
            action.payload.data;
        }
      )
      .addCase(
        getAddressCitiesForPermanentAddress.rejected,
        (state, action) => {
          state.addressCitiesForPermanentAddress.isLoading = false;
          state.addressCitiesForPermanentAddress.isError = true;
          state.addressCitiesForPermanentAddress.message = action.payload;
        }
      )
      .addCase(getAddressCitiesForParkingAddress.pending, (state) => {
        state.addressCitiesForParkingAddress.isLoading = true;
      })
      .addCase(getAddressCitiesForParkingAddress.fulfilled, (state, action) => {
        state.addressCitiesForParkingAddress.isLoading = false;
        state.addressCitiesForParkingAddress.isSuccess = true;
        state.addressCitiesForParkingAddress.addressCities = action.payload.data;
      })
      .addCase(getAddressCitiesForParkingAddress.rejected, (state, action) => {
        state.addressCitiesForParkingAddress.isLoading = false;
        state.addressCitiesForParkingAddress.isError = true;
        state.addressCitiesForParkingAddress.message = action.payload;
      });

  },
});

export const { reset, resetPermanentAddressCities, resetAddressCities, resetParkingAddressCities } = addressCitySlice.actions;
export default addressCitySlice.reducer;
