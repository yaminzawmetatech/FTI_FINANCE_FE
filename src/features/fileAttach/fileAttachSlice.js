import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fileAttachService from "./fileAttachService";

const initialState = {
  fileAttaches: [],
  isLoading: false,
  next_page_url: null,
  createFileAttach: {
    isSubmitting: false,
  },
  documentType: {
    data: [],
    isLoading: false,
  },
};

export const getFileAttaches = createAsyncThunk(
  "fileAttaches/getFileAttaches",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await fileAttachService.getFileAttachesApi(params, url);
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

export const createFileAttach = createAsyncThunk(
  "fileAttaches/createFileAttach",
  async ({ body }, thunkAPI) => {
    try {
      return await fileAttachService.createFileAttachApi(body);
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

export const getDocumentTypes = createAsyncThunk(
  "fileAttaches/getDocumentTypes",
  async ({ params = null, table_name }, thunkAPI) => {
    try {
      return await fileAttachService.getDocumentTypesApi(table_name, params);
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

export const deleteFileAttach = createAsyncThunk(
  "fileAttaches/deleteFileAttach",
  async ({ id }, thunkAPI) => {
    try {
      return await fileAttachService.deleteFileAttachApi(id);
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

export const getCustomerApplicationAttachment = createAsyncThunk(
  "fileAttaches/getCustomerApplicationAttachment",
  async (id, thunkAPI) => {
    try {
      return await fileAttachService.getCustomerApplicationAttachment(id);
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

export const fileAttachSlice = createSlice({
  name: "fileAttaches",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFileAttaches.pending, (state) => {
        state.isLoading = true;
        state.next_page_url = null;
      })
      .addCase(getFileAttaches.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data } = action.payload;
        if (firstFetch) {
          state.fileAttaches = data.data;
        } else {
          state.fileAttaches = state.fileAttaches.concat(data.data);
        }
        state.next_page_url = data.next_page_url;
        state.isLoading = false;
      })
      .addCase(getFileAttaches.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createFileAttach.pending, (state) => {
        state.createFileAttach.isSubmitting = true;
      })
      .addCase(createFileAttach.fulfilled, (state, action) => {
        state.createFileAttach.isSubmitting = false;
        // state.fileAttaches.unshift(action.payload.data);
      })
      .addCase(createFileAttach.rejected, (state, action) => {
        state.createFileAttach.isSubmitting = false;
      })
      .addCase(getDocumentTypes.pending, (state) => {
        state.documentType.isLoading = true;
      })
      .addCase(getDocumentTypes.fulfilled, (state, action) => {
        state.documentType.isLoading = false;
        state.documentType.data = action.payload.data;
      })
      .addCase(getDocumentTypes.rejected, (state, action) => {
        state.documentType.isLoading = false;
      })

      .addCase(deleteFileAttach.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFileAttach.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteFileAttach.rejected, (state, action) => {
        state.isLoading = false;
      })
      // 🔹 Get Customer Application Attachment
      .addCase(getCustomerApplicationAttachment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerApplicationAttachment.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming the response contains `data` field similar to other APIs
        state.documentType.data = action.payload.data;
      })
      .addCase(getCustomerApplicationAttachment.rejected, (state) => {
        state.isLoading = false;
      });

    ;
  },
});

export const { reset } = fileAttachSlice.actions;
export default fileAttachSlice.reducer;
