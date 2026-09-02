import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SurveyInformationService from "./surveyInformationService";
import { uniqBy } from "lodash";

const initialState = {
  surveyInformation: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const getSurveyInformation = createAsyncThunk(
  "surveyInformation",
  async ({ params, firstFetch = true }, thunkAPI) => {
    try {
      const response = await SurveyInformationService.getSurveyInformation(params);

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
        info : info,
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


export const SurveyInformationSlice = createSlice({
  name: "surveyInformation",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSurveyInformation.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getSurveyInformation.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.surveyInformation = data;
        } else {
          state.surveyInformation = uniqBy(state.surveyInformation.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getSurveyInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      });
  },
});

export const { reset } = SurveyInformationSlice.actions;
export default SurveyInformationSlice.reducer;
