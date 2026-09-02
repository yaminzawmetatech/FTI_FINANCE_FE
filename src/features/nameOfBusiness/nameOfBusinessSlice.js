import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import nameOfBusinessService from './nameOfBusinessService'
import { uniqBy } from 'lodash'

const initialState = {
  nameOfBusinesses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  next_page_param: null,
}

// Create new customer
export const createNameOfBusiness = createAsyncThunk(
  'nameOfBusinesses/create',
  async (data, thunkAPI) => {
    try {
      return await nameOfBusinessService.createNameOfBusiness(data)
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// // Get all 
export const getAllNameOfBusinesses = createAsyncThunk(
  'all/nameOfBusinesses',
  async (_, thunkAPI) => {
    try {
      return await nameOfBusinessService.getAllNameOfBusinesses()
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getNameOfBusinesses = createAsyncThunk(
  "nameOfBusinesses",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await nameOfBusinessService.getNameOfBusinesses(params, url);

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

// Delete 
export const deleteNameOfBusiness = createAsyncThunk(
  'nameOfBusinesses/delete',
  async (id, thunkAPI) => {
    try {
      return await nameOfBusinessService.deleteNameOfBusiness(id)
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update 
export const updateNameOfBusiness = createAsyncThunk(
  'nameOfBusinesses/update',
  async ({ id, newData }, thunkAPI) => {
    try {
      return await nameOfBusinessService.updateNameOfBusiness(id, newData)
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
      .addCase(createNameOfBusiness.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNameOfBusiness.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nameOfBusinesses.push(action.payload)
      })
      .addCase(createNameOfBusiness.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getNameOfBusinesses.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getNameOfBusinesses.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.nameOfBusinesses = data;
        } else {
          state.nameOfBusinesses = uniqBy(state.nameOfBusinesses.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getNameOfBusinesses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })

      // Delete
      .addCase(deleteNameOfBusiness.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNameOfBusiness.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nameOfBusinesses = state.nameOfBusinesses.filter(
          (item) => item.id !== action.payload.id
        )
      })
      .addCase(deleteNameOfBusiness.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // Update
      .addCase(updateNameOfBusiness.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNameOfBusiness.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nameOfBusinesses = state.nameOfBusinesses.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateNameOfBusiness.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllNameOfBusinesses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNameOfBusinesses.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.nameOfBusinesses = action.payload.data;
      })
      .addCase(getAllNameOfBusinesses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
})

export const { resetCustomerBank } = customerBankSlice.actions
export default customerBankSlice.reducer
