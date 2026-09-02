import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountCodeService from "./accountCodeService";
// import Cookies from "js-cookie";
const initialState = {
  accountCodes: [],
  bankAccountCodes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Account Code
export const createAccountCode = createAsyncThunk(
  "account-code/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await accountCodeService.createAccountCode(data, token);
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

// Get Account Code
export const getAccountCodes = createAsyncThunk(
  "account-codes",
  async ({params}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await accountCodeService.getAccountCodes(params,token);
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

// Get Bank Account Code
export const getBankAccountCodes = createAsyncThunk(
  "bank-account-codes",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await accountCodeService.getBankAccountCodes(token);
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

// Delete bank
export const deleteAccountCode = createAsyncThunk(
  "account-code/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await accountCodeService.deleteAccountCode(id, token);
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

export const updateAccountCode = createAsyncThunk(
  "account-code/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await accountCodeService.updateAccountCode(id, data, token);
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

export const AccountCodeSlice = createSlice({
  name: "accountCodes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccountCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountCodes.push(action.payload);
      })
      .addCase(createAccountCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAccountCodes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccountCodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountCodes = action.payload.data;
      })
      .addCase(getAccountCodes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBankAccountCodes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBankAccountCodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bankAccountCodes = action.payload.data;
      })
      .addCase(getBankAccountCodes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAccountCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccountCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountCodes = state.accountCodes.filter(
          (bank) => bank._id !== action.payload.id
        );
      })
      .addCase(deleteAccountCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAccountCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAccountCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountCodes = action.payload.data;
        // state.departments = state.departments.filter(
        //   (department) => department._id !== action.payload.id
        // )
      })
      .addCase(updateAccountCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = AccountCodeSlice.actions;
export default AccountCodeSlice.reducer;
