import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subbusinesscategoryService from "./subbusinesscategoryService";

const initialState = {
  subBusinessCategories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createSubBusinessCategory = createAsyncThunk(
  "subbusinesscategory/create",
  async (subbusinesscategoryData, thunkAPI) => {
    try {
      return await subbusinesscategoryService.createSubBusinessCategory(subbusinesscategoryData);
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

export const getSubBusinessCategories = createAsyncThunk(
  "subbusinesscategory",
  async (_, thunkAPI) => {
    try {
      return await subbusinesscategoryService.getSubBusinessCategories();
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

export const deleteSubBusinessCategory = createAsyncThunk(
  "subbusinesscategory/delete",
  async (id, thunkAPI) => {
    try {
      return await subbusinesscategoryService.deleteSubBusinessCategory(id);
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

export const updateSubBusinessCategory = createAsyncThunk(
  "subbusinesscategory/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await subbusinesscategoryService.updateSubBusinessCategory(id, newData);
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

export const batchDeleteSubBusinessCategory = createAsyncThunk(
  "subbusinesscategory/batchDelete",
  async (ids, thunkAPI) => {
    try {
      return await subbusinesscategoryService.batchDeleteSubBusinessCategory(ids);
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

export const subbusinesscategorySlice = createSlice({
  name: "subBusinessCategories",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubBusinessCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubBusinessCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subBusinessCategories.push(action.payload);
      })
      .addCase(createSubBusinessCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubBusinessCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubBusinessCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subBusinessCategories = action.payload.data;
      })
      .addCase(getSubBusinessCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSubBusinessCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubBusinessCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subBusinessCategories = state.subBusinessCategories.filter(
          (subbusinesscategory) => subbusinesscategory._id !== action.payload.id
        );
      })
      .addCase(deleteSubBusinessCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSubBusinessCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubBusinessCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subBusinessCategories = action.payload.data;
      })
      .addCase(updateSubBusinessCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = subbusinesscategorySlice.actions;
export default subbusinesscategorySlice.reducer;
