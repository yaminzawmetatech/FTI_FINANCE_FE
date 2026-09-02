import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import writeOffRecoveryIncomeService from "./writeOffRecoveryIncomeService";
import { uniqBy } from "lodash";

const initialState = {
  writeOffRecoveryIncomes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAllWriteOffRecoveryIncomes = createAsyncThunk(
  "writeOffRecoveryIncome/getAll",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await writeOffRecoveryIncomeService.getAllWriteOffRecoveryIncomes(params, url);

      const {
        metadata: { info },
      } = response;

      const remainingPages = Math.ceil(
        ((+info?.total || 0) - (+info?.offset || 0)) / (+info?.limit || 10)
      );

      const next_page_param =
        remainingPages >= 1
          ? { ...params, offset: (+info?.limit || 10) + (+info?.offset || 0) }
          : null;

      return {
        info: info,
        data: response.data,
        firstFetch,
        next_page_param,
      };
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getWriteOffRecoveryIncomeByUuid = createAsyncThunk(
  "writeOffRecoveryIncome/getByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await writeOffRecoveryIncomeService.getWriteOffRecoveryIncomeByUuid(uuid);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeStatusWriteOffRecoveryIncome = createAsyncThunk(
  "writeOffBatch/changeStatusWriteOffRecoveryIncome",
  async ({ status, uuid }, thunkAPI) => {
    try {
      return await writeOffRecoveryIncomeService.changeStatusWriteOffRecoveryIncome(
        status,
        uuid
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
export const writeOffRecoveryIncomeSlice = createSlice({
  name: "writeOffRecoveryIncomes",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWriteOffRecoveryIncomes.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllWriteOffRecoveryIncomes.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        state.writeOffRecoveryIncomes = firstFetch
          ? data
          : uniqBy([...state.writeOffRecoveryIncomes, ...data], "id");
        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllWriteOffRecoveryIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getWriteOffRecoveryIncomeByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWriteOffRecoveryIncomeByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffRecoveryIncomes = action.payload.data;
      })
      .addCase(getWriteOffRecoveryIncomeByUuid.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeStatusWriteOffRecoveryIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusWriteOffRecoveryIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffRecoveryIncomes = action.payload.data;
      })
      .addCase(changeStatusWriteOffRecoveryIncome.rejected, (state, action) => {
        state.isLoading = false;
      })
      ;
  },
});

export const { reset } = writeOffRecoveryIncomeSlice.actions;
export default writeOffRecoveryIncomeSlice.reducer;
