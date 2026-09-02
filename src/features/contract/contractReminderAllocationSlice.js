import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contractService from "./contractService";
import { uniqBy } from "lodash";

const initialState = {
  contractsReminderAllocation: [],
  reminderAllocationCounts: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getContractsForReminderAllocation = createAsyncThunk(
  "contracts-reminder-allocation",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await contractService.getContractsForReminderAllocation(params);

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
        info : info,
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

export const getReminderAllocationCounts = createAsyncThunk(
  "contracts/getCounts",
  async ({params}, thunkAPI) => {
    try {
      return await contractService.getReminderAllocationCounts(params);
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

export const contractReminderSlice = createSlice({
  name: "contractsReminderAllocation",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContractsForReminderAllocation.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getContractsForReminderAllocation.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.contractsReminderAllocation = data;
        } else {
          state.contractsReminderAllocation = uniqBy(state.contractsReminderAllocation.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getContractsForReminderAllocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getReminderAllocationCounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReminderAllocationCounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reminderAllocationCounts =action.payload.data;
      })
      .addCase(getReminderAllocationCounts.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
  },
});

export const { reset } = contractReminderSlice.actions;
export default contractReminderSlice.reducer;
