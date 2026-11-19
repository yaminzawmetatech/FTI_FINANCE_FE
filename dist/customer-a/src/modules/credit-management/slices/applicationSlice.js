import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import applicationService from "../services/applicationService";
import { uniqBy } from "lodash";

const initialState = {
  applications: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  updateApplicationByUuid: {
    isLoading: false,
  },
  createApplication: {
    isLoading: false,
  },
  lockApplication: {
    isLoading: false,
  },
  applicationsCount: [],
  applicationsLedger: [],
  loanOperationApplicationCount: [],
  applicationCountBeforeContract: [],
  readyForContract: {
    isLoading: false,
  },
  invoiceFlag: {
    isLoading: false,
  }
};

// Get application
export const getApplication = createAsyncThunk(
  "application/getApplication",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await applicationService.getApplication(params, url);

      const {
        metadata: { info },
      } = response;

      const remainingPages = Math.ceil(
        ((+info?.total || 0) - (+info?.offset || 0)) / +info?.limit || 10
      );

      const next_page_param =
        remainingPages >= 1
          ? {
              ...params,
              offset: (+info?.limit || 10) + (+info?.offset || 0),
            }
          : null;
      return {
        info: info,
        data: response.data,
        firstFetch,
        next_page_param,
      };
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

// Update application By UUID
export const updateApplicationByUuid = createAsyncThunk(
  "application/updateApplicationByUuid",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await applicationService.updateApplicationByUuid(uuid, body);
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

export const createApplication = createAsyncThunk(
  "application/createApplication",
  async ({ body }, thunkAPI) => {
    try {
      return await applicationService.createApplicationApi(body);
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

export const updateApplicationStatusSendToCreditManager = createAsyncThunk(
  "application/sendToCreditManager",
  async ({ uuid }, thunkAPI) => {
    try {
      return await applicationService.sendToCreditManagerApplicationApi(uuid);
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

// Get user departments
export const getApplicationStatusCount = createAsyncThunk(
  "applications/status",
  async ({ params, url }, thunkAPI) => {
    try {
      return await applicationService.getApplicationStatusCount(params, url);
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

export const getLoanOperaitonApplicationCount = createAsyncThunk(
  "application/LoanOperationCount",
  async (_, thunkAPI) => {
    try {
      return await applicationService.getLoanOperaitonApplicationCountApi();
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

export const getLoanOperaitonApplicationCountBeforeContract = createAsyncThunk(
  "application/LoanOperationCount/beforeContract",
  async ({params}, thunkAPI) => {
    try {
      return await applicationService.getLoanOperaitonApplicationCountBeforeContract(params);
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


export const lockApplication = createAsyncThunk(
  "application-lock",
  async ({ data }, thunkAPI) => {
    try {
      return await applicationService.lockApplication(data);
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

export const checkLocked = createAsyncThunk(
  "check-application-edit-permission",
  async ({ data }, thunkAPI) => {
    try {
      return await applicationService.checkLocked(data);
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

export const applicationCompleteFlagChange = createAsyncThunk(
  "change-application-complete-point",
  async ({ data }, thunkAPI) => {
    try {
      return await applicationService.applicationCompleteFlagChange(data);
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

export const applicationCompleteSignature = createAsyncThunk(
  "complete-signature",
  async ({ uuid }, thunkAPI) => {
    try {
      return await applicationService.applicationCompleteSignature(uuid);
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

export const invoiceSendToCMCOFlagChange = createAsyncThunk(
  "invoice-send-to-cmco",
  async ({ data }, thunkAPI) => {
    try {
      return await applicationService.invoiceSendToCMCOFlagChange(data);
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

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplication.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getApplication.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.applications = data;
        } else {
          // state.applications = state.applications.concat(data);
          state.applications = uniqBy(state.applications.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(updateApplicationByUuid.pending, (state) => {
        state.updateApplicationByUuid.isLoading = true;
      })
      .addCase(updateApplicationByUuid.fulfilled, (state, action) => {
        state.updateApplicationByUuid.isLoading = false;
      })
      .addCase(updateApplicationByUuid.rejected, (state, action) => {
        state.updateApplicationByUuid.isLoading = false;
      })
      .addCase(createApplication.pending, (state) => {
        state.createApplication.isLoading = true;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.createApplication.isLoading = false;
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.createApplication.isLoading = false;
      })
      .addCase(updateApplicationStatusSendToCreditManager.pending, (state) => {
        state.createApplication.isLoading = true;
      })
      .addCase(
        updateApplicationStatusSendToCreditManager.fulfilled,
        (state, action) => {
          state.createApplication.isLoading = false;
        }
      )
      .addCase(
        updateApplicationStatusSendToCreditManager.rejected,
        (state, action) => {
          state.createApplication.isLoading = false;
        }
      )
      .addCase(getApplicationStatusCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicationStatusCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applicationsCount = action.payload.data;
      })
      .addCase(getApplicationStatusCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLoanOperaitonApplicationCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoanOperaitonApplicationCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loanOperationApplicationCount = action.payload.data;
      })
      .addCase(getLoanOperaitonApplicationCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLoanOperaitonApplicationCountBeforeContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoanOperaitonApplicationCountBeforeContract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applicationCountBeforeContract = action.payload.data;
      })
      .addCase(getLoanOperaitonApplicationCountBeforeContract.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(lockApplication.pending, (state) => {
        state.lockApplication.isLoading = true;
      })
      .addCase(lockApplication.fulfilled, (state, action) => {
        state.lockApplication.isLoading = false;
      })
      .addCase(lockApplication.rejected, (state, action) => {
        state.lockApplication.isLoading = false;
      })
      .addCase(checkLocked.pending, (state) => {
        state.lockApplication.isLoading = true;
      })
      .addCase(checkLocked.fulfilled, (state, action) => {
        state.lockApplication.isLoading = false;
      })
      .addCase(checkLocked.rejected, (state, action) => {
        state.lockApplication.isLoading = false;
      })
      .addCase(applicationCompleteFlagChange.pending, (state) => {
        state.readyForContract.isLoading = true;
      })
      .addCase(applicationCompleteFlagChange.fulfilled, (state, action) => {
        state.readyForContract.isLoading = false;
      })
      .addCase(applicationCompleteFlagChange.rejected, (state, action) => {
        state.readyForContract.isLoading = false;
      })
      .addCase(applicationCompleteSignature.pending, (state) => {
        state.readyForContract.isLoading = true;
      })
      .addCase(applicationCompleteSignature.fulfilled, (state, action) => {
        state.readyForContract.isLoading = false;
      })
      .addCase(applicationCompleteSignature.rejected, (state, action) => {
        state.readyForContract.isLoading = false;
      })
      .addCase(invoiceSendToCMCOFlagChange.pending, (state) => {
        state.invoiceFlag.isLoading = true;
      })
      .addCase(invoiceSendToCMCOFlagChange.fulfilled, (state, action) => {
        state.invoiceFlag.isLoading = false;
      })
      .addCase(invoiceSendToCMCOFlagChange.rejected, (state, action) => {
        state.invoiceFlag.isLoading = false;
      })
      ;
  },
});

export const { reset } = applicationSlice.actions;
export default applicationSlice.reducer;
