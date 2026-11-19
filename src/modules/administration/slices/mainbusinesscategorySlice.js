import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mainbusinesscategoryService from "../services/mainbusinesscategoryService";
//import { getType } from "../../../node_modules/@reduxjs/toolkit/dist/createAction";

const initialState = {
  mainBusinessCategories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createMainBusinessCategory = createAsyncThunk(
  "mainbusinesscategory/create",
  async (mainbusinesscategoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await mainbusinesscategoryService.createMainBusinessCategory(
        mainbusinesscategoryData,
        token
      );
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

export const getMainBusinessCategories = createAsyncThunk(
  "mainBusinessCategories",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await mainbusinesscategoryService.getMainBusinessCategories(token);
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

export const deleteMainBusinessCategory = createAsyncThunk(
  "mainbusinesscategory/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await mainbusinesscategoryService.deleteMainBusinessCategory(
        id,
        token
      );
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

export const updateMainBusinessCategory = createAsyncThunk(
  "mainbusinesscategory/update",
  async ({ id, body }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await mainbusinesscategoryService.updateMainBusinessCategory(
        id,
        body,
        token
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

export const batchDeleteMainBusinessCategory = createAsyncThunk(
  "mainbusinesscategory/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await mainbusinesscategoryService.batchDeleteMainBusinessCategory(
        ids,
        token
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

export const mainbusinesscategorySlice = createSlice({
  name: "mainBusinessCategory",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMainBusinessCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMainBusinessCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mainBusinessCategories.push(action.payload);
      })
      .addCase(createMainBusinessCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMainBusinessCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMainBusinessCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mainBusinessCategories = action.payload.data;
      })
      .addCase(getMainBusinessCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMainBusinessCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMainBusinessCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mainBusinessCategories = state.mainBusinessCategories.filter(
          (mainbusinesscategory) =>
            mainbusinesscategory._id !== action.payload.id
        );
      })
      .addCase(deleteMainBusinessCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMainBusinessCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMainBusinessCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mainBusinessCategories = action.payload.data;
      })
      .addCase(updateMainBusinessCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = mainbusinesscategorySlice.actions;
export default mainbusinesscategorySlice.reducer;
