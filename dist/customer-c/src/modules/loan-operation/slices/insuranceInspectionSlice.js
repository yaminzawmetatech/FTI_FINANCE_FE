import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import insuranceInspectionService from "../services/insuranceInspectionService";

const initialState = {
  insuranceInspections: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  inspectionEmail: [],
};

export const getInsuranceInspections = createAsyncThunk(
  "getInsuranceInspections",
  async ({ params }, thunkAPI) => {
    try {
      return await insuranceInspectionService.getInsuranceInspections({
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

export const createInsuranceInspection = createAsyncThunk(
  "createInsuranceInspection",
  async ({ body }, thunkAPI) => {
    try {
      return await insuranceInspectionService.createInsuranceInspection(body);
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

export const updateInsuranceInspection = createAsyncThunk(
  "updateInsuranceInspection",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await insuranceInspectionService.updateInsuranceInspection(uuid, body);
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

export const getInsuranceInspectionByUuid = createAsyncThunk(
  "getInsuranceInspectionByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await insuranceInspectionService.getInsuranceInspectionByUuid(uuid);
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

export const sendInspectionEmail = createAsyncThunk(
  "sendInspectionEmail",
  async ({ params }, thunkAPI) => {
    try {
      return await insuranceInspectionService.sendInspectionEmail({params});
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

export const insuranceInspectionSlice = createSlice({
  name: "insuranceInspections",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInsuranceInspections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInsuranceInspections.fulfilled, (state, action) => {
        state.insuranceInspections = action.payload.data;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getInsuranceInspections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateInsuranceInspection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInsuranceInspection.fulfilled, (state, action) => {
        state.insuranceInspections = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateInsuranceInspection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createInsuranceInspection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInsuranceInspection.fulfilled, (state, action) => {
        state.insuranceInspections = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createInsuranceInspection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInsuranceInspectionByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInsuranceInspectionByUuid.fulfilled, (state, action) => {
        state.insuranceInspections = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getInsuranceInspectionByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendInspectionEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendInspectionEmail.fulfilled, (state, action) => {
        state.insuranceInspections = action.payload.data;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(sendInspectionEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      ;
  },
});

export const {reset} = insuranceInspectionSlice.actions;
export default insuranceInspectionSlice.reducer;