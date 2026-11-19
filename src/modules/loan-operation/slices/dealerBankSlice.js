import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dealerBankService from "../services/dealerBankService";
import { uniqBy } from "lodash";

const initialState = {
  dealerBanks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createDealerBank = createAsyncThunk(
  "dealerBank/create",
  async (data, thunkAPI) => {
    try {
      return await dealerBankService.createDealerBank(data);
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

export const getAllDealerBanks = createAsyncThunk(
  "dealerBanks/all", 
  async (_, thunkAPI) => {
  try {
    return await dealerBankService.getDealerBanks();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDealerBanks = createAsyncThunk(
  "dealerBanks",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await dealerBankService.getDealerBanks(params, url);

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

export const getDealerBanksByStatus = createAsyncThunk(
  "dealerBanksByStatus", 
  async ({status}, thunkAPI) => {
  try {
    return await dealerBankService.getDealerBanksByStatus(status);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteDealerBank = createAsyncThunk(
  "dealerBank/delete",
  async (id, thunkAPI) => {
    try {
      return await dealerBankService.deleteDealerBank(id);
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

export const updateDealerBank = createAsyncThunk(
  "dealerBank/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await dealerBankService.updateDealerBank(id, newData);
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

export const dealerBankSlice = createSlice({
  name: "dealerBanks",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDealerBank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDealerBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerBanks.push(action.payload);
      })
      .addCase(createDealerBank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDealerBanksByStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerBanksByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerBanks = action.payload.data;
      })
      .addCase(getDealerBanksByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllDealerBanks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerBanks.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getDealerBanks.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.dealerBanks = data;
        } else {
          state.dealerBanks = uniqBy(state.dealerBanks.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getDealerBanks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getAllDealerBanks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerBanks = action.payload.data;
      })
      .addCase(getAllDealerBanks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDealerBank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDealerBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.dealerBanks = state.dealerBanks.filter(
        //   (position) => position._id !== action.payload.id
        // );
      })
      .addCase(deleteDealerBank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDealerBank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDealerBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerBanks = state.dealerBanks.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateDealerBank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dealerBankSlice.actions;
export default dealerBankSlice.reducer;
