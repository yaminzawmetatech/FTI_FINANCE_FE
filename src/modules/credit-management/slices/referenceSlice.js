import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import referenceService from "../services/referenceService";

const initialState = {
  references: [],
  isLoading: false,
  next_page_url: null,
  createReferences: {
    isSubmitting: false,
  },
  referenceDetail: {
    reference: null,
    isLoading: false,
  },
  deleteReference: {
    isLoading: false,
  },
};

export const getReference = createAsyncThunk(
  "references/getReference",
  async ({ id }, thunkAPI) => {
    try {
      return await referenceService.getReferenceApi(id);
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

export const getAllReferences = createAsyncThunk(
  "references/getAllReferences",
  async (_, thunkAPI) => {
    try {
      return await referenceService.getAllReferencesApi();
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

export const getReferences = createAsyncThunk(
  "references/getReferences",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await referenceService.getReferencesApi(params, url);
      return {
        data: response.data,
        firstFetch,
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

export const createReferences = createAsyncThunk(
  "references/createReferences",
  async ({ body }, thunkAPI) => {
    try {
      return await referenceService.createReferencesApi(body);
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

export const updateReferenceByUuid = createAsyncThunk(
  "references/updateReferenceByUuid",
  async ({ id, body }, thunkAPI) => {
    try {
      return await referenceService.updateReferenceApi(id, body);
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


export const deleteReferenceByUuid = createAsyncThunk(
  "references/deleteReferenceByUuid",
  async ({ id, applicationId }, thunkAPI) => {
    try {
      await referenceService.deleteReferenceApi(id, applicationId);
      return { id };
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
export const referenceSlice = createSlice({
  name: "references",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReferences.pending, (state) => {
        state.isLoading = true;
        state.next_page_url = null;
      })
      .addCase(getReferences.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data } = action.payload;
        if (firstFetch) {
          state.references = data;
        } else {
          state.references = state.references.concat(data.data);
        }
        state.next_page_url = data.next_page_url;
        state.isLoading = false;
      })
      .addCase(getReferences.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createReferences.pending, (state) => {
        state.createReferences.isSubmitting = true;
      })
      .addCase(createReferences.fulfilled, (state, action) => {
        state.createReferences.isSubmitting = false;
        state.references.unshift(action.payload.data);
      })
      .addCase(createReferences.rejected, (state, action) => {
        state.createReferences.isSubmitting = false;
      })
      .addCase(getReference.pending, (state) => {
        state.referenceDetail.isLoading = true;
      })
      .addCase(getReference.fulfilled, (state, action) => {
        state.referenceDetail.reference = action.payload.data;
        state.referenceDetail.isLoading = false;
      })
      .addCase(getReference.rejected, (state, action) => {
        state.referenceDetail.isLoading = false;
      })
      .addCase(getAllReferences.pending, (state) => {
        state.referenceDetail.isLoading = true;
      })
      .addCase(getAllReferences.fulfilled, (state, action) => {
        state.referenceDetail.reference = action.payload.data.data;
        state.referenceDetail.isLoading = false;
      })
      .addCase(getAllReferences.rejected, (state, action) => {
        state.referenceDetail.isLoading = false;
      })
      .addCase(updateReferenceByUuid.pending, (state) => {
        state.referenceDetail.isLoading = true;
      })
      .addCase(updateReferenceByUuid.fulfilled, (state, action) => {
        state.referenceDetail.guarantor = action.payload.data;
        state.referenceDetail.isLoading = false;
      })
      .addCase(updateReferenceByUuid.rejected, (state, action) => {
        state.referenceDetail.isLoading = false;
      })
      .addCase(deleteReferenceByUuid.pending, (state) => {
        state.deleteReference.isLoading = true;
      })
      .addCase(deleteReferenceByUuid.fulfilled, (state, action) => {
        state.references = state.references.filter(
          (item) => item.id !== action.payload.id
        );
        state.deleteReference.isLoading = false;
      })
      .addCase(deleteReferenceByUuid.rejected, (state, action) => {
        state.deleteReference.isLoading = false;
      });
  },
});

export const { reset } = referenceSlice.actions;
export default referenceSlice.reducer;
