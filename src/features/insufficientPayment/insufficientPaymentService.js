import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}get-insufficient-contracts`;

const getInsufficientPayments = async (params) => {
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

const getInsufficientPaymentIds = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params
    }
  });
  return response.data;
}

const insufficientPaymentService = {
  getInsufficientPayments,
  getInsufficientPaymentIds
};

export default insufficientPaymentService;
