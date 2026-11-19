import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import writeOffSignatureService from "../services/writeOffSignatureService";

const initialState = {
  writeOffSignature: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getWriteOffSignature = createAsyncThunk(
  "getWriteOffSignature",
  async ({ params }, thunkAPI) => {
    try {
      return await writeOffSignatureService.getWriteOffSignature({
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

export const createWriteOffSignature = createAsyncThunk(
  "createWriteOffSignature",
  async ({ body }, thunkAPI) => {
    try {
      return await writeOffSignatureService.createWriteOffSignature(body);
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

export const updateWriteOffSignature = createAsyncThunk(
  "updateWriteOffSignature",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await writeOffSignatureService.updateWriteOffSignature(uuid, body);
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

export const getWriteOffSignatureByUuid = createAsyncThunk(
  "getWriteOffSignatureByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await writeOffSignatureService.getWriteOffSignatureByUuid(uuid);
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

export const writeOffSingatureSlice = createSlice({
  name: "writeOffSignatures",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWriteOffSignature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWriteOffSignature.fulfilled, (state, action) => {
        state.writeOffSignature = action.payload.data;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getWriteOffSignature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateWriteOffSignature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWriteOffSignature.fulfilled, (state, action) => {
        state.writeOffSignature = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateWriteOffSignature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createWriteOffSignature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWriteOffSignature.fulfilled, (state, action) => {
        state.writeOffSignature = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createWriteOffSignature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWriteOffSignatureByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWriteOffSignatureByUuid.fulfilled, (state, action) => {
        state.writeOffSignature = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getWriteOffSignatureByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = writeOffSingatureSlice.actions;
export default writeOffSingatureSlice.reducer;