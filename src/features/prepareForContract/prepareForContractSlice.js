import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import prepareForContractsService from "./prepareForContractService";
import { uniqBy } from "lodash";

const initialState = {
  prepareForContracts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  updatePrepareForContractByUuid: {
    isLoading: false,
  },
  generateGLContract : {
    isLoading: false,
  }
};

export const createPrepareForContracts = createAsyncThunk(
  "prepare-for-contracts/create",
  async (data, thunkAPI) => {
    try {
      return await prepareForContractsService.createPrepareForContracts(data);
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

export const updatePrepareForContracts = createAsyncThunk(
  "prepare-for-contracts/update",
  async (data, thunkAPI) => {
    try {
      return await prepareForContractsService.updatePrepareForContracts(data);
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

export const deletePrepareForContract = createAsyncThunk(
  "prepare-for-contracts/delete",
  async (id, thunkAPI) => {
    try {
      return await prepareForContractsService.deletePrepareForContract(id);
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

export const getPrepareForContracts = createAsyncThunk(
  "prepare-for-contracts",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await prepareForContractsService.getPrepareForContracts(params);

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
        info : info,
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

export const updatePrepareForContractByUuid = createAsyncThunk(
  "contracts/update",
  
  async ({ id, newData }, thunkAPI) => {
    try {
      return await prepareForContractsService.updatePrepareForContractByUuid(id, newData);
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

export const getPrepareForContractByUuid = createAsyncThunk(
  "prepare-for-contracts/getPrepareForContractByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await prepareForContractsService.getPrepareForContractByUuid(uuid);
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


export const prepareForContractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPrepareForContracts.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getPrepareForContracts.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.prepareForContracts = data;
        } else {
          state.prepareForContracts = uniqBy(state.prepareForContracts.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getPrepareForContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(updatePrepareForContractByUuid.pending, (state) => {
        state.updatePrepareForContractByUuid.isLoading = true;
      })
      .addCase(updatePrepareForContractByUuid.fulfilled, (state, action) => {
        state.updatePrepareForContractByUuid.isLoading = false;
      })
      .addCase(updatePrepareForContractByUuid.rejected, (state, action) => {
        state.updatePrepareForContractByUuid.isLoading = false;
      })  
      .addCase(getPrepareForContractByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrepareForContractByUuid.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.prepareForContracts = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getPrepareForContractByUuid.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createPrepareForContracts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPrepareForContracts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.prepareForContracts.push(action.payload);
      })
      .addCase(createPrepareForContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePrepareForContracts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePrepareForContracts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.prepareForContracts = action.payload.data;
      })
      .addCase(updatePrepareForContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePrepareForContract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePrepareForContract.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deletePrepareForContract.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      ;
  },
});

export const { reset } = prepareForContractsSlice.actions;
export default prepareForContractsSlice.reducer;
