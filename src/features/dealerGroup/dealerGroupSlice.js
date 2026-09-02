import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dealerGroupService from "./dealerGroupService";
import { uniqBy } from "lodash";

const initialState = {
  dealerGroups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createDealerGroup = createAsyncThunk(
  "dealerGroup/create",
  async (data, thunkAPI) => {
    try {
      return await dealerGroupService.createDealerGroup(data);
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

export const getAllDealerGroups = createAsyncThunk(
  "dealerGroups/all", 
  async ({params}, thunkAPI) => {
  try {
    return await dealerGroupService.getAllDealerGroups(params);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDealerGroups = createAsyncThunk(
  "dealerGroups",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await dealerGroupService.getDealerGroups(params, url);

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

export const getDealerGroupsByStatus = createAsyncThunk(
  "dealerGroupsByStatus", 
  async ({status}, thunkAPI) => {
  try {
    return await dealerGroupService.getDealerGroupsByStatus(status);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteDealerGroup = createAsyncThunk(
  "dealerGroup/delete",
  async (id, thunkAPI) => {
    try {
      return await dealerGroupService.deleteDealerGroup(id);
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

export const updateDealerGroup = createAsyncThunk(
  "dealerGroup/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await dealerGroupService.updateDealerGroup(id, newData);
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

export const dealerGroupSlice = createSlice({
  name: "dealerGroups",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDealerGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDealerGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerGroups.push(action.payload);
      })
      .addCase(createDealerGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDealerGroupsByStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerGroupsByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerGroups = action.payload.data;
      })
      .addCase(getDealerGroupsByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllDealerGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerGroups.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getDealerGroups.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.dealerGroups = data;
        } else {
          state.dealerGroups = uniqBy(state.dealerGroups.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getDealerGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getAllDealerGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerGroups = action.payload.data;
      })
      .addCase(getAllDealerGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDealerGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDealerGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.dealerGroups = state.dealerGroups.filter(
        //   (item) => item._id !== action.payload.id
        // );
      })
      .addCase(deleteDealerGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDealerGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDealerGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerGroups = state.dealerGroups.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateDealerGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dealerGroupSlice.actions;
export default dealerGroupSlice.reducer;
