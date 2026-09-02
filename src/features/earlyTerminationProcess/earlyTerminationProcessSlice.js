import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import earlyTerminationProcessService from "./earlyTerminationProcessService";
import { uniqBy } from "lodash";

const initialState = {
  earlyTerminationProcesses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createEarlyTerminationProcess = createAsyncThunk(
  "earlyTermination/createEarlyTerminationProcess",
  async ({ body }, thunkAPI) => {
    try {
      return await earlyTerminationProcessService.createEarlyTerminationProcess(body);
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

export const updateEarlyTerminationProcess = createAsyncThunk(
  "earlyTermination/updateEarlyTerminationProcess",
  async ({ body, uuid }, thunkAPI) => {
    try {
      return await earlyTerminationProcessService.updateEarlyTerminationProcess(body, uuid);
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

export const changeStatusEarlyTerminationProcess = createAsyncThunk(
  "earlyTermination/changeStatusEarlyTerminationProcess",
  async ({ status, uuid, id }, thunkAPI) => {
    try {
      return await earlyTerminationProcessService.changeStatusEarlyTerminationProcess(
        status,
        uuid,
        id
      );
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

export const getAllEarlyTerminationProcesses = createAsyncThunk(
  "earlyTermination/getAllcashDeposit",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await earlyTerminationProcessService.getAllEarlyTerminationProcesses(
        params,
        url
      );

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

export const getEarlyTerminationProcessByUuid = createAsyncThunk(
  "earlyTermination/getEarlyTerminationProcessByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await earlyTerminationProcessService.getEarlyTerminationProcessByUuid(uuid);
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

export const deleteEarlyTerminationProcess = createAsyncThunk(
  "earlyTermination/delete",
  async ({uuid}, thunkAPI) => {
    try {
      return await earlyTerminationProcessService.deleteEarlyTerminationProcess(uuid);
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


export const earlyTerminationProcessSlice = createSlice({
  name: "earlyTerminationProcesses",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEarlyTerminationProcesses.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllEarlyTerminationProcesses.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.earlyTerminationProcesses = data;
        } else {
          state.earlyTerminationProcesses = uniqBy(
            state.earlyTerminationProcesses.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllEarlyTerminationProcesses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createEarlyTerminationProcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEarlyTerminationProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.earlyTerminationProcesses = action.payload.data;
      })
      .addCase(createEarlyTerminationProcess.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getEarlyTerminationProcessByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEarlyTerminationProcessByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.earlyTerminationProcesses = action.payload.data;
      })
      .addCase(getEarlyTerminationProcessByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeStatusEarlyTerminationProcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusEarlyTerminationProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.earlyTerminationProcesses = action.payload.data;
      })
      .addCase(changeStatusEarlyTerminationProcess.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateEarlyTerminationProcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEarlyTerminationProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.earlyTerminationProcesses = action.payload.data;
      })
      .addCase(updateEarlyTerminationProcess.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteEarlyTerminationProcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEarlyTerminationProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.earlyTerminationProcesses = action.payload.data;
      })
      .addCase(deleteEarlyTerminationProcess.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const { reset } = earlyTerminationProcessSlice.actions;
export default earlyTerminationProcessSlice.reducer;
