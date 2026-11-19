import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerInquiriesFormService from "../services/customerInquiriesFormService";
import { uniqBy } from "lodash";

const initialState = {
  customerInquiries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createCustomerInquiries = createAsyncThunk(
  "customerInquiry/create",
  async (data, thunkAPI) => {
    try {
      return await customerInquiriesFormService.createCustomerInquiries(data);
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

export const getAllcustomerInquiries = createAsyncThunk(
  "customerInquiries/all", 
  async (_, thunkAPI) => {
  try {
    return await customerInquiriesFormService.getCustomerInquiries();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getCustomerInquiries = createAsyncThunk(
  "customerInquiries",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await customerInquiriesFormService.getCustomerInquiries(params, url);

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

export const updateCustomerInquiries = createAsyncThunk(
  "customerInquiry/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await customerInquiriesFormService.updateCustomerInquiries(id, newData);
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

export const customerInquiriesSlice = createSlice({
  name: "customerInquiries",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomerInquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomerInquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customerInquiries.push(action.payload);
      })
      .addCase(createCustomerInquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllcustomerInquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerInquiries.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getCustomerInquiries.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.customerInquiries = data;
        } else {
          state.customerInquiries = uniqBy(state.customerInquiries.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getCustomerInquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getAllcustomerInquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customerInquiries = action.payload.data;
      })
      .addCase(getAllcustomerInquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCustomerInquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomerInquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customerInquiries = state.customerInquiries.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateCustomerInquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = customerInquiriesSlice.actions;
export default customerInquiriesSlice.reducer;
