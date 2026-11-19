import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import bookingProcessService from "../services/bookingProcessService";

const initialState = {
  bookings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  selectedBooking: null, // Stores the booking fetched by UUID
};

export const updateBookings = createAsyncThunk(
  "booking/updateBookings",
  async (body, thunkAPI) => {
    try {
      return await bookingProcessService.updateBookingProcess(body);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async ({ body }, thunkAPI) => {
    
    try {
      return await bookingProcessService.createBookingProcess(body);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await bookingProcessService.getAllBookingProcesses(params, url);
      const { metadata: { info } } = response;

      const remainingPages = Math.ceil(
        ((+info?.total || 0) - (+info?.offset || 0)) / +info?.limit || 10
      );

      const next_page_param =
        remainingPages >= 1
          ? { ...params, offset: (+info?.limit || 10) + (+info?.offset || 0) }
          : null;

      return { info, data: response.data, firstFetch, next_page_param };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBookingByUuid = createAsyncThunk(
  "booking/getBookingByUuid",
  async (uuid, thunkAPI) => {
    try {
      return await bookingProcessService.getBookingByUuid(uuid);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookings.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        state.bookings = firstFetch ? data : uniqBy(state.bookings.concat(data), "id");
        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createBooking.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload.data;
      })
      .addCase(updateBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBookingByUuid.pending, (state) => {
        state.isLoading = true;
        state.selectedBooking = null; // Clear previous data before fetching
      })
      .addCase(getBookingByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedBooking = action.payload; // Store the fetched booking
      })
      .addCase(getBookingByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.selectedBooking = null; // Clear if request fails
      });
      
  },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;
