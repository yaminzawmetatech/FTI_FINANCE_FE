import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import InsuranceCompanyService from "../services/insuranceCompanyService";
import { uniqBy } from "lodash";

const initialState = {
  insuranceCompanies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createInsuranceCompany = createAsyncThunk(
  "insuranceCompany/create",
  async (data, thunkAPI) => {
    try {
      return await InsuranceCompanyService.createInsuranceCompany(data);
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


export const getInsuranceCompaines = createAsyncThunk(
  "get/insuranceCompanies",
  async ({ params, url, firstFetch = true, allFlag = false }, thunkAPI) => {
    try {
    
      if(!allFlag){
        const response = await InsuranceCompanyService.getInsuranceCompaines(params);
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
      }else{
        const response = await InsuranceCompanyService.getInsuranceCompaines(params, allFlag);
        return {
          data: response.data,
          firstFetch,
          allFlag,
        };
      }
      
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


export const deleteInsuranceCompany = createAsyncThunk(
  "insuranceCompany/delete",
  async (id, thunkAPI) => {
    try {
      return await InsuranceCompanyService.deleteInsuranceCompany(id);
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

export const updateInsuranceCompany = createAsyncThunk(
  "insuranceCompany/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await InsuranceCompanyService.updateInsuranceCompany(id, newData);
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

export const InsuranceCompanySlice = createSlice({
  name: "insuranceCompanies",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInsuranceCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInsuranceCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insuranceCompanies.push(action.payload);
      })
      .addCase(createInsuranceCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInsuranceCompaines.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getInsuranceCompaines.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param, allFlag } = action.payload;
        if (allFlag) {
          state.insuranceCompanies = data;
        }
        else if (firstFetch) {
          state.insuranceCompanies = data;
        } else {
          state.insuranceCompanies = uniqBy(state.insuranceCompanies.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getInsuranceCompaines.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteInsuranceCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInsuranceCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteInsuranceCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateInsuranceCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInsuranceCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insuranceCompanies = state.insuranceCompanies.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateInsuranceCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = InsuranceCompanySlice.actions;
export default InsuranceCompanySlice.reducer;
