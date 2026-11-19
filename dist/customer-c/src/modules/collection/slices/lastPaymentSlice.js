import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LastPaymentService from "../services/lastPaymentService";
import { uniqBy } from "lodash";

const initialState = {
  lastPayments: [],
  lastPaymentHistory: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createLastPayment = createAsyncThunk(
  "lastPayment/create",
  async (data, thunkAPI) => {
    try {
      return await LastPaymentService.createLastPayment(data);
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

export const getLastPayments = createAsyncThunk(
  "get/lastPayments",
  async ({ params, url, firstFetch = true, allFlag = false }, thunkAPI) => {
    try {
    
      if(!allFlag){
        const response = await LastPaymentService.getLastPayments(params);
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
      }else{
        const response = await LastPaymentService.getLastPayments(params, allFlag);
        return {
          data: response.data,
          firstFetch,
          allFlag,
        };
      }
      
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



export const getLastPaymentHistory = createAsyncThunk(
  "get/lastPaymentHistory",
  async ({ params, url, firstFetch = true, allFlag = false }, thunkAPI) => {
    try {
    
      if(!allFlag){
        const response = await LastPaymentService.getLastPaymentHistory(params);
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
      }else{
        const response = await LastPaymentService.getLastPayments(params, allFlag);
        return {
          data: response.data,
          firstFetch,
          allFlag,
        };
      }
      
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

export const deleteLastPayment = createAsyncThunk(
  "lastPayment/delete",
  async (id, thunkAPI) => {
    try {
      return await LastPaymentService.deleteLastPayment(id);
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

export const updateLastPayment = createAsyncThunk(
  "lastPayment/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await LastPaymentService.updateLastPayment(id, newData);
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

export const LastPaymentSlice = createSlice({
  name: "lastPayments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLastPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLastPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lastPayments.push(action.payload);
      })
      .addCase(createLastPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLastPayments.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getLastPayments.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param, allFlag } = action.payload;
        if (allFlag) {
          state.lastPayments = data;
        }
        else if (firstFetch) {
          state.lastPayments = data;
        } else {
          state.lastPayments = uniqBy(state.lastPayments.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getLastPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getLastPaymentHistory.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getLastPaymentHistory.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param, allFlag } = action.payload;
        if (allFlag) {
          state.lastPaymentHistory = data;
        }
        else if (firstFetch) {
          state.lastPaymentHistory = data;
        } else {
          state.lastPaymentHistory = uniqBy(state.lastPaymentHistory.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getLastPaymentHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteLastPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLastPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteLastPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateLastPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLastPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lastPayments = state.lastPayments.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateLastPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = LastPaymentSlice.actions;
export default LastPaymentSlice.reducer;
