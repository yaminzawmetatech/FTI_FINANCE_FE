import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NRCTownshipVariationService from "./nrcTownshipVariationService";

const initialState = {
  NRCTownshipVariations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new State
export const createNRCTownshipVariation = createAsyncThunk(
  "NRCTownshipVariations/create",
  async (nrcTownshipData, thunkAPI) => {
    try {
      return await NRCTownshipVariationService.createNRCTownshipVariation(nrcTownshipData);
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
export const getNRCTownshipVariationsByTownshipId = createAsyncThunk(
  "NRCTownshipVariations",
  async (id, thunkAPI) => {
    try {
      return await NRCTownshipVariationService.getNRCTownshipVariationsByTownshipId(id);
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
export const deleteNRCTownshipVariation = createAsyncThunk(
  "NRCTownshipVariations/delete",
  async (id, thunkAPI) => {
    try {
      return await NRCTownshipVariationService.deleteNRCTownshipVariation(id);
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
export const updateNRCTownshipVariation = createAsyncThunk(
  "NRCTownshipVariations/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await NRCTownshipVariationService.updateNRCTownshipVariation(id, newData);
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

export const NRCTownshipVariationSlice = createSlice({
  name: "NRCTownshipVariations",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNRCTownshipVariation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNRCTownshipVariation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.NRCTownshipVariations.push(action.payload);
      })
      .addCase(createNRCTownshipVariation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNRCTownshipVariationsByTownshipId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNRCTownshipVariationsByTownshipId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.NRCTownshipVariations = action.payload.data;
      })
      .addCase(getNRCTownshipVariationsByTownshipId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteNRCTownshipVariation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNRCTownshipVariation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.NRCTownshipVariations = action.payload.data;
      })
      .addCase(deleteNRCTownshipVariation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateNRCTownshipVariation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNRCTownshipVariation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //state.NRCTownshipVariations = action.payload.data;
      })
      .addCase(updateNRCTownshipVariation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = NRCTownshipVariationSlice.actions;
export default NRCTownshipVariationSlice.reducer;
