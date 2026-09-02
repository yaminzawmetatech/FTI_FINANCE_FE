import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contractService from "./contractService";

const initialState = {
  contract: null,
  next: null,
  previous: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
  actualPaymentLinesByContractId : null,
};

export const getContractByUuid = createAsyncThunk(
  "contractDetail/getContractByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await contractService.getContractByUuid(uuid);
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

export const getActualPaymentLinesByContractId = createAsyncThunk(
  "getActualPaymentLinesByContractId",
  async ({ id }, thunkAPI) => {
    try {
      return await contractService.getActualPaymentLinesByContractId(id);
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

export const contractSlice = createSlice({
  name: "contractDetail",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContractByUuid.pending, (state) => {
        state.isLoading = true;
        state.contract = null;
        state.next = null;
        state.previous = null;
      })
      .addCase(getContractByUuid.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.contract = action.payload.data;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.isLoading = false;
      })
      .addCase(getContractByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }).
      addCase(getActualPaymentLinesByContractId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActualPaymentLinesByContractId.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.actualPaymentLinesByContractId = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getActualPaymentLinesByContractId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contractSlice.actions;
export default contractSlice.reducer;
