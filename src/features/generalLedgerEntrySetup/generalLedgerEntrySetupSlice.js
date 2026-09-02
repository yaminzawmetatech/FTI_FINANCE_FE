import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import generalLedgerEntrySetupService from './generalLedgerEntrySetupService'
import { get } from 'lodash'

const initialState = {
  generalLedgerEntrySetups: [],
  getGeneralRepaymentAmountTypes: [],
  getGeneralRepaymentDateTypes: [],
  accountTypes: [],
  amountTypes: [],
  transactionTypes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  values: []
}

// Get Data
export const getGeneralLedgerEntrySetup = createAsyncThunk(
    'generalledgerentrysetup',
    async (_, thunkAPI) => {
      try {
        return await generalLedgerEntrySetupService.getGeneralLedgerEntrySetup()
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Get Data
export const getRepaymentAmountTypes = createAsyncThunk(
  'genealRepaymentAmountTypes',
  async (_, thunkAPI) => {
    try {
      return await generalLedgerEntrySetupService.getGeneralRepaymentAmountTypes()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getRepaymentDateTypes = createAsyncThunk(
  'genealRepaymentDateTypes',
  async (_, thunkAPI) => {
    try {
      return await generalLedgerEntrySetupService.getGeneralRepaymentDateTypes()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


// Get Data
export const getAccountTypes = createAsyncThunk(
  'genealAccountTypes',
  async (_, thunkAPI) => {
    try {
      return await generalLedgerEntrySetupService.getGeneralAccountTypes()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAmountTypes = createAsyncThunk(
  'genealAmountTypes',
  async (_, thunkAPI) => {
    try {
      return await generalLedgerEntrySetupService.getGeneralAmountTypes()
    }
    catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getTransactionTypes = createAsyncThunk(
  'genealTransactionTypes',
  async (_, thunkAPI) => {
    try {
      return await generalLedgerEntrySetupService.getGeneralTransactionTypes()
    }
    catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Create New
export const createGeneralLedgerEntrySetup = createAsyncThunk(
  'generalledgerentrysetup/create',
  async (data, thunkAPI) => {
    try {
      return await generalLedgerEntrySetupService.createGeneralLedgerEntrySetup(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// update 
export const updateGeneralLedgerEntrySetup = createAsyncThunk(
    'generalledgerentrysetup/update',
    async ({ uuid, body }, thunkAPI) => {
      try {
        return await generalLedgerEntrySetupService.updateGeneralLedgerEntrySetup(uuid, body)
      } catch (error) {
        console.log(error)
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Delete 
export const deleteGeneralLedgerEntrySetup = createAsyncThunk(
  'generalledgerentrysetup/delete',
  async (id, thunkAPI) => {
    try {
      return await generalLedgerEntrySetupService.deleteGeneralLedgerEntrySetup(id)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getGeneralLedgerEntrySetupByUuid = createAsyncThunk(
  'generalledgerentrysetup/getGeneralLedgerEntrySetupByUUid',
  async ({ uuid }, thunkAPI) => {
    try {
      return await generalLedgerEntrySetupService.getGeneralLedgerEntrySetupByUuid(uuid)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const generalLedgerEntrySetupSlice = createSlice({
  name: 'generalLedgerEntrySetups',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGeneralLedgerEntrySetup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGeneralLedgerEntrySetup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.generalLedgerEntrySetups = action.payload.data
      })
      .addCase(createGeneralLedgerEntrySetup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGeneralLedgerEntrySetup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGeneralLedgerEntrySetup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.generalLedgerEntrySetups = action.payload.data
      })
      .addCase(getGeneralLedgerEntrySetup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRepaymentAmountTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRepaymentAmountTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.getGeneralRepaymentAmountTypes = action.payload.data
      })
      .addCase(getRepaymentAmountTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAccountTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAccountTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.accountTypes = action.payload.data
      })
      .addCase(getAccountTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGeneralLedgerEntrySetup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGeneralLedgerEntrySetup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.generalLedgerEntrySetups = state.generalLedgerEntrySetups.filter(
          (approvalWorkflow) => approvalWorkflow._id !== action.payload.id
        )
      })
      .addCase(deleteGeneralLedgerEntrySetup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateGeneralLedgerEntrySetup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGeneralLedgerEntrySetup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.generalLedgerEntrySetups = action.payload.data
      })
      .addCase(updateGeneralLedgerEntrySetup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGeneralLedgerEntrySetupByUuid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGeneralLedgerEntrySetupByUuid.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.generalLedgerEntrySetups = action.payload.data
      })
      .addCase(getGeneralLedgerEntrySetupByUuid.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAmountTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAmountTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.amountTypes = action.payload.data
      })
      .addCase(getAmountTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTransactionTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTransactionTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.transactionTypes = action.payload.data
      })
      .addCase(getTransactionTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRepaymentDateTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRepaymentDateTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.getGeneralRepaymentDateTypes = action.payload.data
      })
      .addCase(getRepaymentDateTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = generalLedgerEntrySetupSlice.actions
export default generalLedgerEntrySetupSlice.reducer
