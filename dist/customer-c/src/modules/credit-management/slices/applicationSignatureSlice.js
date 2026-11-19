import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import applicationService from "../services/applicationService";
import { uniqBy } from "lodash";

const initialState = {
  applicationSignatures: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


export const getApplicationSignatures = createAsyncThunk(
  "get-signature-list",
  async ({id}, thunkAPI) => {
    try {
      return await applicationService.getApplicationSignatures(id);
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

export const applicationSignatureSlice = createSlice({
  name: "applicationSignature",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationSignatures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicationSignatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applicationSignatures = action.payload.data;
      })
      .addCase(getApplicationSignatures.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      ;
  },
});

export const { reset } = applicationSignatureSlice.actions;
export default applicationSignatureSlice.reducer;
