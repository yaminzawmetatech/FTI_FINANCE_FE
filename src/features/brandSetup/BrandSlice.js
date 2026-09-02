import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import BrandService from "./BrandService";
import { uniqBy } from "lodash";

const initialState = {
  brands: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAllBrands = createAsyncThunk(
  "brands/all",
  async (_, thunkAPI) => {
    try {
      return await BrandService.getBrands();
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

export const getBrands = createAsyncThunk(
  "brands",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await BrandService.getBrands(params, url);

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

export const createBrand = createAsyncThunk(
  "brand/create",
  async ({data}, thunkAPI) => {
    try {
      return await BrandService.createBrand(data);
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

export const updateBrand = createAsyncThunk(
  "brand/update",
  async ({ data, uuid }, thunkAPI) => {
    try {
      return await BrandService.updateBrand(data, uuid);
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

export const deleteBrand = createAsyncThunk(
  "brand/delete",
  async ({ uuid }, thunkAPI) => {
    try {
      return await BrandService.deleteBrand(uuid);
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

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload.data;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.brands = data;
        } else {
          state.brands = uniqBy(state.brands.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = state.brands.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = brandSlice.actions;
export default brandSlice.reducer;
