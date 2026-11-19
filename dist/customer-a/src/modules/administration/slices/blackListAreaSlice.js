import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blackListAreaService from "../services/blackListAreaService";
import { uniqBy } from "lodash";

const initialState = {
  blackListArea: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getBlackListAreaList = createAsyncThunk(
  "blackListArea/list",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await blackListAreaService.getBlackListAreaList(params, url);

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

export const createExcludeBlackListArea = createAsyncThunk(
  "excludeArea/create",
  async (body, thunkAPI) => {
    try {
      return await blackListAreaService.createExcludeBlackListArea(body);
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


export const blackListAreaSlice = createSlice({
  name: "blackListArea",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlackListAreaList.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getBlackListAreaList.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.blackListArea = data;
        } else {
          state.blackListArea = state.blackListArea.concat(data);
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getBlackListAreaList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createExcludeBlackListArea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExcludeBlackListArea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //state.addressCities.push(action.payload);
      })
      .addCase(createExcludeBlackListArea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = blackListAreaSlice.actions;
export default blackListAreaSlice.reducer;
