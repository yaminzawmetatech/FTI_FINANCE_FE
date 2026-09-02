import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import surveyResultService from "./surveyResultService";

const initialState = {
  serverResult: [],
  isLoading: false,
  surveyHeader: {
    data: [],
    isLoading: false,
  },
  surveyQuestionAnswer: {
    data: [],
    isLoading: false,
  },
};

export const getSurveyQuestionAnswer = createAsyncThunk(
  "surveyResult/getSurveyQuestionAnswer",
  async ({ survey_header_id, application_id, guarantorId }, thunkAPI) => {
    try {
      return await surveyResultService.getSurveyQuestionAnswerApi({
        survey_header_id,
        application_id,
        guarantorId
      });
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

export const getSurveyHeader = createAsyncThunk(
  "surveyResult/getSurveyHeader",
  async ({ category_id, survey_type }, thunkAPI) => {
    try {
      return await surveyResultService.getSurveyHeaderApi({
        category_id,
        survey_type,
      });
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

export const createSurveyResult = createAsyncThunk(
  "surveyResult/createSurveyResult",
  async ({ body }, thunkAPI) => {
    try {
      return await surveyResultService.createSurveyResultApi(body);
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

export const getSurveyResult = createAsyncThunk(
  "surveyResult/getSurveyResult",
  async (_, thunkAPI) => {
    try {
      return await surveyResultService.getSurveyResultApi();
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

export const updateSurveyResultByUuid = createAsyncThunk(
  "surveyResult/updateSurveyResultByUuid",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await surveyResultService.updateSurveyResultApi(uuid, body);
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

export const updateSurveyResultInvestigationStatusByUuid = createAsyncThunk(
  "surveyResult/updateSurveyResultInvestigationStatusByUuid",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await surveyResultService.updateSurveyResultInvestigationStatusApi(
        uuid,
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

// Get Survey Counts
export const getInHouseSurveyCount = createAsyncThunk(
  "InHouseSurvey",
  async ({ params, url }, thunkAPI) => {
    try {
      return await surveyResultService.getSurveyStatusCount(params, url);
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

// Get Survey Counts
export const getFieldSurveyCount = createAsyncThunk(
  "FieldSurveyCount",
  async ({ params, url }, thunkAPI) => {
    try {
      return await surveyResultService.getSurveyStatusCount(params, url);
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


export const surveyResultSlice = createSlice({
  name: "surveyResult",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSurveyQuestionAnswer.pending, (state) => {
        state.surveyQuestionAnswer.isLoading = true;
        state.surveyQuestionAnswer.data = [];
      })
      .addCase(getSurveyQuestionAnswer.fulfilled, (state, action) => {
        state.surveyQuestionAnswer.isLoading = false;
        state.surveyQuestionAnswer.data = action.payload.data;
      })
      .addCase(getSurveyQuestionAnswer.rejected, (state, action) => {
        state.surveyQuestionAnswer.isLoading = false;
      })
      .addCase(getSurveyHeader.pending, (state) => {
        state.surveyHeader.isLoading = true;
      })
      .addCase(getSurveyHeader.fulfilled, (state, action) => {
        state.surveyHeader.data = action.payload.data;
        state.surveyHeader.isLoading = false;
      })
      .addCase(getSurveyHeader.rejected, (state, action) => {
        state.surveyHeader.isLoading = false;
      })
      .addCase(updateSurveyResultInvestigationStatusByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateSurveyResultInvestigationStatusByUuid.fulfilled,
        (state, action) => {
          state.surveyResult = action.payload.data;
          state.isLoading = false;
        }
      )
      .addCase(
        updateSurveyResultInvestigationStatusByUuid.rejected,
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addCase(updateSurveyResultByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSurveyResultByUuid.fulfilled, (state, action) => {
        state.surveyResult = action.payload.data;
        state.isLoading = false;
      })
      .addCase(updateSurveyResultByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createSurveyResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSurveyResult.fulfilled, (state, action) => {
        state.surveyResult = action.payload.data;
        state.isLoading = false;
      })
      .addCase(createSurveyResult.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getSurveyResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSurveyResult.fulfilled, (state, action) => {
        state.surveyResult = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getSurveyResult.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getInHouseSurveyCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInHouseSurveyCount.fulfilled, (state, action) => {
        state.inHouseSurveyCount = action.payload;
        state.isLoading = false;
      })
      .addCase(getInHouseSurveyCount.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getFieldSurveyCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFieldSurveyCount.fulfilled, (state, action) => {
        state.fieldSurveyCount = action.payload;
        state.isLoading = false;
      })
      .addCase(getFieldSurveyCount.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {reset} = surveyResultSlice.actions;
export default surveyResultSlice.reducer;