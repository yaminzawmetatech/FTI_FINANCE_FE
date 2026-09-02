import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import collateralTypesSetupService from './collateralTypesSetupService';
import { uniqBy } from 'lodash';

const initialState = {
  collateralTypes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  next_page_param: null,
};

// Get all collateral types
export const getAllCollateralTypes = createAsyncThunk(
  'collateralTypesSetup/getAll',
  async ({ params }, thunkAPI) => {
    try {
      return await collateralTypesSetupService.getAllCollateralTypes(params);
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

// Create a collateral type
export const createCollateralType = createAsyncThunk(
  'collateralTypesSetup/create',
  async ({ data }, thunkAPI) => {
    try {
      return await collateralTypesSetupService.createCollateralType(data);
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

// Update a collateral type
export const updateCollateralType = createAsyncThunk(
  'collateralTypesSetup/update',
  async ({ uuid, data }, thunkAPI) => {
    try {
      return await collateralTypesSetupService.updateCollateralType(uuid, data);
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

// Delete a collateral type
export const deleteCollateralType = createAsyncThunk(
  'collateralTypesSetup/delete',
  async ({ uuid }, thunkAPI) => {
    try {
      return await collateralTypesSetupService.deleteCollateralType(uuid);
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

export const collateralTypesSetupSlice = createSlice({
  name: 'collateralTypesSetup',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollateralTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCollateralTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collateralTypes = action.payload.data;
      })
      .addCase(getAllCollateralTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCollateralType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollateralType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collateralTypes = uniqBy(state.collateralTypes.concat(action.payload.data), 'id');
      })
      .addCase(createCollateralType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCollateralType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollateralType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collateralTypes = state.collateralTypes.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
      })
      .addCase(updateCollateralType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCollateralType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCollateralType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collateralTypes = state.collateralTypes.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteCollateralType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = collateralTypesSetupSlice.actions;
export default collateralTypesSetupSlice.reducer;
