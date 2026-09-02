// src/features/contractAggrementSetup/contractAggrementSetupSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import contractAggrementSetupService from './contractAggrementSetupService';

export const getContractTemplateParameters = createAsyncThunk(
    'contractAggrementSetup/getContractTemplateParameters',
    async (thunkAPI) => {
        try {
            return await contractAggrementSetupService.getContractTemplateParameters();
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

export const createContractAggrementSetup = createAsyncThunk(
    'contractAggrementSetup/createContractAggrementSetup',
    async ({body}, thunkAPI) => {
        try {
            return await contractAggrementSetupService.createContractAggrementSetup(body);
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

export const getContractAggrementSetup = createAsyncThunk(
    'contractAggrementSetup/getContractAggrementSetup',
    async (uuid, thunkAPI) => {
        try {
            return await contractAggrementSetupService.getContractAggrementSetup(uuid);
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

export const updateAContractAggrementSetupByUuid = createAsyncThunk(
    "assessments/updateAContractAggrementSetupByUuid",
    async ({id, body = null}, thunkAPI) => {
        try {
            return await contractAggrementSetupService.updateContractAggrementSetup(
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

export const getAllContractAgreements = createAsyncThunk(
    'contractAgreementSetup/getAllContractAgreements',
    async (_, thunkAPI) => {
        try {
            return await contractAggrementSetupService.getContractAggrementSetups('contract-agreement-setups');
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

export const deleteContractAgreementSetup = createAsyncThunk(
    'contractAgreementSetup/deleteContractAgreementSetup',
    async ({ uuid }, thunkAPI) => {
        try {
            await contractAggrementSetupService.deleteContractAgreementSetup(uuid);
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

const contractAggrementSetupSlice = createSlice({
    name: 'contractAggrementSetup',
    initialState: {
        templateParameters: [],
        contractAgreementSetups: [],
        isLoading: false,
        isError: false,
        errorMessage: '',
        createContractAgreementSetup: {
            isSubmitting: false,
        },
        contractAgreementSetupDetail: {
            contractAgreementSetup: null,
            isLoading: false,
        },
        deleteContractAgreementSetup: {
            isLoading: false,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getContractTemplateParameters.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getContractTemplateParameters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.templateParameters = action.payload.data;
            })
            .addCase(getContractTemplateParameters.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            .addCase(createContractAggrementSetup.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createContractAggrementSetup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contractAggrementSetups = action.payload;
            })
            .addCase(createContractAggrementSetup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            // .addCase(getContractAggrementSetup.pending, (state) => {
            //   state.contractAgreementSetupDetail.isLoading = true;
            // })
            // .addCase(getContractAggrementSetup.fulfilled, (state, action) => {
            //   state.isLoading = false;
            //   state.contractAgreementSetupDetail.contractAgreementSetup = action.payload;
            // })
            // .addCase(getContractAggrementSetup.rejected, (state, action) => {
            //   state.isLoading = false;
            //   state.isError = true;
            //   state.errorMessage = action.error.message;
            // })
            .addCase(getContractAggrementSetup.pending, (state) => {
                state.contractAgreementSetupDetail.isLoading = true;
            })
            .addCase(getContractAggrementSetup.fulfilled, (state, action) => {
                state.contractAgreementSetupDetail.contractAgreementSetup = action.payload.data;
                state.contractAgreementSetupDetail.isLoading = false;
            })
            .addCase(getContractAggrementSetup.rejected, (state, action) => {
                state.contractAgreementSetupDetail.isLoading = false;
            })

            .addCase(updateAContractAggrementSetupByUuid.pending, (state) => {
                state.contractAgreementSetupDetail.isLoading = true;
            })
            .addCase(updateAContractAggrementSetupByUuid.fulfilled, (state, action) => {
                state.contractAgreementSetupDetail.contractAgreementSetup = action.payload.data;
                state.contractAgreementSetupDetail.isLoading = false;
            })
            .addCase(updateAContractAggrementSetupByUuid.rejected, (state, action) => {
                state.contractAgreementSetupDetail.isLoading = false;
            })

            .addCase(getAllContractAgreements.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllContractAgreements.fulfilled, (state, action) => {
                state.contractAgreementSetups = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getAllContractAgreements.rejected, (state, action) => {
                state.isLoading = false;
            })
            //
            // .addCase(getAllContractAggrements.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(getAllContractAggrements.fulfilled, (state, action) => {
            //     state.contractAggrementSetups = action.payload.data;
            //     state.isLoading = false;
            // })
            // .addCase(getAllContractAggrements.rejected, (state, action) => {
            //     state.isLoading = false;
            // })
        ;
    },
});

export const { reset } = contractAggrementSetupSlice.actions;
export default contractAggrementSetupSlice.reducer;
