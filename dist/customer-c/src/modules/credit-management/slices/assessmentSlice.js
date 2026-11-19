import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import assessmentService from "../services/assessmentService";

const initialState = {
  assessments: [],
  isLoading: false,
  next_page_url: null,
  createAssessment: {
    isSubmitting: false,
  },
  assessmentDetail: {
    assessment: null,
    isLoading: false,
  },
  deleteAssessment: {
    isLoading: false,
  },
};

export const getAssessment = createAsyncThunk(
  "assessments/getAssessment",
  async ({ id }, thunkAPI) => {
    try {
      return await assessmentService.getAssessmentApi(id);
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

export const getAllAssessment = createAsyncThunk(
  "assessments/getAllAssessment",
  async (_, thunkAPI) => {
    try {
      return await assessmentService.getAllAssessmentApi();
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

export const getAssessments = createAsyncThunk(
  "assessments/getAssessments",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const response = await assessmentService.getAssessmentsApi(params, url);
      const {
        metadata: { info },
      } = response;

      const remainingPages = Math.ceil(
        ((+info?.total || 0) - (+info?.offset || 0)) / +info?.limit || 10
      );

      const next_page_param =
        remainingPages >= 1
          ? { ...params, offset: (+info?.limit || 10) + (+info?.offset || 0) }
          : null;

      return { info, data: response.data, firstFetch, next_page_param };
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

export const createAssessment = createAsyncThunk(
  "assessments/createAssessment",
  async ({ body }, thunkAPI) => {
    try {
      return await assessmentService.createAssessmentApi(body);
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

export const updateAssessmentByUuid = createAsyncThunk(
  "assessments/updateAssessmentByUuid",
  async ({ id, body }, thunkAPI) => {
    try {
      return await assessmentService.updateAssessmentApi(id, body);
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

export const updateAssessmentStatusByUuid = createAsyncThunk(
  "assessments/updateAssessmentStatusByUuid",
  async ({ id, status, body = null }, thunkAPI) => {
    try {
      return await assessmentService.updateAssessmentStatusApi(
        id,
        status,
        body
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

export const deleteAssessmentByUuid = createAsyncThunk(
  "assessments/deleteAssessmentByUuid",
  async ({ id }, thunkAPI) => {
    try {
      await assessmentService.deleteAssessmentApi(id);
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

export const calculateProrataDisbursement = createAsyncThunk(
  "assessment/calculateProrataDisbursement",
  async ({ id, body }, thunkAPI) => {
    try {
      return await assessmentService.calculateProrataDisbursementApi(id, body);
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

export const assignAssessmentUser = createAsyncThunk(
  "assessment/assign",
  async (data, thunkAPI) => {
    try {
      return await assessmentService.assignAssessmentUser(data);
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

export const assessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssessments.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getAssessments.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.assessments = action.payload.data;
        } else {
          state.assessments = state.assessments.concat(action.payload.data);
        }
        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getAssessments.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createAssessment.pending, (state) => {
        state.createAssessment.isSubmitting = true;
      })
      .addCase(createAssessment.fulfilled, (state, action) => {
        state.createAssessment.isSubmitting = false;
        state.assessments.unshift(action.payload.data);
      })
      .addCase(createAssessment.rejected, (state, action) => {
        state.createAssessment.isSubmitting = false;
      })
      .addCase(getAssessment.pending, (state) => {
        state.assessmentDetail.isLoading = true;
      })
      .addCase(getAssessment.fulfilled, (state, action) => {
        state.assessmentDetail.assessment = action.payload.data;
        state.assessmentDetail.isLoading = false;
      })
      .addCase(getAssessment.rejected, (state, action) => {
        state.assessmentDetail.isLoading = false;
      })
      .addCase(getAllAssessment.pending, (state) => {
        state.assessmentDetail.isLoading = true;
      })
      .addCase(getAllAssessment.fulfilled, (state, action) => {
        state.assessmentDetail.assessment = action.payload.data.data;
        state.assessmentDetail.isLoading = false;
      })
      .addCase(getAllAssessment.rejected, (state, action) => {
        state.assessmentDetail.isLoading = false;
      })
      .addCase(updateAssessmentStatusByUuid.pending, (state) => {
        state.assessmentDetail.isLoading = true;
      })
      .addCase(updateAssessmentStatusByUuid.fulfilled, (state, action) => {
        state.assessmentDetail.assessment = action.payload.data;
        state.assessmentDetail.isLoading = false;
      })
      .addCase(updateAssessmentStatusByUuid.rejected, (state, action) => {
        state.assessmentDetail.isLoading = false;
      })
      .addCase(updateAssessmentByUuid.pending, (state) => {
        state.assessmentDetail.isLoading = true;
      })
      .addCase(updateAssessmentByUuid.fulfilled, (state, action) => {
        state.assessmentDetail.assessment = action.payload.data;
        state.assessmentDetail.isLoading = false;
      })
      .addCase(updateAssessmentByUuid.rejected, (state, action) => {
        state.assessmentDetail.isLoading = false;
      })
      .addCase(deleteAssessmentByUuid.pending, (state) => {
        state.deleteAssessment.isLoading = true;
      })
      .addCase(deleteAssessmentByUuid.fulfilled, (state, action) => {
        state.assessments = state.assessments.filter(
          (item) => item.id !== action.payload.id
        );
        state.deleteAssessment.isLoading = false;
      })
      .addCase(deleteAssessmentByUuid.rejected, (state, action) => {
        state.deleteAssessment.isLoading = false;
      })
      .addCase(calculateProrataDisbursement.pending, (state) => {
        state.assessmentDetail.isLoading = true;
      })
      .addCase(calculateProrataDisbursement.fulfilled, (state, action) => {
        state.assessmentDetail.assessment = action.payload.data;
        state.assessmentDetail.isLoading = false;
      })
      .addCase(calculateProrataDisbursement.rejected, (state, action) => {
        state.assessmentDetail.isLoading = false;
      })
      .addCase(assignAssessmentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignAssessmentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(assignAssessmentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = assessmentSlice.actions;
export default assessmentSlice.reducer;
