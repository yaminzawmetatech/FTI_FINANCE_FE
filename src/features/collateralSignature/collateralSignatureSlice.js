import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import collateralSignatureService from "./collateralSignatureService";

const initialState = {
  collateralSignature: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCollateralSignature = createAsyncThunk(
  "getCollateralSignature",
  async ({ params }, thunkAPI) => {
    try {
      return await collateralSignatureService.getCollateralSignature({
        params
      });
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

export const createCollateralSignature = createAsyncThunk(
  "createCollateralSignature",
  async ({ body }, thunkAPI) => {
    try {
      return await collateralSignatureService.createCollateralSignature(body);
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

export const updateCollateralSignature = createAsyncThunk(
  "updateCollateralSignature",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await collateralSignatureService.updateCollateralSignature(uuid, body);
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

export const getCollateralSignatureByUuid = createAsyncThunk(
  "getCollateralSignatureByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await collateralSignatureService.getCollateralSignatureByUuid(uuid);
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

export const createBatchLCSignature = createAsyncThunk(
  "createBatchLCSignature",
  async ({ body }, thunkAPI) => {
    try {
      return await collateralSignatureService.createBatchLCSignature(body);
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


export const collateralSingatureSlice = createSlice({
  name: "collateralSignatures",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollateralSignature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollateralSignature.fulfilled, (state, action) => {
        state.collateralSignature = action.payload.data;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getCollateralSignature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCollateralSignature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollateralSignature.fulfilled, (state, action) => {
        state.collateralSignature = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateCollateralSignature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCollateralSignature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollateralSignature.fulfilled, (state, action) => {
        state.collateralSignature = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createCollateralSignature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCollateralSignatureByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollateralSignatureByUuid.fulfilled, (state, action) => {
        state.collateralSignature = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getCollateralSignatureByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBatchLCSignature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBatchLCSignature.fulfilled, (state, action) => {
        state.collateralSignature = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createBatchLCSignature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = collateralSingatureSlice.actions;
export default collateralSingatureSlice.reducer;