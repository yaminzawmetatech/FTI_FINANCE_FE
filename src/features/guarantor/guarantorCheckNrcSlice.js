import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import guarantorService from "./guarantorService";

const initialState = {
  guarantorInfo: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const checkExistingGuarantor = createAsyncThunk(
  "checkExistingGuarantor",
  async ({ body }, thunkAPI) => {
    
    try {
      return await guarantorService.checkExistingGuarantor(body);
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

export const guarantorCheckNrcSlice = createSlice({
  name: "checkGuarantors",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(checkExistingGuarantor.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(checkExistingGuarantor.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.guarantorInfo = action.payload.data;
      state.isLoading = false;
    })
    .addCase(checkExistingGuarantor.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = guarantorCheckNrcSlice.actions;
export default guarantorCheckNrcSlice.reducer;
