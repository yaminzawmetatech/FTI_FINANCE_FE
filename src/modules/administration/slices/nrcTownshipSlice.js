import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nrcTownshipService from "../services/nrcTownshipService";
import { update } from "lodash";
// import Cookies from "js-cookie";
const initialState = {
  nrcTownships: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new State
export const createNRCTownship = createAsyncThunk(
  "nrcTownships/create",
  async (nrcTownshipData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await nrcTownshipService.createNRCTownship(nrcTownshipData, token);
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

// Get Address States
export const getNRCTownships = createAsyncThunk(
  "nrcTownships",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await nrcTownshipService.getNRCTownships(token, params);
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

// Delete state
export const deleteNRCTownship = createAsyncThunk(
  "nrcStates/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await nrcTownshipService.deleteNRCTownship(id, token);
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

// update State
export const updateNRCTownship = createAsyncThunk(
  "nrcTownships/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await nrcTownshipService.updateNRCTownship(id, newData, token);
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

// batch delete state
export const batchDeleteNRCTownships = createAsyncThunk(
  "nrcTownships/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await nrcTownshipService.batchDeleteNRCTownships(ids, token);
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

export const NRCTownshipSlice = createSlice({
  name: "nrcTownships",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNRCTownship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNRCTownship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.nrcTownships.push(action.payload);
      })
      .addCase(createNRCTownship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNRCTownships.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNRCTownships.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.nrcTownships = action.payload.data;
      })
      .addCase(getNRCTownships.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteNRCTownship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNRCTownship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.nrcTownships = state.nrcTownships.filter(
          (nrcTownships) => nrcTownships.id !== action.payload.id
        );
      })
      .addCase(deleteNRCTownship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateNRCTownship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNRCTownship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.nrcTownships = action.payload.data;
      })
      .addCase(updateNRCTownship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = NRCTownshipSlice.actions;
export default NRCTownshipSlice.reducer;
