import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import refinanceCustomerService from "../services/refinanceCustomerService";
import { uniqBy } from "lodash";

const initialState = {
  refinanceCustomers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getRefinanceCustomers = createAsyncThunk(
  "refinanceCustomers",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await refinanceCustomerService.getRefinanceCustomers(
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

export const createRefinanceCustomer = createAsyncThunk(
  "refinanceCustomer/create",
  async (data, thunkAPI) => {
    try {
      return await refinanceCustomerService.createRefinanceCustomer(data);
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

export const deleteRefinanceCustomer = createAsyncThunk(
  "refinanceCustomer/delete",
  async (id, thunkAPI) => {
    try {
      return await refinanceCustomerService.deleteRefinanceCustomer(id);
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

export const updateRefinanceCustomer = createAsyncThunk(
  "refinanceCustomer/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await refinanceCustomerService.updateRefinanceCustomer(
        id,
        newData
      );
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

export const refinanceCustomerSlice = createSlice({
  name: "refinanceCustomers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRefinanceCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRefinanceCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.refinanceCustomers.push(action.payload);
      })
      .addCase(createRefinanceCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRefinanceCustomers.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getRefinanceCustomers.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.refinanceCustomers = data;
        } else {
          state.refinanceCustomers = uniqBy(
            state.refinanceCustomers.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getRefinanceCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(updateRefinanceCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRefinanceCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.refinanceCustomers = state.refinanceCustomers.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateRefinanceCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRefinanceCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRefinanceCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.refinanceCustomers.push(action.payload);
      })
      .addCase(deleteRefinanceCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = refinanceCustomerSlice.actions;
export default refinanceCustomerSlice.reducer;
