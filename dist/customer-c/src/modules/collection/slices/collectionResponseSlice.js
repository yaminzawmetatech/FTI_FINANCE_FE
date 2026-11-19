import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import collectionResponseService from "../services/collectionResponseService";
import { uniqBy } from "lodash";

const initialState = {
  collectionResponses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createCollectionResponse = createAsyncThunk(
  "collectionResponses/create",
  async (body, thunkAPI) => {
    try {
      return await collectionResponseService.createCollectionResponse(body);
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

export const getCollectionResponsesByUuid = createAsyncThunk(
  "collectionResponses/uuid",
  async (uuid, thunkAPI) => {
    try {
      return await collectionResponseService.getCollectionResponsesByUuid(uuid);
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

export const deleteCollectionResponse = createAsyncThunk(
  "collectionResponses/delete",
  async (id, thunkAPI) => {
    try {
      return await collectionResponseService.deleteCollectionResponse(id);
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

export const updateCollectionResponseByUuid = createAsyncThunk(
  "collectionResponses/update",
  
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await collectionResponseService.updateCollectionResponseByUuid(uuid, body);
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

export const collectionResponseSlice = createSlice({
  name: "collectionResponses",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCollectionResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollectionResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collectionResponses.push(action.payload);
      })
      .addCase(createCollectionResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCollectionResponsesByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollectionResponsesByUuid.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.collectionResponses = action.payload.data;
      })
      .addCase(getCollectionResponsesByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCollectionResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCollectionResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collectionResponses = state.collectionResponses.filter(
          (subcategory) => subcategory._id !== action.payload.id
        );
      })
      .addCase(deleteCollectionResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCollectionResponseByUuid.pending, (state) => {
        state.updateCollectionResponseByUuid.isLoading = true;
      })
      .addCase(updateCollectionResponseByUuid.fulfilled, (state, action) => {
        state.updateCollectionResponseByUuid.isLoading = false;
      })
      .addCase(updateCollectionResponseByUuid.rejected, (state, action) => {
        state.updateCollectionResponseByUuid.isLoading = false;
      });
  },
});

export const { reset } = collectionResponseSlice.actions;
export default collectionResponseSlice.reducer;
