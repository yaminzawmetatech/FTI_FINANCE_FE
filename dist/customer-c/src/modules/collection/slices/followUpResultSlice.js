import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import followUpResultService from "../services/followUpResultService";

const initialState = {
  followUpResults: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createFollowUpResult = createAsyncThunk(
  "followUpResults/create",
  async (addressWardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await followUpResultService.createFollowUpResult(addressWardData, token);
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

export const getFollowUpResults = createAsyncThunk(
  "followUpResults",
  async (params = null, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await followUpResultService.getFollowUpResults(token, params);
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

export const deleteFollowUpResult = createAsyncThunk(
  "followUpResults/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await followUpResultService.deleteFollowUpResult(id, token);
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


export const updateFollowUpResult = createAsyncThunk(
  "followUpResults/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await followUpResultService.updateFollowUpResult(id, newData, token);
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

export const followUpResultSlice = createSlice({
  name: "followUpResults",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFollowUpResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFollowUpResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.followUpResults.push(action.payload);
      })
      .addCase(createFollowUpResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFollowUpResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowUpResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.followUpResults = action.payload.data;
      })
      .addCase(getFollowUpResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFollowUpResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFollowUpResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.followUpResults = state.followUpResults.filter(
          (followUpResults) => followUpResults._id !== action.payload.id
        );
      })
      .addCase(deleteFollowUpResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateFollowUpResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFollowUpResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.followUpResults = action.payload.data;
      })
      .addCase(updateFollowUpResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = followUpResultSlice.actions;
export default followUpResultSlice.reducer;
