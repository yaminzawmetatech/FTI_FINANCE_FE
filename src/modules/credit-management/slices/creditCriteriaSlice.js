import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import creditCriteriaService from "../services/creditCriteriaService"
import { uniqBy } from "lodash";

const initialState = {
  creditCriteria: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  next_page_param: null,
  creditCriteriaData: [],
  isCreditCriteriaDataError: false,
  isCreditCriteriaDataSuccess: false,
  isCreditCriteriaDataLoading: false,
  creditCriteriaDataMessage: '',
  creditCriteriaParentData: [],
  isCreditCriteriaParentDataError: false,
  isCreditCriteriaParentDataSuccess: false,
  isCreditCriteriaParentDataLoading: false,
  creditCriteriaParentDataMessage: '',
  allCreditCriteria: [],
  latestCreditCriteria: []
}

export const createCreditCriteriaKey = createAsyncThunk(
  'creditCriteria/create/key',
  async (data, thunkAPI) => {
    try {
      return await creditCriteriaService.createCreditCriteriaKey(data)
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

export const createCreditCriteriaValue = createAsyncThunk(
  'creditCriteria/create/value',
  async (data, thunkAPI) => {
    try {
      return await creditCriteriaService.createCreditCriteriaValue(data)
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

export const updateCreditCriteriaValue = createAsyncThunk(
  'creditCriteria/update/value',
  async ({ id,newData }, thunkAPI) => {
    try {
      return await creditCriteriaService.updateCreditCriteriaValue(id, newData)
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

export const deleteCreditCriteriaValue = createAsyncThunk(
  'creditCriteria/delete/value',
  async (id, thunkAPI) => {
    try {
      return await creditCriteriaService.deleteCreditCriteriaValue(id)
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

export const getCreditCriteria = createAsyncThunk(
  'creditCriteria',
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await creditCriteriaService.getCreditCriteria(params, url);

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

export const getAllCreditCriteria = createAsyncThunk(
  "creditCriteria/all",
  async ({category_id,sub_category_id}, thunkAPI) => {
    try {
      return await creditCriteriaService.getAllCreditCriteria(category_id,sub_category_id);
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

export const getLatestCreditCriteria = createAsyncThunk(
  "creditCriteria/latest",
  async ({category_id}, thunkAPI) => {
    try {
      return await creditCriteriaService.getLatestCreditCriteria(category_id);
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

export const deleteCreditCriteria = createAsyncThunk(
  'creditCriteria/delete',
  async (id, thunkAPI) => {
    try {
      return await creditCriteriaService.deleteCreditCriteria(id)
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

export const updateCreditCriteria = createAsyncThunk(
  'creditCriteria/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      return await creditCriteriaService.updateCreditCriteria(id, newData)
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

export const getCreditCriteriaData = createAsyncThunk(
  "creditCriteria/data",
  async ({category_id,sub_category_id,type}, thunkAPI) => {
    try {
      return await creditCriteriaService.getCreditCriteriaData(category_id,sub_category_id,type);
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

export const getCreditCriteriaParent = createAsyncThunk(
  "creditCriteriaParent/data",
  async ({category_id,sub_category_id,type}, thunkAPI) => {
    try {
      return await creditCriteriaService.getCreditCriteriaParent(category_id,sub_category_id,type);
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


export const creditCriteriaSlice = createSlice({
  name: 'creditCriteria',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCreditCriteriaKey.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCreditCriteriaKey.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.creditCriteria.push(action.payload)
      })
      .addCase(createCreditCriteriaKey.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createCreditCriteriaValue.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCreditCriteriaValue.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.creditCriteria.push(action.payload)
      })
      .addCase(createCreditCriteriaValue.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCreditCriteriaValue.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCreditCriteriaValue.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.creditCriteria = action.payload.data
      })
      .addCase(updateCreditCriteriaValue.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCreditCriteriaValue.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCreditCriteriaValue.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.creditCriteria.push(action.payload)
      })
      .addCase(deleteCreditCriteriaValue.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // .addCase(getCreditCriteria.pending, (state) => {
      //   state.isLoading = true
      // })
      // .addCase(getCreditCriteria.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.creditCriteria = action.payload.data
      // })
      // .addCase(getCreditCriteria.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      // })
      .addCase(getCreditCriteria.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getCreditCriteria.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.creditCriteria = data;
        } else {
          state.creditCriteria = uniqBy(state.creditCriteria.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getCreditCriteria.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteCreditCriteria.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCreditCriteria.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.creditCriteria = state.banks.filter(
        //   (bank) => bank._id !== action.payload.id
        // )
      })
      .addCase(deleteCreditCriteria.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCreditCriteria.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCreditCriteria.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.creditCriteria = action.payload.data
        // state.departments = state.departments.filter(
        //   (department) => department._id !== action.payload.id
        // )
      })
      .addCase(updateCreditCriteria.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCreditCriteriaData.pending, (state) => {
        state.isCreditCriteriaDataLoading = true
      })
      .addCase(getCreditCriteriaData.fulfilled, (state, action) => {
        state.isCreditCriteriaDataLoading = false
        state.isCreditCriteriaDataSuccess = true
        state.creditCriteriaData = action.payload.data
      })
      .addCase(getCreditCriteriaData.rejected, (state, action) => {
        state.isCreditCriteriaDataLoading = false
        state.isCreditCriteriaDataError = true
        state.creditCriteriaDataMessage = action.payload
      })
      .addCase(getCreditCriteriaParent.pending, (state) => {
        state.isCreditCriteriaParentDataLoading = true
      })
      .addCase(getCreditCriteriaParent.fulfilled, (state, action) => {
        state.isCreditCriteriaParentDataLoading = false
        state.isCreditCriteriaParentDataSuccess = true
        state.creditCriteriaParentData = action.payload.data
      })
      .addCase(getCreditCriteriaParent.rejected, (state, action) => {
        state.isCreditCriteriaParentDataLoading = false
        state.isCreditCriteriaParentDataError = true
        state.creditCriteriaParentDataMessage = action.payload
      })
      .addCase(getAllCreditCriteria.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCreditCriteria.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allCreditCriteria = action.payload.data
      })
      .addCase(getAllCreditCriteria.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getLatestCreditCriteria.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLatestCreditCriteria.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.latestCreditCriteria = action.payload.data
      })
      .addCase(getLatestCreditCriteria.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = creditCriteriaSlice.actions
export default creditCriteriaSlice.reducer
