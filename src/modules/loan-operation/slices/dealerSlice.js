import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dealerService from "../services/dealerService";
import { uniqBy } from "lodash";

const initialState = {
  dealers: [],
  dealersByType: [], // New array state for dealers fetched by dealer type
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createDealer = createAsyncThunk(
  "dealer/create",
  async (data, thunkAPI) => {
    try {
      return await dealerService.createDealer(data);
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

export const getAllDealers = createAsyncThunk(
  "dealers/all",
  async (_, thunkAPI) => {
    try {
      return await dealerService.getDealers();
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

export const getDealers = createAsyncThunk(
  "dealers",
  async ({ params, url, firstFetch = true, allFlag = false }, thunkAPI) => {
    try {
      if (!allFlag) {
        const response = await dealerService.getDealers(params, url);

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
      } else {
        const response = await dealerService.getDealers(params, allFlag);
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

export const getDealerByDealerType = createAsyncThunk(
  "dealers/byDealerType",
  async (params, thunkAPI) => {
    try {
      const response = await dealerService.getDealerByDealerType(params);
      return response.data; // Assuming `response.data` contains the list of dealers
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

export const getDealersByUserRole = createAsyncThunk(
  "dealersByUserRole",
  async ({ params }, thunkAPI) => {
    try {
      return await dealerService.getDealersByUserRole(params);
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

export const getDealerByUuid = createAsyncThunk(
  "dealersByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await dealerService.getDealerByUuid(uuid);
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

export const deleteDealer = createAsyncThunk(
  "dealer/delete",
  async (id, thunkAPI) => {
    try {
      return await dealerService.deleteDealer(id);
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

export const updateDealer = createAsyncThunk(
  "dealer/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await dealerService.updateDealer(id, newData);
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

export const dealerSlice = createSlice({
  name: "dealers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDealer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDealer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealers.push(action.payload);
      })
      .addCase(createDealer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDealersByUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealersByUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealers = action.payload.data;
      })
      .addCase(getDealersByUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllDealers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealers.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getDealers.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.dealers = data;
        } else {
          state.dealers = uniqBy(state.dealers.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getDealers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getAllDealers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealers = action.payload.data;
      })
      .addCase(getAllDealers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDealerByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //state.dealers = action.payload.data;
      })
      .addCase(getDealerByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDealer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDealer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteDealer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDealer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDealer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealers = state.dealers.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateDealer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDealerByDealerType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerByDealerType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealersByType = action.payload; // Update dealersByType state
      })
      .addCase(getDealerByDealerType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dealerSlice.actions;
export default dealerSlice.reducer;
