import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import demandLetterService from "./demandLetterService";
import { uniqBy } from "lodash";

const initialState = {
  demandLetters: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createDemandLetter = createAsyncThunk(
  "demandLetter/createDemandLetter",
  async ({params}, thunkAPI) => {
    try {
      return await demandLetterService.createDemandLetter(params);
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

export const getAllDemandLetters = createAsyncThunk(
  "demandLetter/getAllDemandLetters",
  async ({ contract_id, params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response =
        await demandLetterService.getAllDemandLetters(contract_id, params, url);
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

export const demandLetterSlice = createSlice({
  name: "demandLetters",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDemandLetters.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllDemandLetters.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.demandLetters = data;
        } else {
          // state.applications = state.applications.concat(data);
          state.demandLetters = uniqBy(
            state.demandLetters.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllDemandLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createDemandLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDemandLetter.fulfilled, (state, action) => {
        state.isSuccess = true;
        // state.demandLetters = action.payload.data;
        state.isLoading = false;
      })
      .addCase(createDemandLetter.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = demandLetterSlice.actions;
export default demandLetterSlice.reducer;
