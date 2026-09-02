import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import excludeBlackListAreaService from "./excludeBlackListAreaService";
import { uniqBy } from "lodash";

const initialState = {
  excludeBlackListArea: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getExcludeBlackListAreaList = createAsyncThunk(
  "excludeBlackListArea/list",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await excludeBlackListAreaService.getExcludeBlackListAreaList(params, url);

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

export const deleteExcludeBlackListArea = createAsyncThunk(
  "excludeBlackListArea/delete",
  async (id, thunkAPI) => {
    try {
      return await excludeBlackListAreaService.deleteExcludeBlackListArea(id);
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

export const batchDeleteExcludeBlackList = createAsyncThunk(
  "excludeBlackListArea/batchDelete",
  async (ids, thunkAPI) => {
    try {
      return await excludeBlackListAreaService.batchDeleteExcludeBlackList(ids);
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


export const excludeBlackListAreaSlice = createSlice({
  name: "excludeBlackListArea",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExcludeBlackListAreaList.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getExcludeBlackListAreaList.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.excludeBlackListArea = data;
        } else {
          state.excludeBlackListArea = uniqBy(state.excludeBlackListArea.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getExcludeBlackListAreaList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteExcludeBlackListArea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExcludeBlackListArea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.excludeBlackListArea = state.excludeBlackListArea.filter(
          (excludeBlackListArea) => excludeBlackListArea._id !== action.payload.id
        );
      })
      .addCase(deleteExcludeBlackListArea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(batchDeleteExcludeBlackList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(batchDeleteExcludeBlackList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(batchDeleteExcludeBlackList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = excludeBlackListAreaSlice.actions;
export default excludeBlackListAreaSlice.reducer;
