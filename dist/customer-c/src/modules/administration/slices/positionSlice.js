import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import positionService from "../services/positionService";

const initialState = {
  positions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new position
export const createPosition = createAsyncThunk(
  "position/create",
  async (positionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await positionService.createPosition(positionData, token);
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

// Get user position
export const getPosition = createAsyncThunk("position", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access_token;
    return await positionService.getPosition(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user position
export const deletePosition = createAsyncThunk(
  "position/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await positionService.deletePosition(id, token);
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

// export const updatePosition = createAsyncThunk(
//   'position/update',
//   async ({ positionUUID, updatedPositionData }, thunkAPI) => {
//     console.log( updatedPositionData, positionUUID)
//     // try {
//     //   const token = thunkAPI.getState().auth.user.access_token
//     //   return await positionService.updatePosition(positionUUID,updatedPositionData, token)
//     // } catch (error) {
//     //   console.log(error)
//     //   const message =
//     //     (error.response &&
//     //       error.response.data &&
//     //       error.response.data.message) ||
//     //     error.message ||
//     //     error.toString()
//     //   return thunkAPI.rejectWithValue(message)
//     // }
//   }
// )

export const updatePosition = createAsyncThunk(
  "position/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await positionService.updatePosition(id, newData, token);
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

export const batchDeletePosition = createAsyncThunk(
  "position/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await positionService.batchDeletePosition(ids, token);
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

export const positionSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPosition.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.positions.push(action.payload);
      })
      .addCase(createPosition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPosition.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.positions = action.payload.data;
      })
      .addCase(getPosition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePosition.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.positions = state.positions.filter(
          (position) => position._id !== action.payload.id
        );
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePosition.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.positions = action.payload.data;
        // state.position = state.position.filter(
        //   (position) => position._id !== action.payload.id
        // )
      })
      .addCase(updatePosition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = positionSlice.actions;
export default positionSlice.reducer;
