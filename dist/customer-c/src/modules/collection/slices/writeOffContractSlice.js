import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import writeOffContractService from "../services/writeOffContractService";

const initialState = {
  writeOffContract: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const updateWriteOffContract = createAsyncThunk(
  "writeOffContract/updateWriteOffContract",
  async ({ body, id }, thunkAPI) => {
    try {
      return await writeOffContractService.updateWriteOffContract(body, id);
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

export const getWriteOffContractByUuid = createAsyncThunk(
  "writeOffContract/getWriteOffContractByUuid",
  async (uuid, thunkAPI) => {
    try {
      return await writeOffContractService.getWriteOffContractByUuid(uuid);
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

export const writeOffContractSlice = createSlice({
  name: "writeOffContract",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWriteOffContractByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWriteOffContractByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffContract = action.payload.data;
      })
      .addCase(getWriteOffContractByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateWriteOffContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWriteOffContract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffContract = action.payload.data;
      })
      .addCase(updateWriteOffContract.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const { reset } = writeOffContractSlice.actions;
export default writeOffContractSlice.reducer;
