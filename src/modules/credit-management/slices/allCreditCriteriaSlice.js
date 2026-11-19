import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import creditCriteriaService from "../services/creditCriteriaService"
import { uniqBy } from "lodash";

const initialState = {
  allCreditCriteriaHistory: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  next_page_param: null,
}

export const getAllCreditCriteriaHistory = createAsyncThunk(
  'creditCriteria/all',
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await creditCriteriaService.getAllCreditCriteriaHistory(params, url);

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
)


export const allCreditCriteriaSlice = createSlice({
  name: 'allCreditCriteria',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCreditCriteriaHistory.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAllCreditCriteriaHistory.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.allCreditCriteriaHistory = data;
        } else {
          state.allCreditCriteriaHistory = uniqBy(state.allCreditCriteriaHistory.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAllCreditCriteriaHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
  },
})

export const { reset } = allCreditCriteriaSlice.actions
export default allCreditCriteriaSlice.reducer
