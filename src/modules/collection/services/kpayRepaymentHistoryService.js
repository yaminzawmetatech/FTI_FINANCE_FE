import axiosInstance from "core/services/api/axiosInstance";

const getAllKpayRepaymentHistories = async (params, url = "kpay-repayments") => {
  const response = await axiosInstance.get(url,{
    params: {
      ...params,
      limit: +params?.limit || 50,
    },});
  return response.data;
};


const kpayRepaymentHistoryService = {
  getAllKpayRepaymentHistories,
};

export default kpayRepaymentHistoryService;
