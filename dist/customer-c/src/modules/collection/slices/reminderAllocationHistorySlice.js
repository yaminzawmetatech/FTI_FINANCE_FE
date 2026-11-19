import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reminderAllocationService from "../services/reminderAllocationService";
import { uniqBy } from "lodash";

const initialState = {
  reminderAllocationsByContractId: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getReminderAllocationHistoryByContractId = createAsyncThunk(
    "reminderAllocationHistoryByContractId",
    async ({ params, firstFetch = true }, thunkAPI) => {
      try {
        const response = await reminderAllocationService.getReminderAllocationHistoryByContractId(params);
  
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

  export const reminderAllocationHistorySlice = createSlice({
    name: "reminderAllocationsByContractId",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getReminderAllocationHistoryByContractId.pending, (state) => {
          state.isLoading = true;
          state.next_page_param = null;
        })
        .addCase(getReminderAllocationHistoryByContractId.fulfilled, (state, action) => {
          state.isSuccess = true;
          const { firstFetch, data, next_page_param } = action.payload;
          if (firstFetch) {
            state.reminderAllocationsByContractId = data;
          } else {
            state.reminderAllocationsByContractId = uniqBy(state.reminderAllocationsByContractId.concat(data), "id");
          }
  
          state.next_page_param = next_page_param;
          state.isLoading = false;
        })
        .addCase(getReminderAllocationHistoryByContractId.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.next_page_param = null;
        });
    },
  });
  
  export const { reset } = reminderAllocationHistorySlice.actions;
  export default reminderAllocationHistorySlice.reducer;