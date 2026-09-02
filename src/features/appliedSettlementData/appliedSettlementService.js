import axiosInstance from "../api/axiosInstance";

const getAppliedSettlementData = async (uuid, params) => {
  const response = await axiosInstance.get(`repayments/${uuid}/get-applied-records`,{
    params: {
      ...params,
      limit: +params?.limit || 50,
    },});
  return response.data;
};

const getAppliedSettlementInsufficientData = async (uuid, params) => {
  const response = await axiosInstance.get(`get-bank-statement-account-treatments-by-batchUuid/${uuid}`,{
    params: {
      ...params,
      limit: +params?.limit || 50,
    },});
  return response.data;
};

const postAppliedSettlementData = async (uuid,params) => {
  const response = await axiosInstance.get(
    `repayments/${uuid}/sync-applied-records`, {
      params: {
        ...params
      }
    }
  );
  return response.data;
};

const postAppliedSettlementinsufficientData = async (batch_id) => {
  const response = await axiosInstance.post(`post-last-payments`,{
    batch_id
  });
  return response.data;
};

const appliedSettlementDataService = {
  getAppliedSettlementData,
  postAppliedSettlementData,
  getAppliedSettlementInsufficientData,
  postAppliedSettlementinsufficientData
};

export default appliedSettlementDataService;
