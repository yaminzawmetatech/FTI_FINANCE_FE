import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jointApplicantService from "../services/jointApplicantService";

const initialState = {
  jointApplicants: [],
  isLoading: false,
  next_page_url: null,
  createJointApplicant: {
    isSubmitting: false,
  },
  jointApplicantDetail: {
    jointApplicant: null,
    isLoading: false,
  },
  deleteJointApplicant: {
    isLoading: false,
  },
};

export const getJointApplicant = createAsyncThunk(
  "jointApplicants/getJointApplicant",
  async ({ id }, thunkAPI) => {
    try {
      return await jointApplicantService.getJointApplicantApi(id);
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

export const getAllJointApplicant = createAsyncThunk(
  "jointApplicants/getAllJointApplicant",
  async (_, thunkAPI) => {
    try {
      return await jointApplicantService.getAllJointApplicantApi();
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

export const getJointApplicants = createAsyncThunk(
  "jointApplicants/getJointApplicants",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await jointApplicantService.getJointApplicantsApi(params, url);
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


export const createJointApplicant = createAsyncThunk(
  "jointApplicants/createJointApplicant",
  async ({ body }, thunkAPI) => {
    try {
      return await jointApplicantService.createJointApplicantApi(body);
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

export const updateJointApplicantByUuid = createAsyncThunk(
  "jointApplicants/updateJointApplicantByUuid",
  async ({ id, body }, thunkAPI) => {
    try {
      return await jointApplicantService.updateJointApplicantApi(id, body);
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


export const deleteJointApplicantByUuid = createAsyncThunk(
  "jointApplicants/deleteJointApplicantByUuid",
  async ({ id, applicationId }, thunkAPI) => {
    try {
      await jointApplicantService.deleteJointApplicantApi(id, applicationId);
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
export const jointApplicantslice = createSlice({
  name: "jointApplicants",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJointApplicants.pending, (state) => {
        state.isLoading = true;
        state.next_page_url = null;
      })
      .addCase(getJointApplicants.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data } = action.payload;
        if (firstFetch) {
          state.jointApplicants = data;
        } else {
          state.jointApplicants = state.jointApplicants.concat(data.data);
        }
        state.next_page_url = data.next_page_url;
        state.isLoading = false;
      })
      .addCase(getJointApplicants.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createJointApplicant.pending, (state) => {
        state.createJointApplicant.isSubmitting = true;
      })
      .addCase(createJointApplicant.fulfilled, (state, action) => {
        state.createJointApplicant.isSubmitting = false;
        state.jointApplicants.unshift(action.payload.data);
      })
      .addCase(createJointApplicant.rejected, (state, action) => {
        state.createJointApplicant.isSubmitting = false;
      })
      .addCase(getJointApplicant.pending, (state) => {
        state.jointApplicantDetail.isLoading = true;
      })
      .addCase(getJointApplicant.fulfilled, (state, action) => {
        state.jointApplicantDetail.jointApplicant = action.payload.data;
        state.jointApplicantDetail.isLoading = false;
      })
      .addCase(getJointApplicant.rejected, (state, action) => {
        state.jointApplicantDetail.isLoading = false;
      })
      .addCase(getAllJointApplicant.pending, (state) => {
        state.jointApplicantDetail.isLoading = true;
      })
      .addCase(getAllJointApplicant.fulfilled, (state, action) => {
        state.jointApplicantDetail.jointApplicant = action.payload.data.data;
        state.jointApplicantDetail.isLoading = false;
      })
      .addCase(getAllJointApplicant.rejected, (state, action) => {
        state.jointApplicantDetail.isLoading = false;
      })
      .addCase(updateJointApplicantByUuid.pending, (state) => {
        state.jointApplicantDetail.isLoading = true;
      })
      .addCase(updateJointApplicantByUuid.fulfilled, (state, action) => {
        state.jointApplicantDetail.jointApplicant = action.payload.data;
        state.jointApplicantDetail.isLoading = false;
      })
      .addCase(updateJointApplicantByUuid.rejected, (state, action) => {
        state.jointApplicantDetail.isLoading = false;
      })
      .addCase(deleteJointApplicantByUuid.pending, (state) => {
        state.deleteJointApplicant.isLoading = true;
      })
      .addCase(deleteJointApplicantByUuid.fulfilled, (state, action) => {
        state.jointApplicants = state.jointApplicants.filter(
          (item) => item.id !== action.payload.id
        );
        state.deleteJointApplicant.isLoading = false;
      })
      .addCase(deleteJointApplicantByUuid.rejected, (state, action) => {
        state.deleteJointApplicant.isLoading = false;
      });
  },
});

export const { reset } = jointApplicantslice.actions;
export default jointApplicantslice.reducer;
