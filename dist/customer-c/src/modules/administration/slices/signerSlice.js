import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import signerService from "../services/signerService";

const initialState = {
  signers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createSigner = createAsyncThunk(
  "signer/create",
  async (signerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await signerService.createSigner(signerData, token);
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

export const getSigners = createAsyncThunk(
  "signers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await signerService.getSigners(token);
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

export const deleteSigner = createAsyncThunk(
  "signer/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await signerService.deleteSigner(id, token);
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

export const updateSigner = createAsyncThunk(
  "signer/update",
  
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await signerService.updateSigner(id, newData, token);
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

export const signerSlice = createSlice({
  name: "signers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSigner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSigner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.signers.push(action.payload);
      })
      .addCase(createSigner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSigners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSigners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.signers = action.payload.data;
      })
      .addCase(getSigners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSigner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSigner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.signers = state.signers.filter(
          (subcategory) => subcategory._id !== action.payload.id
        );
      })
      .addCase(deleteSigner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSigner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSigner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.signers = action.payload.data;
      })
      .addCase(updateSigner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = signerSlice.actions;
export default signerSlice.reducer;
