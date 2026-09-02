import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerListService from "./customerListService";

const initialState = {
  customers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  customerDetail: {
    customer: null,
    isLoading: false,
  },
};

export const getCustomerDetail = createAsyncThunk(
  "customers/getCustomer",
  async ({ id }, thunkAPI) => {
    try {
      return await customerListService.getCustomerDetail(id);
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

// Get all customers
export const getAllCustomers = createAsyncThunk("customer/getAllCustomers", async (_, thunkAPI) => {
  try {
    return await customerListService.getAllCustomers();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const customerListSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerDetail.pending, (state) => {
        state.customerDetail.isLoading = true;
      })
      .addCase(getCustomerDetail.fulfilled, (state, action) => {
        state.customerDetail.customer = action.payload.data;
        state.customerDetail.isLoading = false;
      })
      .addCase(getCustomerDetail.rejected, (state, action) => {
        state.guarantorDetail.isLoading = false;
      })
      .addCase(getAllCustomers.pending, (state) => {
        state.customerDetail.isLoading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.customerDetail.customer = action.payload.data.data;
        state.customerDetail.isLoading = false;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.customerDetail.isLoading = false;
      })
  },
});

export const { reset } = customerListSlice.actions;
export default customerListSlice.reducer;
