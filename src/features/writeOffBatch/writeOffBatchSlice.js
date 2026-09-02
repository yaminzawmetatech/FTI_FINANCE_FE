import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import writeOffBatchService from "./writeOffBatchService";
import { uniqBy } from "lodash";

const initialState = {
  writeOffBatchs: [],
  writeOffs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createWriteOffBatch = createAsyncThunk(
  "writeOffBatch/createWriteOffBatch",
  async ({ body }, thunkAPI) => {
    try {
      return await writeOffBatchService.createWriteOffBatch(body);
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

export const updateWriteOffBatch = createAsyncThunk(
  "writeOffBatch/updateWriteOffBatch",
  async ({ body, uuid }, thunkAPI) => {
    try {
      return await writeOffBatchService.updateWriteOffBatch(body, uuid);
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

export const removeWriteOffContract = createAsyncThunk(
  "writeOffContract/remove",
  async ({ writeOffUuid, contractUuid }, thunkAPI) => {
    try {
      return await writeOffBatchService.removeWriteOffContract(writeOffUuid, contractUuid);
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


export const updateWriteOffAmounts = createAsyncThunk(
  "writeOffBatch/updateWriteOffAmounts",
  async ({ prepareData, uuid }, thunkAPI) => {
    try {
      return await writeOffBatchService.updateWriteOffAmounts(prepareData, uuid);
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

export const changeStatusWriteOffBatch = createAsyncThunk(
  "writeOffBatch/changeStatusWriteOffBatch",
  async ({ status, uuid }, thunkAPI) => {
    try {
      return await writeOffBatchService.changeStatusWriteOffBatch(
        status,
        uuid
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

export const getAllWriteOffBatchs = createAsyncThunk(
  "writeOffBatch/getAllWriteOffBatchs",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await writeOffBatchService.getAllWriteOffBatchs(
        params,
        url
      );

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

export const getWriteOffBatchByUuid = createAsyncThunk(
  "writeOffBatch/getWriteOffBatchByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await writeOffBatchService.getWriteOffBatchByUuid(uuid);
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

// Post Insurance Payment
export const postWriteOff = createAsyncThunk(
  "writeOffBatch/postWriteOff",
  async ({ uuid }, thunkAPI) => {
    try {
      return await writeOffBatchService.postWriteOff(uuid);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const writeOffBatchSlice = createSlice({
  name: "writeOffBatchs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWriteOffBatchs.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllWriteOffBatchs.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.writeOffBatchs = data;
        } else {
          state.writeOffBatchs = uniqBy(
            state.writeOffBatchs.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllWriteOffBatchs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(createWriteOffBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWriteOffBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createWriteOffBatch.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getWriteOffBatchByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWriteOffBatchByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffBatchs = action.payload.data;
      })
      .addCase(getWriteOffBatchByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeStatusWriteOffBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusWriteOffBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffBatchs = action.payload.data;
      })
      .addCase(changeStatusWriteOffBatch.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateWriteOffBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWriteOffBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffBatchs = action.payload.data;
      })
      .addCase(updateWriteOffBatch.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeWriteOffContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeWriteOffContract.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffBatchs = action.payload.data;
      })
      .addCase(removeWriteOffContract.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateWriteOffAmounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWriteOffAmounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffBatchs = action.payload.data;
      })
      .addCase(updateWriteOffAmounts.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(postWriteOff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postWriteOff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeOffBatchs = action.payload.data;
      })
      .addCase(postWriteOff.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = writeOffBatchSlice.actions;
export default writeOffBatchSlice.reducer;
