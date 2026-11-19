import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import creditSchemeService from "../services/creditSchemeService";
import { uniqBy } from "lodash";

const initialState = {
  creditSchemes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getAllCreditSchemes = createAsyncThunk(
  "creditSchemes/getAll",
  async (params, thunkAPI) => {
    try {
      const response = await creditSchemeService.getAllCreditSchemes(params);
      return response.data; // Assuming response.data contains the list of credit schemes
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


export const getCreditSchemes = createAsyncThunk(
  "creditSchemes",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await creditSchemeService.getCreditSchemes(params, url);

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


export const createCreditScheme = createAsyncThunk(
  "creditScheme/create",
  async (body, thunkAPI) => {
    try {
      return await creditSchemeService.createCreditScheme(body);
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


export const updateCreditScheme = createAsyncThunk(
  "creditScheme/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await creditSchemeService.updateCreditScheme(
        id,
        newData
      );
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

export const deleteCreditScheme = createAsyncThunk(
  "creditScheme/delete",
  async (deleteId, thunkAPI) => {
    try {

      return await creditSchemeService.deleteCreditScheme(deleteId);

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

export const creditSchemeSlice = createSlice({
  name: "creditSchemes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCreditSchemes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCreditSchemes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.creditSchemes = action.payload; // Update the state with fetched credit schemes
      })
      .addCase(getAllCreditSchemes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCreditSchemes.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getCreditSchemes.fulfilled, (state, action) => {
        state.isSuccess = true;

        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.creditSchemes = data;
        } else {
          state.creditSchemes = uniqBy(state.creditSchemes.concat(data), "id");
        }
        state.next_page_param = next_page_param;

        state.isLoading = false;
      })
      .addCase(getCreditSchemes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })

      .addCase(createCreditScheme.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCreditScheme.fulfilled, (state, action) => {
        state.isLoading = false;
        state.creditSchemes.push(action.payload);
        state.isSuccess = true;
      })
      .addCase(createCreditScheme.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateCreditScheme.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCreditScheme.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.creditSchemes = state.creditSchemes.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateCreditScheme.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteCreditScheme.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCreditScheme.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.creditSchemes.push(action.payload);
      })
      .addCase(deleteCreditScheme.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    ;
  }
});


export const { reset } = creditSchemeSlice.actions;
export default creditSchemeSlice.reducer;
