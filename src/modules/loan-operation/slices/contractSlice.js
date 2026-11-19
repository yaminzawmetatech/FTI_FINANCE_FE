import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contractService from "../services/contractService";
import { uniqBy } from "lodash";

const initialState = {
  contracts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
  updateContractByUuid: {
    isLoading: false,
  },
  generateGLContract: {
    isLoading: false,
  },
  exceedPayments: [],
  exceedBankStatement: [],
  updateAPLByUuid: {
    isLoading: false,
  },
};

export const createContracts = createAsyncThunk(
  "contracts/create",
  async (data, thunkAPI) => {
    try {
      return await contractService.createContracts(data);
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

export const getContracts = createAsyncThunk(
  "contracts",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await contractService.getContracts(params);

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

export const getContractList = createAsyncThunk(
  "contract-list",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await contractService.getContractList(params);

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


export const deleteContracts = createAsyncThunk(
  "contracts/delete",
  async (id, thunkAPI) => {
    try {
      return await contractService.deleteContracts(id);
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

export const updateContractByUuid = createAsyncThunk(
  "contracts/update",

  async ({ id, newData }, thunkAPI) => {
    try {
      return await contractService.updateContractByUuid(id, newData);
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

export const updateContractByUuidAdmin = createAsyncThunk(
  "contracts/admin-update",

  async ({ id, body }, thunkAPI) => {
    try {
      return await contractService.updateContractByUuidAdmin(id, body);
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

export const generatedGLContractByContractIds = createAsyncThunk(
  "contracts/generateGL",

  async ({ params }, thunkAPI) => {
    try {
      return await contractService.generatedGLContractByContractIds(params);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateContractDisbursement = createAsyncThunk(
  "contracts/updateContractDisbursement",

  async (data, thunkAPI) => {
    try {
      return await contractService.updateContractDisbursement(data);
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

export const getExceedPayments = createAsyncThunk(
  "exceedPayment",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await contractService.getExceedPayments(params);

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

export const refundPayments = createAsyncThunk(
  "contracts/refundPayments",
  async (data, thunkAPI) => {
    try {
      return await contractService.refundPayments(data);
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

export const getExceedBankStatement = createAsyncThunk(
  "getExceedBankStatement",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await contractService.getExceedBankStatement(
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

export const updateAPLByUuid = createAsyncThunk(
  "apl/update",

  async ({ uuid, data }, thunkAPI) => {
    try {
      return await contractService.updateAPLByUuid(uuid, data);
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

export const contractSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContracts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContracts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contracts.push(action.payload);
      })
      .addCase(createContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContracts.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getContracts.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.contracts = data;
        } else {
          state.contracts = uniqBy(state.contracts.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getContractList.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getContractList.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.contracts = data;
        } else {
          state.contracts = uniqBy(state.contracts.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getContractList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteContracts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContracts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contracts = state.contracts.filter(
          (subcategory) => subcategory._id !== action.payload.id
        );
      })
      .addCase(deleteContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateContractByUuid.pending, (state) => {
        state.updateContractByUuid.isLoading = true;
      })
      .addCase(updateContractByUuid.fulfilled, (state, action) => {
        state.updateContractByUuid.isLoading = false;
      })
      .addCase(updateContractByUuid.rejected, (state, action) => {
        state.updateContractByUuid.isLoading = false;
      })
      .addCase(updateContractByUuidAdmin.pending, (state) => {
        state.updateContractByUuid.isLoading = true;
      })
      .addCase(updateContractByUuidAdmin.fulfilled, (state, action) => {
        state.updateContractByUuid.isLoading = false;
      })
      .addCase(updateContractByUuidAdmin.rejected, (state, action) => {
        state.updateContractByUuid.isLoading = false;
      })
      .addCase(generatedGLContractByContractIds.pending, (state) => {
        state.generateGLContract.isLoading = true;
      })
      .addCase(generatedGLContractByContractIds.fulfilled, (state, action) => {
        state.generateGLContract.isLoading = false;
        state.generateGLContract = action.payload;
      })
      .addCase(generatedGLContractByContractIds.rejected, (state, action) => {
        state.generateGLContract.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateContractDisbursement.pending, (state) => {
        state.updateContractByUuid.isLoading = true;
      })
      .addCase(updateContractDisbursement.fulfilled, (state, action) => {
        state.updateContractByUuid.isLoading = false;
        const updatedContract = action.payload;
        const index = state.contracts.findIndex(
          (contract) => contract.id === updatedContract.id
        );
        if (index !== -1) {
          state.contracts[index] = updatedContract;
        }
      })
      .addCase(updateContractDisbursement.rejected, (state, action) => {
        state.updateContractByUuid.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getExceedPayments.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getExceedPayments.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.exceedPayments = data;
        } else {
          state.exceedPayments = uniqBy(state.exceedPayments.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getExceedPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(refundPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refundPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exceedPayments.push(action.payload);
      })
      .addCase(refundPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExceedBankStatement.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getExceedBankStatement.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.exceedBankStatement = data;
        } else {
          state.exceedBankStatement = uniqBy(
            state.exceedBankStatement.concat(data),
            "id"
          );
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getExceedBankStatement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(updateAPLByUuid.pending, (state) => {
        state.updateAPLByUuid.isLoading = true;
      })
      .addCase(updateAPLByUuid.fulfilled, (state, action) => {
        state.updateAPLByUuid.isLoading = false;
      })
      .addCase(updateAPLByUuid.rejected, (state, action) => {
        state.updateAPLByUuid.isLoading = false;
      })
  },
});

export const { reset } = contractSlice.actions;
export default contractSlice.reducer;
