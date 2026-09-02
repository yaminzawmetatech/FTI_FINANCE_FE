import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import InsurancePremiumFeeService from "./insurancePremiumFeeService";
import { uniqBy } from "lodash";

const initialState = {
  insurancePremiumFees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createInsurancePremiumFee = createAsyncThunk(
  "insurancePremiumFee/create",
  async (data, thunkAPI) => {
    try {
      return await InsurancePremiumFeeService.createInsurancePremiumFee(data);
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


export const getInsurancePremiumFees = createAsyncThunk(
  "get/insurancePremiumFees",
  async ({ params, url, firstFetch = true, allFlag = false }, thunkAPI) => {
    try {
    
      if(!allFlag){
        const response = await InsurancePremiumFeeService.getInsurancePremiumFees(params);
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
        const response = await InsurancePremiumFeeService.getInsurancePremiumFees(params, allFlag);
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


export const deleteInsurancePremiumFee = createAsyncThunk(
  "insurancePremiumFee/delete",
  async (id, thunkAPI) => {
    try {
      return await InsurancePremiumFeeService.deleteInsurancePremiumFee(id);
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

export const updateInsurancePremiumFee = createAsyncThunk(
  "insurancePremiumFee/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await InsurancePremiumFeeService.updateInsurancePremiumFee(id, newData);
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

export const InsurancePremiumFeeSlice = createSlice({
  name: "insurancePremiumFees",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInsurancePremiumFee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInsurancePremiumFee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insurancePremiumFees.push(action.payload);
      })
      .addCase(createInsurancePremiumFee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInsurancePremiumFees.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getInsurancePremiumFees.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param, allFlag } = action.payload;
        if (allFlag) {
          state.insurancePremiumFees = data;
        } 
        else if (firstFetch) {
          state.insurancePremiumFees = data;
        } else {
          state.insurancePremiumFees = uniqBy(state.insurancePremiumFees.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getInsurancePremiumFees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(deleteInsurancePremiumFee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInsurancePremiumFee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteInsurancePremiumFee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateInsurancePremiumFee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInsurancePremiumFee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.insurancePremiumFees = state.insurancePremiumFees.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateInsurancePremiumFee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = InsurancePremiumFeeSlice.actions;
export default InsurancePremiumFeeSlice.reducer;
