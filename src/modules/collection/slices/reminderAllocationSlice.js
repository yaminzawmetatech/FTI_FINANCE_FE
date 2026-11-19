import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reminderAllocationService from "../services/reminderAllocationService";
import { uniqBy } from "lodash";

const initialState = {
  reminderAllocations: [],
  allocatedReminderCounts: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  updateReminderAllocationByUuid: {
    isLoading: false,
  },
  reminderAllocationByUuid: {}
};

export const createReminderAllocation = createAsyncThunk(
  "reminderAllocations/create",
  async (body, thunkAPI) => {
    try {
      return await reminderAllocationService.createReminderAllocation(body);
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

export const reAssignReminderAllocation = createAsyncThunk(
  "reminderAllocations/reassign",
  async (body, thunkAPI) => {
    try {
      return await reminderAllocationService.reAssignReminderAllocation(body);
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

export const getReminderAllocationByUuid = createAsyncThunk(
  "reminderAllocationByUuid",
  async (uuid, thunkAPI) => {
    try {
      return await reminderAllocationService.getReminderAllocationByUuid(uuid);
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

export const getReminderAllocationByContractId = createAsyncThunk(
  "reminderAllocationByContractId",
  async (id, thunkAPI) => {
    try {
      return await reminderAllocationService.getReminderAllocationByContractId(id);
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

export const getReminderAllocations = createAsyncThunk(
  "reminderAllocations",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await reminderAllocationService.getReminderAllocations(params);

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

export const deleteReminderAllocationByUuid = createAsyncThunk(
  "reminderAllocations/delete",
  async (uuid, thunkAPI) => {
    try {
      return await reminderAllocationService.deleteReminderAllocationByUuid(uuid);
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

export const updateReminderAllocationByUuid = createAsyncThunk(
  "reminderAllocations/update",
  
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await reminderAllocationService.updateReminderAllocationByUuid(uuid, body);
    } catch (error) {
      console.log(error);
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

export const getAllocatedReminderCounts = createAsyncThunk(
  "reminderAllocations/getCounts",
  async ({ params }, thunkAPI) => {
    try {
      return await reminderAllocationService.getAllocatedReminderCounts(params);
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

export const reminderAllocationSlice = createSlice({
  name: "reminderAllocations",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReminderAllocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReminderAllocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reminderAllocations.push(action.payload);
      })
      .addCase(createReminderAllocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(reAssignReminderAllocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reAssignReminderAllocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reminderAllocations.push(action.payload);
      })
      .addCase(reAssignReminderAllocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReminderAllocations.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getReminderAllocations.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.reminderAllocations = data;
        } else {
          state.reminderAllocations = uniqBy(state.reminderAllocations.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getReminderAllocations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteReminderAllocationByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReminderAllocationByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reminderAllocations = state.reminderAllocations.filter(
          (subcategory) => subcategory._id !== action.payload.id
        );
      })
      .addCase(deleteReminderAllocationByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateReminderAllocationByUuid.pending, (state) => {
        state.updateReminderAllocationByUuid.isLoading = true;
      })
      .addCase(updateReminderAllocationByUuid.fulfilled, (state, action) => {
        state.updateReminderAllocationByUuid.isLoading = false;
      })
      .addCase(updateReminderAllocationByUuid.rejected, (state, action) => {
        state.updateReminderAllocationByUuid.isLoading = false;
      })
      .addCase(getReminderAllocationByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReminderAllocationByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reminderAllocationByUuid = action.payload.data;
      })
      .addCase(getReminderAllocationByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReminderAllocationByContractId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReminderAllocationByContractId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reminderAllocationByUuid = action.payload.data;
      })
      .addCase(getReminderAllocationByContractId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllocatedReminderCounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllocatedReminderCounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allocatedReminderCounts =action.payload.data;
      })
      .addCase(getAllocatedReminderCounts.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      ;
  },
});

export const { reset } = reminderAllocationSlice.actions;
export default reminderAllocationSlice.reducer;
