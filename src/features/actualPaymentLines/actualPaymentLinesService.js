import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}actual-payment-lines`;

const getAllActualPaymentLines = async (params,access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, 
    {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  },
  
  );
  return response.data;
};

const getPaymentLinesHistory = async (uuid) => {
 
  const response = await axiosInstance.get(`actual-payment-lines/${uuid}/payment-details`);
  return response.data;
};

const actualPaymentLinesService = {
  getAllActualPaymentLines,
  getPaymentLinesHistory
};

export default actualPaymentLinesService;
