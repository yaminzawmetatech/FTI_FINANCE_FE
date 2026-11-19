import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cashDepositService from "../services/cashDepositService";
import { uniqBy } from "lodash";

const initialState = {
  cashDeposits: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  cashDepositBalance: [],
  cashDepositHistory: []
};

export const createCashDeposit = createAsyncThunk(
  "cashDeposit/createCashDeposit",
  async ({ body }, thunkAPI) => {
    try {
      return await cashDepositService.createCashDeposit(body);
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

export const updateCashDeposit = createAsyncThunk(
  "cashDeposit/updateCashDeposit",
  async ({ body, uuid }, thunkAPI) => {
    try {
      return await cashDepositService.updateCashDeposit(body, uuid);
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

export const changeStatusCashDeposit = createAsyncThunk(
  "cashDeposit/changeStatusCashDeposit",
  async ({ status, uuid, id }, thunkAPI) => {
    try {
      return await cashDepositService.changeStatusCashDeposit(
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

export const postCashDeposit = createAsyncThunk(
  "cashDeposit/postCashDeposit",
  async ({ uuid, id }, thunkAPI) => {
    try {
      return await cashDepositService.postCashDeposit(
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

export const changeStatusCashDepositByTable = createAsyncThunk(
  "cashDeposit/changeStatusCashDepositByTable",
  async ({ status, uuid, id }, thunkAPI) => {
    try {
      return await cashDepositService.changeStatusCashDepositByTable(
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

export const getAllCashDeposits = createAsyncThunk(
  "cashDeposit/getAllcashDeposit",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await cashDepositService.getAllCashDeposits(
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

export const getCashDepositByUuid = createAsyncThunk(
  "cashDeposit/getCashDepositByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await cashDepositService.getCashDepositByUuid(uuid);
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

export const getCashDepositBalance = createAsyncThunk(
  "cashDeposit/cashDepositBalance",
  async ({categoryId,cashDepositUuid}, thunkAPI) => {
    try {
      return await cashDepositService.getCashDepositBalance(categoryId,cashDepositUuid);
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

export const getCashDepositHistory = createAsyncThunk(
  "cashDeposit/cashDepositHistory",
  async ({cashDepositUuid}, thunkAPI) => {
    try {
      return await cashDepositService.getCashDepositHistory(cashDepositUuid);
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

export const cashDepositSlice = createSlice({
  name: "cashDeposits",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCashDeposits.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllCashDeposits.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.cashDeposits = data;
        } else {
          state.cashDeposits = uniqBy(
            state.cashDeposits.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllCashDeposits.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createCashDeposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCashDeposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cashDeposits = action.payload.data;
      })
      .addCase(createCashDeposit.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getCashDepositByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCashDepositByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cashDeposits = action.payload.data;
      })
      .addCase(getCashDepositByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeStatusCashDeposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusCashDeposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cashDeposits = action.payload.data;
      })
      .addCase(changeStatusCashDeposit.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateCashDeposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCashDeposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cashDeposits = action.payload.data;
      })
      .addCase(updateCashDeposit.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getCashDepositBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCashDepositBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cashDepositBalance = action.payload.data;
      })
      .addCase(getCashDepositBalance.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeStatusCashDepositByTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusCashDepositByTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(changeStatusCashDepositByTable.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(postCashDeposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postCashDeposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(postCashDeposit.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getCashDepositHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCashDepositHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cashDepositHistory = action.payload.data;
      })
      .addCase(getCashDepositHistory.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = cashDepositSlice.actions;
export default cashDepositSlice.reducer;
