import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import typeofbusinessService from "../services/typeofbusinessService";

const initialState = {
  typeofBusinesses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createTypeofBusiness = createAsyncThunk(
  "typeofbusiness/create",
  async (typeofbusinessData, thunkAPI) => {
    try {
      return await typeofbusinessService.createTypeofBusiness(typeofbusinessData);
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

export const getTypeofBusinesses = createAsyncThunk(
  "typeofBusinesses",
  async (_, thunkAPI) => {
    try {
      return await typeofbusinessService.getTypeofBusinesses();
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

export const deleteTypeofBusiness = createAsyncThunk(
  "typeofbusiness/delete",
  async (id, thunkAPI) => {
    try {
      return await typeofbusinessService.deleteTypeofBusiness(id);
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

export const updateTypeofBusiness = createAsyncThunk(
  "typeofbusiness/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await typeofbusinessService.updateTypeofBusiness(id, newData);
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

export const batchDeleteTypeofBusiness = createAsyncThunk(
  "typeofbusiness/batchDelete",
  async (ids, thunkAPI) => {
    try {
      return await typeofbusinessService.batchDeleteTypeofBusiness(ids);
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

export const typeofbusinessSlice = createSlice({
  name: "typeofBusinesses",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTypeofBusiness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTypeofBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.typeofBusinesses.push(action.payload);
      })
      .addCase(createTypeofBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTypeofBusinesses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTypeofBusinesses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.typeofBusinesses = action.payload.data;
      })
      .addCase(getTypeofBusinesses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTypeofBusiness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTypeofBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.typeofBusinesses = state.typeofBusinesses.filter(
          (typeofbusiness) => typeofbusiness._id !== action.payload.id
        );
      })
      .addCase(deleteTypeofBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTypeofBusiness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTypeofBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.typeofBusinesses = action.payload.data;
      })
      .addCase(updateTypeofBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = typeofbusinessSlice.actions;
export default typeofbusinessSlice.reducer;
