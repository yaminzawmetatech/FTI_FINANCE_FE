import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import creditCriteriaService from './creditCriteriaService'
import { uniqBy } from "lodash";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  creditCriteriaTypes: []
}

export const getCreditCriteriaTypes = createAsyncThunk(
  "creditCriteria/types",
  async (_, thunkAPI) => {
    try {
      return await creditCriteriaService.getCreditCriteriaTypes();
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


export const creditCriteriaTypeSlice = createSlice({
  name: 'creditCriteriaType',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCreditCriteriaTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCreditCriteriaTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.creditCriteriaTypes = action.payload.data
      })
      .addCase(getCreditCriteriaTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = creditCriteriaTypeSlice.actions
export default creditCriteriaTypeSlice.reducer
