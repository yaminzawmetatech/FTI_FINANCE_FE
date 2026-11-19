import axiosInstance from "core/services/api/axiosInstance";

const createRepayment = async (body) => {
  const response = await axiosInstance.post(`/repayments`, body);
  return response.data;
};

const updateRepayment = async (body) => {
  const response = await axiosInstance.patch(`/repayments`, body);
  return response.data;
};

const getRepayments = async (params) => {

  const response = await axiosInstance.get('/repayments', {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getRepaymentByUuid = async (uuid) => {

  const response = await axiosInstance.get(`repayments/${uuid}`);
  return response.data;
};

const waivePenaltyFeesBySetlementUuid = async (settlement_uuid, body) => {
  const response = await axiosInstance.post(`repayments/settlement-penalty-waive/${settlement_uuid}`, body);
  return response.data;
};

const checkActualPaymentLinesBySettlementUuid = async (uuid) => {
  const response = await axiosInstance.post(`repayments/settlement-actual-payment-line-check/${uuid}`);
  return response.data;
};

const checkCustomerNameBySettlementUuid = async ( body) => {
  const response = await axiosInstance.post(`repayments/settlement-customer-name-check`, body);
  return response.data;
};

const waivePenaltyFeesBySettlementUuids = async (body) => {
  const response = await axiosInstance.post(`repayments/muiltiple-settlement-waive-penalty`, body);
  return response.data;
};

const discountInterestAmountBySettlementUuids = async (body) => {
  const response = await axiosInstance.post(`repayments/muiltiple-settlement-discount-interest-amount`, body);
  return response.data;
};

const applyMonthlyInstallmentBySettlementUuids = async (body) => {
  const response = await axiosInstance.post(`repayments/apply-monthly-installments`, body);
  return response.data;
};

const applyETBySettlementUuids = async (body) => {
  const response = await axiosInstance.post(`early-termination-fees/apply`, body);
  return response.data;
};

const applyRecoveryIncomeSettlementUuids = async (body) => {
  const response = await axiosInstance.post(`repayment-after-write-off/apply`, body);
  return response.data;
};

const mobApplyETBySettlementUuids = async (body) => {
  const response = await axiosInstance.post(`mob-early-termination-fees/apply`, body);
  return response.data;
};

const changeStatusRepayment = async (status, uuid, settlements) => {
  const response = await axiosInstance.post(
      `repayments/${uuid}/change-repayment-status`,
      {
        status,
        settlements
      }
  );
  return response.data;
};

const updateWaiveAmount = async (uuid,value) => {
  const response = await axiosInstance.post(
      `settlements/${uuid}/update-waive-amount`,
      {
        waive_penalty_fee: value
      }
  );
  return response.data;
};

const updateDiscountAmount = async (uuid,value) => {
  const response = await axiosInstance.post(
      `settlements/${uuid}/update-discount-interest-amount`,
      {
        discount_interest_amount: value
      }
  );
  return response.data;
};

const waivePenaltyAPLModal = async (body) => {
  const response = await axiosInstance.post(`is-all-waived`, body);
  return response.data;
};

const waivePenaltyFeesBySettlementMob = async (body) => {
  const response = await axiosInstance.post(`actual-payment-line-waived`, body);
  return response.data;
};

const repaymentService = {
  createRepayment,
  getRepayments,
  getRepaymentByUuid,
  waivePenaltyFeesBySetlementUuid,
  checkActualPaymentLinesBySettlementUuid,
  checkCustomerNameBySettlementUuid,
  waivePenaltyFeesBySettlementUuids,
  applyMonthlyInstallmentBySettlementUuids,
  updateRepayment,
  changeStatusRepayment,
  updateWaiveAmount,
  updateDiscountAmount,
  discountInterestAmountBySettlementUuids,
  applyETBySettlementUuids,
  mobApplyETBySettlementUuids,
  applyRecoveryIncomeSettlementUuids,
  waivePenaltyAPLModal,
  waivePenaltyFeesBySettlementMob,
};

export default repaymentService;
