import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eomSyncService from "../services/eomSyncService";
import { uniqBy } from "lodash";

const initialState = {
  syncEOM: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const syncEOM = createAsyncThunk(
  "syncEOM/syncEOM",
  async ({id}, thunkAPI) => {
    try {
      return await eomSyncService.syncEOM(id);
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

export const getAllSyncEOM = createAsyncThunk(
  "syncEOM/getAllSyncEOM",
  async ({ id,params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response =  await eomSyncService.getAllSyncEOM(id,params, url);

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

export const syncEOMSlice = createSlice({
  name: "syncEOM",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSyncEOM.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllSyncEOM.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.syncEOM = data;
        } else {
          // state.applications = state.applications.concat(data);
          state.syncEOM = uniqBy(
            state.syncEOM.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllSyncEOM.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(syncEOM.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncEOM.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.syncEOM = action.payload.data;
        state.isLoading = false;
      })
      .addCase(syncEOM.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = syncEOMSlice.actions;
export default syncEOMSlice.reducer;
