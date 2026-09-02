import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressTownshipService from "./addressTownshipService";

const initialState = {
  addressTownships: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  addressTownshipsForPermanentAddress: {
    addressTownships: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  addressTownshipsForParkingAddress: {
    addressTownships: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

// Get address townships
export const getAddressTownships = createAsyncThunk(
  "addressTownships",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressTownshipService.getAddressTownships(token, params);
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

// Get address townships For PermanentAddress
export const getAddressTownshipsForPermanentAddress = createAsyncThunk(
  "addressTownshipsForPermanentAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressTownshipService.getAddressTownships(token, params);
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

// Get address townships For ParkingAddress
export const getAddressTownshipsForParkingAddress = createAsyncThunk(
  "addressTownshipsForParkingAddress",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressTownshipService.getAddressTownships(token, params);
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

// Create new address township
export const createAddressTownship = createAsyncThunk(
  "addressTownships/create",
  async (departmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressTownshipService.createAddressTownship(
        departmentData,
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

// update address township
export const updateAddressTownship = createAsyncThunk(
  "addressTownships/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressTownshipService.updateAddressTownship(
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

// Delete address township
export const deleteAddressTownship = createAsyncThunk(
  "addressTownships/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressTownshipService.deleteAddressTownship(id, token);
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

// batch delete address townships
export const batchDeleteAddressTownships = createAsyncThunk(
  "addressTownships/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await addressTownshipService.batchDeleteAddressTownships(
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

export const addressTownshipSlice = createSlice({
  name: "addressTownships",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddressTownship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddressTownship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressTownships.push(action.payload);
      })
      .addCase(createAddressTownship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressTownships.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddressTownships.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressTownships = action.payload.data;
      })
      .addCase(getAddressTownships.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAddressTownship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddressTownship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressTownships = state.addressTownships.filter(
          (addressTownships) => addressTownships._id !== action.payload.id
        );
      })
      .addCase(deleteAddressTownship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAddressTownship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddressTownship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressTownships = action.payload.data;
      })
      .addCase(updateAddressTownship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressTownshipsForPermanentAddress.pending, (state) => {
        state.addressTownshipsForPermanentAddress.isLoading = true;
      })
      .addCase(
        getAddressTownshipsForPermanentAddress.fulfilled,
        (state, action) => {
          state.addressTownshipsForPermanentAddress.isLoading = false;
          state.addressTownshipsForPermanentAddress.isSuccess = true;
          state.addressTownshipsForPermanentAddress.addressTownships =
            action.payload.data;
        }
      )
      .addCase(
        getAddressTownshipsForPermanentAddress.rejected,
        (state, action) => {
          state.addressTownshipsForPermanentAddress.isLoading = false;
          state.addressTownshipsForPermanentAddress.isError = true;
          state.addressTownshipsForPermanentAddress.message = action.payload;
        }
      )
      // Parking Address
      .addCase(getAddressTownshipsForParkingAddress.pending, (state) => {
        state.addressTownshipsForParkingAddress.isLoading = true;
      })
      .addCase(
        getAddressTownshipsForParkingAddress.fulfilled,
        (state, action) => {
          state.addressTownshipsForParkingAddress.isLoading = false;
          state.addressTownshipsForParkingAddress.isSuccess = true;
          state.addressTownshipsForParkingAddress.addressTownships =
            action.payload.data;
        }
      )
      .addCase(
        getAddressTownshipsForParkingAddress.rejected,
        (state, action) => {
          state.addressTownshipsForParkingAddress.isLoading = false;
          state.addressTownshipsForParkingAddress.isError = true;
          state.addressTownshipsForParkingAddress.message = action.payload;
        }
      );
  },
});

export const { reset } = addressTownshipSlice.actions;
export default addressTownshipSlice.reducer;
