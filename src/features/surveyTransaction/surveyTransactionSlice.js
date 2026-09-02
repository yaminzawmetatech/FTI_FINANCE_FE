import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import surveyTransactionService from "./surveyTransactionService";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createSurveyTransaction: {
    isLoading: false,
  },
};

export const getSurveyTransactions = createAsyncThunk(
  "surveyTransactions/getSurveyTransactions",
  async (_, thunkAPI) => {
    try {
      return await surveyTransactionService.getSurveyTransaction();
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
export const createSurveyTransaction = createAsyncThunk(
  "surveyTransactions/createSurveyTransaction",
  async ({ survey_transactions, application_id, type }, thunkAPI) => {
    try {
      return await surveyTransactionService.createSurveyTransaction({
        survey_transactions,
        application_id,
        type
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

export const surveyTransactionSlice = createSlice({
  name: "surveyTransactions",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSurveyTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSurveyTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(getSurveyTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSurveyTransaction.pending, (state) => {
        state.createSurveyTransaction.isLoading = true;
      })
      .addCase(createSurveyTransaction.fulfilled, (state, action) => {
        state.createSurveyTransaction.isLoading = false;
      })
      .addCase(createSurveyTransaction.rejected, (state, action) => {
        state.createSurveyTransaction.isLoading = false;
      });
  },
});

export const { reset } = surveyTransactionSlice.actions;
export default surveyTransactionSlice.reducer;
