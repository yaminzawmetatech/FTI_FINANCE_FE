import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import applicationService from "./applicationService";

const initialState = {
  application: null,
  next: null,
  previous: null,
  black_list_customer: null,
  existing_customer: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
  customerInfo: null,
  relatedApplications: null,
  applicationHistories: null,
  calculatedValues: null,
  isCalculating: false,
  isSyncing: false,
  isFetching: false,
  refinanceCustomer: null
};

// Get application Detail
export const getApplicationByUuid = createAsyncThunk(
  "applicationDetail/getApplicationByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await applicationService.getApplicationByUuid(uuid);
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

export const checkExistingCustomer = createAsyncThunk(
  "applicationDetail/checkExistingCustomer",
  async ({ body }, thunkAPI) => {
    try {
      return await applicationService.checkExistingCustomer(body);
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

export const calculateProrataDisbursement = createAsyncThunk(
  "applicationDetail/calculateProrataDisbursement",
  async ({ uuid,body }, thunkAPI) => {
    try {
      return await applicationService.calculateProrataDisbursement(uuid,body);
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

export const syncToGuarantorReference = createAsyncThunk(
  "sync",
  async ({ type,id }, thunkAPI) => {
    try {
      return await applicationService.syncToGuarantorReference(type,id);
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

export const syncToGuarantor = createAsyncThunk(
  "contactPerson/sync",
  async ({ id, application_id }, thunkAPI) => {
    try {
      return await applicationService.syncToGuarantor(id, application_id);
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

export const fetchMnetAttachments = createAsyncThunk(
  "fetch",
  async ({ uuid,verbose }, thunkAPI) => {
    try {
      return await applicationService.fetchMnetAttachments(uuid,verbose);
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

export const applicationDetailSlice = createSlice({
  name: "applicationDetail",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationByUuid.pending, (state) => {
        state.isLoading = true;
        state.application = null;
        state.next = null;
        state.previous = null;
        state.black_list_customer = null;
        state.existing_customer = null;
      })
      .addCase(getApplicationByUuid.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.application = action.payload.data.application;
        state.next = action.payload.data.next;
        state.previous = action.payload.data.previous;
        state.black_list_customer = action.payload.data.black_list_customer;
        state.existing_customer = action.payload.data.existing_customer;
        state.relatedApplications = action.payload.data.related_applications;
        state.applicationHistories = action.payload.data.application_histories;
        state.refinanceCustomer = action.payload.data.refinance_customer;
        state.isLoading = false;
      })
      .addCase(getApplicationByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkExistingCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkExistingCustomer.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.customerInfo = action.payload.data.info;
        state.relatedApplications = action.payload.data.related_applications;
        state.applicationHistories = action.payload.data.application_histories;
        state.refinanceCustomer = action.payload.data.refinance_customer;
        state.isLoading = false;
      })
      .addCase(checkExistingCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(calculateProrataDisbursement.pending, (state) => {
        state.isCalculating = true;
      })
      .addCase(calculateProrataDisbursement.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.application = action.payload.data;
        state.isCalculating = false;
      })
      .addCase(calculateProrataDisbursement.rejected, (state, action) => {
        state.isCalculating = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(syncToGuarantorReference.pending, (state) => {
        state.isSyncing = true;
      })
      .addCase(syncToGuarantorReference.fulfilled, (state, action) => {
        state.isSuccess = true;
        //state.application = action.payload.data;
        state.isSyncing = false;
      })
      .addCase(syncToGuarantorReference.rejected, (state, action) => {
        state.isSyncing = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(syncToGuarantor.pending, (state) => {
        state.isSyncing = true;
      })
      .addCase(syncToGuarantor.fulfilled, (state, action) => {
        state.isSuccess = true;
        //state.application = action.payload.data;
        state.isSyncing = false;
      })
      .addCase(syncToGuarantor.rejected, (state, action) => {
        state.isSyncing = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = applicationDetailSlice.actions;
export default applicationDetailSlice.reducer;
