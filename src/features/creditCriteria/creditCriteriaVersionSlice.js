import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import creditCriteriaService from './creditCriteriaService'
import { uniqBy } from "lodash";

const initialState = {
  creditCriteriaVersions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const getCreditCriteriaVersions = createAsyncThunk(
  "creditCriteria/version",
  async ({id}, thunkAPI) => {
    try {
      return await creditCriteriaService.getCreditCriteriaVersions(id);
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


export const creditCriteriaVersionSlice = createSlice({
  name: 'creditCriteriaKeys',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCreditCriteriaVersions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCreditCriteriaVersions.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.creditCriteriaVersions = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getCreditCriteriaVersions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
})

export const { reset } = creditCriteriaVersionSlice.actions
export default creditCriteriaVersionSlice.reducer
