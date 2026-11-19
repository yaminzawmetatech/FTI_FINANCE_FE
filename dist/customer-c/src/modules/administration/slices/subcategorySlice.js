import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subcategoryService from "../services/subcategoryService";

const initialState = {
  subCategories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createSubCategory = createAsyncThunk(
  "subcategory/create",
  async (subcategoryData, thunkAPI) => {
    try {
      return await subcategoryService.createSubCategory(subcategoryData);
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

export const getSubCategory = createAsyncThunk(
  "subcategory",
  async (_, thunkAPI) => {
    try {
      return await subcategoryService.getSubCategory();
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

export const deleteSubCategory = createAsyncThunk(
  "subcategory/delete",
  async (id, thunkAPI) => {
    try {
      return await subcategoryService.deleteSubCategory(id);
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

export const updateSubCategory = createAsyncThunk(
  "subcategory/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await subcategoryService.updateSubCategory(id, newData );
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

export const batchDeleteSubCategory = createAsyncThunk(
  "subcategory/batchDelete",
  async (ids, thunkAPI) => {
    try {
      return await subcategoryService.batchDeleteSubCategory(ids);
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

export const subcategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subCategories.push(action.payload);
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subCategories = action.payload.data;
      })
      .addCase(getSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subCategories = state.subCategories.filter(
          (subcategory) => subcategory._id !== action.payload.id
        );
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subCategories = action.payload.data;
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = subcategorySlice.actions;
export default subcategorySlice.reducer;
