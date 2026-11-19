import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contractService from "../services/contractService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
  contractGeneralLedgers: null,
};

export const getGeneralLedgerSyncedData = createAsyncThunk(
  "contractGL/getGeneralLedgerSyncedData",
  async ({ id }, thunkAPI) => {
    try {
      return await contractService.getGeneralLedgerSyncedData(id);
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

export const contractGLSlice = createSlice({
  name: "contractGL",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeneralLedgerSyncedData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGeneralLedgerSyncedData.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.contractGeneralLedgers = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getGeneralLedgerSyncedData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contractGLSlice.actions;
export default contractGLSlice.reducer;
