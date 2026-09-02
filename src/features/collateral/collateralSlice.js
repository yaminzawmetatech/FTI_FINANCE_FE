import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import collateralService from "./collateralService";
import { uniqBy } from "lodash";

const initialState = {
  collaterals: [],
  selectedCollateral: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  lockCollateral: {
    isLoading: false,
  },
  repaymentCollateral:[]
};

export const getAllCollaterals = createAsyncThunk(
  "collaterals/all",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await collateralService.getAllCollaterals(params, url);

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
        info,
        data: response.data,
        firstFetch,
        next_page_param,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCollateral = createAsyncThunk(
  "collaterals",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await collateralService.getAllCollaterals(params, url);

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
        info,
        data: response.data,
        firstFetch,
        next_page_param,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCollateralByUuid = createAsyncThunk(
  "collaterals/getByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await collateralService.getCollateralByUuid(uuid);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCollateral = createAsyncThunk(
  "collaterals/create",
  async ({ data }, thunkAPI) => {
    try {
      return await collateralService.createCollateral(data);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCollateral = createAsyncThunk(
  "collaterals/update",
  async ({ data, uuid }, thunkAPI) => {
    try {
      return await collateralService.updateCollateral(data, uuid);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCollateral = createAsyncThunk(
  "collaterals/delete",
  async ({ uuid }, thunkAPI) => {
    try {
      return await collateralService.deleteCollateral(uuid);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const lockCollateral = createAsyncThunk(
  "lock-collateral",
  async ({ data }, thunkAPI) => {
    try {
      return await collateralService.lockCollateral(data);
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

export const checkLocked = createAsyncThunk(
  "check-collateral-edit-permission",
  async ({ data }, thunkAPI) => {
    try {
      return await collateralService.checkLocked(data);
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

export const updateCollateralStatusChange = createAsyncThunk(
  "collaterals/updateCollateralStatusChange",
  async ({ data, uuid }, thunkAPI) => {
    try {
      return await collateralService.updateCollateralStatusChange(data, uuid);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRepaymentCollaterals = createAsyncThunk(
  "collaterals/repaymentCollateral",
  async ({ params }, thunkAPI) => {
    try {
      return await collateralService.getRepaymentCollaterals(params);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const licenseRenewalAssign = createAsyncThunk(
  "collaterals/licenseRenewalAssign",
  async ({ data }, thunkAPI) => {
    try {
      return await collateralService.licenseRenewalAssign(data);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const collateralSlice = createSlice({
  name: "collaterals",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollaterals.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllCollaterals.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // state.collaterals = action.payload.data;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.collaterals = data;
        } else {
          state.collaterals = uniqBy(state.collaterals.concat(data), "id");
        }
        state.next_page_param = next_page_param;
      })
      .addCase(getAllCollaterals.rejected, (state, action) => {
        state.isLoading = false;
        // state.message = action.error.message;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getCollateral.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getCollateral.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.collaterals = data;
        } else {
          state.collaterals = uniqBy(state.collaterals.concat(data), "id");
        }
        state.next_page_param = next_page_param;
      })
      .addCase(getCollateral.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getCollateralByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollateralByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedCollateral = action.payload;
      })
      .addCase(getCollateralByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.selectedCollateral = null;
      })
      .addCase(lockCollateral.pending, (state) => {
        state.lockCollateral.isLoading = true;
      })
      .addCase(lockCollateral.fulfilled, (state, action) => {
        state.lockCollateral.isLoading = false;
      })
      .addCase(lockCollateral.rejected, (state, action) => {
        state.lockCollateral.isLoading = false;
      })
      .addCase(checkLocked.pending, (state) => {
        state.lockCollateral.isLoading = true;
      })
      .addCase(checkLocked.fulfilled, (state, action) => {
        state.lockCollateral.isLoading = false;
      })
      .addCase(checkLocked.rejected, (state, action) => {
        state.lockCollateral.isLoading = false;
      })
      .addCase(createCollateral.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollateral.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createCollateral.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCollateral.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollateral.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collaterals = state.collaterals.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateCollateral.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCollateral.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCollateral.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collaterals = state.collaterals.filter(
          (item) => item.id !== action.meta.arg.uuid
        );
      })
      .addCase(deleteCollateral.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCollateralStatusChange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollateralStatusChange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collaterals = state.collaterals.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateCollateralStatusChange.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRepaymentCollaterals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRepaymentCollaterals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.repaymentCollateral = action.payload.data;
      })
      .addCase(getRepaymentCollaterals.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      })
      .addCase(licenseRenewalAssign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(licenseRenewalAssign.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(licenseRenewalAssign.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = collateralSlice.actions;
export default collateralSlice.reducer;
