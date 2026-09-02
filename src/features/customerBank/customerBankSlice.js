import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerBankService from './customerBankService'
import { uniqBy } from 'lodash'

const initialState = {
  customerBanks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new customer bank
export const createCustomerBank = createAsyncThunk(
  'customerBanks/create',
  async (bankData, thunkAPI) => {
    try {
      return await customerBankService.createCustomerBank(bankData)
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// // Get all customer banks
// export const getCustomerBanks = createAsyncThunk(
//   'customerBanks',
//   async (_, thunkAPI) => {
//     try {
//       return await customerBankService.getCustomerBanks()
//     } catch (error) {
//       const message =
//         (error.response?.data?.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const getCustomerBanks = createAsyncThunk(
  "customerBanks",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await customerBankService.getCustomerBanks(params, url);

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

// Delete customer bank
export const deleteCustomerBank = createAsyncThunk(
  'customerBanks/delete',
  async (id, thunkAPI) => {
    try {
      return await customerBankService.deleteCustomerBank(id)
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update customer bank
export const updateCustomerBank = createAsyncThunk(
  'customerBanks/update',
  async ({ id, newData }, thunkAPI) => {
    try {
      return await customerBankService.updateCustomerBank(id, newData)
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const customerBankSlice = createSlice({
  name: 'customerBank',
  initialState,
  reducers: {
    resetCustomerBank: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCustomerBank.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCustomerBank.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.customerBanks.push(action.payload)
      })
      .addCase(createCustomerBank.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getCustomerBanks.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getCustomerBanks.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.customerBanks = data;
        } else {
          state.customerBanks = uniqBy(state.customerBanks.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getCustomerBanks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })

      // Delete
      .addCase(deleteCustomerBank.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCustomerBank.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.customerBanks = state.customerBanks.filter(
          (bank) => bank.id !== action.payload.id
        )
      })
      .addCase(deleteCustomerBank.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // Update
      .addCase(updateCustomerBank.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCustomerBank.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.customerBanks = state.customerBanks.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateCustomerBank.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetCustomerBank } = customerBankSlice.actions
export default customerBankSlice.reducer
