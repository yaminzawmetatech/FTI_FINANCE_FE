
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import demandLetterSetupsService from "../services/demandLetterSetupService";

export const getDemandLetterTemplateParameters = createAsyncThunk(
    'demandLetterSetup/getDemandLetterTemplateParameters',
    async (thunkAPI) => {
        try {
            return await demandLetterSetupsService.getDemandLetterTemplateParameters();
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

export const createDemandLetterSetup = createAsyncThunk(
    'demandLetterSetup/createDemandLetterSetup',
    async ({body}, thunkAPI) => {
        try {
            return await demandLetterSetupsService.createDemandLetterSetup(body);
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

export const getDemandLetterSetup = createAsyncThunk(
    'demandLetterSetup/getDemandLetterSetup',
    async (uuid, thunkAPI) => {
        try {
            return await demandLetterSetupsService.getDemandLetterSetup(uuid);
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

export const updateDemandLetterSetupByUuid = createAsyncThunk(
    "assessments/updateDemandLetterSetupByUuid",
    async ({id, body = null}, thunkAPI) => {
        try {
            return await demandLetterSetupsService.updateDemandLetterSetupByUuid(
                id,
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

export const getAllDemandLetterSetups = createAsyncThunk(
    'demandLetterSetup/getAllDemandLetterSetups',
    async (_, thunkAPI) => {
        try {
            return await demandLetterSetupsService.getAllDemandLetterSetups('demand-letter-setups');
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

export const deleteDemandLetterSetups = createAsyncThunk(
    'demandLetterSetup/deleteDemandLetterSetups',
    async ({ uuid }, thunkAPI) => {
        try {
            await demandLetterSetupsService.deleteDemandLetterSetups(uuid);
            return { uuid };
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

const demandLetterSetupsSlice = createSlice({
    name: 'demandLetterSetup',
    initialState: {
        templateParameters: [],
        demandLetterSetups: [],
        isLoading: false,
        isError: false,
        errorMessage: '',
        createDemandLetterSetup: {
            isSubmitting: false,
        },
        demandLetterSetupDetail: {
            demandLetterSetup: null,
            isLoading: false,
        },
        deleteDemandLetterSetups: {
            isLoading: false,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDemandLetterTemplateParameters.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getDemandLetterTemplateParameters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.templateParameters = action.payload.data;
            })
            .addCase(getDemandLetterTemplateParameters.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            .addCase(createDemandLetterSetup.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createDemandLetterSetup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.demandLetterSetups = action.payload;
            })
            .addCase(createDemandLetterSetup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            .addCase(getDemandLetterSetup.pending, (state) => {
                state.demandLetterSetupDetail.isLoading = true;
            })
            .addCase(getDemandLetterSetup.fulfilled, (state, action) => {
                state.demandLetterSetupDetail.demandLetterSetup = action.payload.data;
                state.demandLetterSetupDetail.isLoading = false;
            })
            .addCase(getDemandLetterSetup.rejected, (state, action) => {
                state.demandLetterSetupDetail.isLoading = false;
            })

            .addCase(updateDemandLetterSetupByUuid.pending, (state) => {
                state.demandLetterSetupDetail.isLoading = true;
            })
            .addCase(updateDemandLetterSetupByUuid.fulfilled, (state, action) => {
                state.demandLetterSetupDetail.demandLetterSetup = action.payload.data;
                state.demandLetterSetupDetail.isLoading = false;
            })
            .addCase(updateDemandLetterSetupByUuid.rejected, (state, action) => {
                state.demandLetterSetupDetail.isLoading = false;
            })

            .addCase(getAllDemandLetterSetups.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllDemandLetterSetups.fulfilled, (state, action) => {
                state.demandLetterSetups = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getAllDemandLetterSetups.rejected, (state, action) => {
                state.isLoading = false;
            })
        ;
    },
});

export const { reset } = demandLetterSetupsSlice.actions;
export default demandLetterSetupsSlice.reducer;
