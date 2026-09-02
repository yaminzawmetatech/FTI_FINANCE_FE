import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import penaltyLogService from './penaltyLogService'

const initialState = {
    penaltyLogs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    log:[]
}

export const getAllPenaltyLogs = createAsyncThunk(
    "penaltyLogs",
    async ({params, url, firstFetch = true}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.access_token;
            const response = await penaltyLogService.getAllPenaltyLogs(params, token);

            const {
                metadata: {info},
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

export const readPenaltyLog = createAsyncThunk(
    "readPenaltyLog",
    async ({file_name}, thunkAPI) => {
        try {
            return await penaltyLogService.readPenaltyLog(file_name);
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

export const calculatePenalties = createAsyncThunk(
    "penalty/calculate",
    async (body, thunkAPI) => {
      try {
        return penaltyLogService.calculatePenalties(body);
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

export const penaltyLogSlice = createSlice({
    name: 'penaltyLogs',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPenaltyLogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllPenaltyLogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.penaltyLogs = action.payload.data
            })
            .addCase(getAllPenaltyLogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(readPenaltyLog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(readPenaltyLog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.log = action.payload.data;
            })
            .addCase(readPenaltyLog.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(calculatePenalties.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(calculatePenalties.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.log = action.payload.data;
            })
            .addCase(calculatePenalties.rejected, (state, action) => {
                state.isLoading = false;
            })
    },
})

export const {reset} = penaltyLogSlice.actions
export default penaltyLogSlice.reducer
