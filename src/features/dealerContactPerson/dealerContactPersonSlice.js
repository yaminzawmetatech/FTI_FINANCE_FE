import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dealerContactPersonService from "./dealerContactPersonService";
import { uniqBy } from "lodash";

const initialState = {
  dealerContactPeople: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createDealerContactPerson = createAsyncThunk(
  "dealerdealerContactPerson/create",
  async (data, thunkAPI) => {
    try {
      return await dealerContactPersonService.createDealerContactPerson(data);
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

export const getAllDealerContactPeople = createAsyncThunk(
  "dealerContactPeople/all", 
  async (_, thunkAPI) => {
  try {
    return await dealerContactPersonService.getDealerContactPeople();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDealerContactPeople = createAsyncThunk(
  "dealerContactPeople",
  async ({ params, url, firstFetch = true, allFlag = false }, thunkAPI) => {
    try {
    
      if(!allFlag){
        const response = await dealerContactPersonService.getDealerContactPeople(params);
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
        const response = await dealerContactPersonService.getDealerContactPeople(params, allFlag);
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

export const getDealerContactPeopleByStatus = createAsyncThunk(
  "dealerContactPeopleByStatus", 
  async ({status}, thunkAPI) => {
  try {
    return await dealerContactPersonService.getDealerContactPeopleByStatus(status);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteDealerContactPerson = createAsyncThunk(
  "dealerdealerContactPerson/delete",
  async (id, thunkAPI) => {
    try {
      return await dealerContactPersonService.deleteDealerContactPerson(id);
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

export const updateDealerContactPerson = createAsyncThunk(
  "dealerdealerContactPerson/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await dealerContactPersonService.updateDealerContactPerson(id, newData);
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

export const dealerContactPersonSlice = createSlice({
  name: "dealerContactPeople",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDealerContactPerson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDealerContactPerson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerContactPeople.push(action.payload);
      })
      .addCase(createDealerContactPerson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDealerContactPeopleByStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerContactPeopleByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerContactPeople = action.payload.data;
      })
      .addCase(getDealerContactPeopleByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllDealerContactPeople.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealerContactPeople.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getDealerContactPeople.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param, allFlag } = action.payload;
        if(allFlag){
          state.dealerContactPeople = data;
        }
        else if (firstFetch) {
          state.dealerContactPeople = data;
        } else {
          state.dealerContactPeople = uniqBy(state.dealerContactPeople.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getDealerContactPeople.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getAllDealerContactPeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerContactPeople = action.payload.data;
      })
      .addCase(getAllDealerContactPeople.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDealerContactPerson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDealerContactPerson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteDealerContactPerson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDealerContactPerson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDealerContactPerson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealerContactPeople = state.dealerContactPeople.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateDealerContactPerson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dealerContactPersonSlice.actions;
export default dealerContactPersonSlice.reducer;
