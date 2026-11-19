import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ModelService from "../services/ModelService";
import { uniqBy } from "lodash";

const initialState = {
  models: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAllModels = createAsyncThunk(
  "models/all",
  async (_, thunkAPI) => {
    try {
      return await ModelService.getModels();
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

export const getModels = createAsyncThunk(
  "models",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await ModelService.getModels(params, url);

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

export const createModel = createAsyncThunk(
  "model/create",
  async ({data}, thunkAPI) => {
    try {
      return await ModelService.createModel(data);
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

export const updateModel = createAsyncThunk(
  "model/update",
  async ({ data, uuid }, thunkAPI) => {
    try {
      return await ModelService.updateModel(data, uuid);
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

export const deleteModel = createAsyncThunk(
  "model/delete",
  async ({ uuid }, thunkAPI) => {
    try {
      return await ModelService.deleteModel(uuid);
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

export const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllModels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllModels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.models = action.payload.data;
      })
      .addCase(getAllModels.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(getModels.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getModels.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.models = data;
        } else {
          state.models = uniqBy(state.models.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getModels.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createModel.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.models = state.models.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteModel.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = modelSlice.actions;
export default modelSlice.reducer;
