import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import repaymentService from "./repaymentService";
import { uniqBy } from "lodash";
import cashDepositService from "../cashDepositProcess/cashDepositService";
import { changeStatusCashDeposit } from "../cashDepositProcess/cashDepositSlice";

const initialState = {
  repayments: [],
  repaymentDetails: null,
  createdRepayment: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  next_page_param: null,
};

export const createRepayment = createAsyncThunk(
  "repayment/createRepayment",
  async (body, thunkAPI) => {
    const formData = new FormData();
    formData.append("description", body.description);
    formData.append("category_id", body.category_id);
    formData.append(
      "posting_date",
      (body?.posting_date &&
        body?.posting_date.format("YYYY-MM-DD HH:mm:ss")) ||
        null
    );
    if (body.account_code_id !== undefined) {
      formData.append("account_code_id", body.account_code_id);
    }
    if (body.type !== undefined) {
      formData.append("type", body.type);
    }

    // if (body.format_code !== undefined) {
    //   formData.append("format_code", body.format_code);
    // }
    if (body.import_excel_file) {
      formData.append("import_excel_file", body.import_excel_file);
    }

    try {
      return await repaymentService.createRepayment(formData);
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

export const updateRepayment = createAsyncThunk(
  "repayment/updateRepayment",
  async ({ params, uuid }, thunkAPI) => {
    try {
      return await repaymentService.updateRepayment(params, uuid);
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

export const getRepayments = createAsyncThunk(
  "repayments",
  async ({ params, url, firstFetch = true }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      const response = await repaymentService.getRepayments(params, token);

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

export const getRepaymentByUuid = createAsyncThunk(
  "repayment/getRepaymentByUuid",
  async ({ uuid }, thunkAPI) => {
    try {
      return await repaymentService.getRepaymentByUuid(uuid);
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

export const waivePenaltyFeesBySettlementUuid = createAsyncThunk(
  "repayment/waivePenaltyFeesBySettlementUuid",
  async ({ uuid, body }, thunkAPI) => {
    try {
      return await repaymentService.waivePenaltyFeesBySetlementUuid(uuid, body);
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

export const checkActualPaymentLinesBySettlementUuid = createAsyncThunk(
  "repayment/checkActualPaymentLinesBySettlementUuid",
  async (uuid, thunkAPI) => {
    try {
      return await repaymentService.checkActualPaymentLinesBySettlementUuid(
        uuid
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

export const checkCustomerNameBySettlementUuid = createAsyncThunk(
  "repayment/checkCustomerNameBySettlementUuid",
  async (body, thunkAPI) => {
    try {
      return await repaymentService.checkCustomerNameBySettlementUuid(body);
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

export const waivePenaltyFeesBySettlementUuids = createAsyncThunk(
  "repayment/waivePenaltyFeesBySettlementUuids",
  async (body, thunkAPI) => {
    try {
      return await repaymentService.waivePenaltyFeesBySettlementUuids(body);
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

export const waivePenaltyFeesBySettlementMob = createAsyncThunk(
  "repayment/waivePenaltyFeesBySettlementMob",
  async (body, thunkAPI) => {
    try {
      return await repaymentService.waivePenaltyFeesBySettlementMob(body);
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

export const discountInterestAmountBySettlementUuids = createAsyncThunk(
  "repayment/discountInterestAmountsBySettlementUuids",
  async (body, thunkAPI) => {
    try {
      return await repaymentService.discountInterestAmountBySettlementUuids(
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

export const applyMonthlyInstallmentBySettlementUuids = createAsyncThunk(
  "repayment/applyMonthlyInstallmentBySettlementUuids",
  async (body, thunkAPI) => {
    try {
      return await repaymentService.applyMonthlyInstallmentBySettlementUuids(
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

export const applyETBySettlementUuids = createAsyncThunk(
  "repayment/applyETBySettlementUuids",
  async (body, thunkAPI) => {
    try {
      return await repaymentService.applyETBySettlementUuids(body);
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

export const applyRecoveryIncomeSettlementUuids = createAsyncThunk(
  "repayment/applyRecoveryIncomeBySettlementUuids",
  async (body, thunkAPI) => {
    try {
      return await repaymentService.applyRecoveryIncomeSettlementUuids(body);
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

export const mobApplyETBySettlementUuids = createAsyncThunk(
  "repayment/mobApplyETBySettlementUuids",
  async (body, thunkAPI) => {
    try {
      return await repaymentService.mobApplyETBySettlementUuids(body);
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

export const changeStatusRepayment = createAsyncThunk(
  "repayment/changeStatusRepayment",
  async ({ status, uuid, settlements }, thunkAPI) => {
    try {
      return await repaymentService.changeStatusRepayment(
        status,
        uuid,
        settlements
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

export const waivePenaltyAPLModal = createAsyncThunk(
  "repayment/waivePenalty",
  async ({ settlement_id }, thunkAPI) => {
    try {
      return await repaymentService.waivePenaltyAPLModal({settlement_id});
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

export const updateWaiveAmount = createAsyncThunk(
  "repayment/updateWaiveAmount",
  async ({ uuid, value }, thunkAPI) => {
    try {
      return await repaymentService.updateWaiveAmount(uuid, value);
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

export const updateDiscountAmount = createAsyncThunk(
  "repayment/updateDiscountAmount",
  async ({ uuid, value }, thunkAPI) => {
    try {
      return await repaymentService.updateDiscountAmount(uuid, value);
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

export const repaymentSlice = createSlice({
  name: "repayment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRepayment.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(createRepayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdRepayment = action.payload.data;
      })
      .addCase(createRepayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getRepayments.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(getRepayments.fulfilled, (state, action) => {
        state.isSuccess = true;
        const { firstFetch, data, next_page_param } = action.payload;
        if (firstFetch) {
          state.repayments = data;
        } else {
          state.repayments = uniqBy(state.repayments.concat(data), "id");
        }

        state.next_page_param = next_page_param;
        state.isLoading = false;
      })
      .addCase(getRepayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.next_page_param = null;
      })
      .addCase(getRepaymentByUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRepaymentByUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.repaymentDetails = action.payload.data;
      })
      .addCase(getRepaymentByUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(waivePenaltyFeesBySettlementUuid.pending, (state) => {
        state.isLoading = true;
        // state.next_page_param = null;
      })
      .addCase(waivePenaltyFeesBySettlementUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.createdRepayment = action.payload.data;
      })
      .addCase(waivePenaltyFeesBySettlementUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(discountInterestAmountBySettlementUuids.pending, (state) => {
        state.isLoading = true;
        // state.next_page_param = null;
      })
      .addCase(
        discountInterestAmountBySettlementUuids.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // state.createdRepayment = action.payload.data;
        }
      )
      .addCase(
        discountInterestAmountBySettlementUuids.rejected,
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addCase(applyMonthlyInstallmentBySettlementUuids.pending, (state) => {
        state.isLoading = true;
        // state.next_page_param = null;
      })
      .addCase(
        applyMonthlyInstallmentBySettlementUuids.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // state.createdRepayment = action.payload.data;
        }
      )
      .addCase(
        applyMonthlyInstallmentBySettlementUuids.rejected,
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addCase(applyETBySettlementUuids.pending, (state) => {
        state.isLoading = true;
        // state.next_page_param = null;
      })
      .addCase(applyETBySettlementUuids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.createdRepayment = action.payload.data;
      })
      .addCase(applyETBySettlementUuids.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(applyRecoveryIncomeSettlementUuids.pending, (state) => {
        state.isLoading = true;
        // state.next_page_param = null;
      })
      .addCase(applyRecoveryIncomeSettlementUuids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.createdRepayment = action.payload.data;
      })
      .addCase(applyRecoveryIncomeSettlementUuids.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(checkActualPaymentLinesBySettlementUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(mobApplyETBySettlementUuids.pending, (state) => {
        state.isLoading = true;
        // state.next_page_param = null;
      })
      .addCase(mobApplyETBySettlementUuids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.createdRepayment = action.payload.data;
      })
      .addCase(mobApplyETBySettlementUuids.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(
        checkActualPaymentLinesBySettlementUuid.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
        }
      )
      .addCase(
        checkActualPaymentLinesBySettlementUuid.rejected,
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addCase(checkCustomerNameBySettlementUuid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkCustomerNameBySettlementUuid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(checkCustomerNameBySettlementUuid.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateRepayment.pending, (state) => {
        state.isLoading = true;
        state.next_page_param = null;
      })
      .addCase(updateRepayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdRepayment = action.payload.data;
      })
      .addCase(updateRepayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeStatusRepayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatusRepayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(changeStatusRepayment.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateWaiveAmount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWaiveAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateWaiveAmount.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateDiscountAmount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDiscountAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateDiscountAmount.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(waivePenaltyFeesBySettlementUuids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(waivePenaltyFeesBySettlementUuids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(waivePenaltyFeesBySettlementUuids.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(waivePenaltyAPLModal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(waivePenaltyAPLModal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(waivePenaltyAPLModal.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(waivePenaltyFeesBySettlementMob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(waivePenaltyFeesBySettlementMob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(waivePenaltyFeesBySettlementMob.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = repaymentSlice.actions;
export default repaymentSlice.reducer;
