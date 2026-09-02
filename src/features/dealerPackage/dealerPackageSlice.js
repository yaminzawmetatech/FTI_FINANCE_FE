import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dealerPackageService from "./dealerPackageService";
import { uniqBy } from "lodash";

const initialState = {
  dealerPackages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  dealerPackagesById: [],
};

export const createDealerPackage = createAsyncThunk(
  "dealerPackage/create",
  async (data, thunkAPI) => {
    try {
      return await dealerPackageService.createDealerPackage(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDealerPackages = createAsyncThunk(
  "dealerPackages",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await dealerPackageService.getDealerPackages(params, url);
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
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDealerPackagesByDealerId = createAsyncThunk(
  "dealerPackagesByDealerId",
  async ({ dealerId }, thunkAPI) => {
    try {
      return await dealerPackageService.getDealerPackagesByDealerId(dealerId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const getDealerPackagesById = createAsyncThunk(
  "dealerPackagesById",
  async ({ id }, thunkAPI) => {
    try {
      return await dealerPackageService.getDealerPackagesById(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllDealerPackages = createAsyncThunk(
  "dealerPackages/all",
  async ({ params }, thunkAPI) => {
    try {
      return await dealerPackageService.getAllDealerPackages(params);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteDealerPackage = createAsyncThunk(
  "dealerPackage/delete",
  async (id, thunkAPI) => {
    try {
      return await dealerPackageService.deleteDealerPackage(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateDealerPackage = createAsyncThunk(
  "dealerPackage/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await dealerPackageService.updateDealerPackage(id, newData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dealerPackageSlice = createSlice({
  name: "dealerPackages",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDealerPackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDealerPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerPackages.push(action.payload);
      })
      .addCase(createDealerPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDealerPackages.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getDealerPackages.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.dealerPackages = data;
        } else {
          state.dealerPackages = uniqBy(state.dealerPackages.concat(data), "id");
        }
        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getDealerPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getDealerPackagesByDealerId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerPackagesByDealerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerPackages = action.payload.data;
      })
      .addCase(getDealerPackagesByDealerId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDealerPackagesById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerPackagesById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerPackagesById = action.payload.data;
      })
      .addCase(getDealerPackagesById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllDealerPackages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDealerPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerPackages = action.payload.data;
      })
      .addCase(getAllDealerPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDealerPackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDealerPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerPackages = state.dealerPackages.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteDealerPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDealerPackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDealerPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerPackages = state.dealerPackages.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateDealerPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dealerPackageSlice.actions;
export default dealerPackageSlice.reducer;
