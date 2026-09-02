import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import smsGenerateService from "./smsGenerateService";
import { saveAs } from "file-saver";

const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
  isDownloading: false,
};

// Create SMS
export const createGeneratedSMS = createAsyncThunk(
  "smsGenerate/createGeneratedSMS",
  async (params, thunkAPI) => {
    try {
      const response = await smsGenerateService.createGeneratedSMS(params);
      return response;
    } catch (error) {
     
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
       
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createSMSLoanSkipped = createAsyncThunk(
  "smsGenerate/createSMSLoanSkipped",
  async (params, thunkAPI) => {
    try {
      const response = await smsGenerateService.createSMSLoanSkipped(params);
      return response;
    } catch (error) {
     
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
       
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Download SMS History Excel
export const downloadSMSHistoryExcel = createAsyncThunk(
  "smsGenerate/downloadSMSHistoryExcel",
  async ({params}, thunkAPI) => {
    try {
      const response = await smsGenerateService.downloadSMSHistoryExcel(params);

      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "SMSHistory.xlsx");
      
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue({
          message: `Failed to download SMS history: ${message}`,
        });
    }
  }
);

// Create SMS
export const createDisbursementGeneratedSMS = createAsyncThunk(
  "smsGenerate/createDisbursementGeneratedSMS",
  async (params, thunkAPI) => {
    try {
      const response = await smsGenerateService.createDisbursementGeneratedSMS(params);
      return response;
    } catch (error) {
    
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const smsGenerateSlice = createSlice({
  name: "smsGenerate",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGeneratedSMS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGeneratedSMS.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createGeneratedSMS.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createSMSLoanSkipped.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSMSLoanSkipped.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createSMSLoanSkipped.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createDisbursementGeneratedSMS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDisbursementGeneratedSMS.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createDisbursementGeneratedSMS.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(downloadSMSHistoryExcel.pending, (state) => {
        state.isDownloading = true;
      })
      .addCase(downloadSMSHistoryExcel.fulfilled, (state) => {
        state.isSuccess = true;
        state.isDownloading = false;
      })
      .addCase(downloadSMSHistoryExcel.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isDownloading = false;
      })
  },
});

export const { reset } = smsGenerateSlice.actions;
export default smsGenerateSlice.reducer;
