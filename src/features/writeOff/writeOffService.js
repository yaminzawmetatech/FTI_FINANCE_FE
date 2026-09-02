import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}get/contract-overdue-lists`;

const getWriteOffs = async (params) => {
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

const calculateAmountsByWriteOffMonth = async (params) => {
  const response = await axiosInstance.get(`calculate-write-off-contract`, {
    params: {
      ...params
    }
  });
  return response.data;
}

const getWriteOffIds = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params
    }
  });
  return response.data;
}

const writeOffService = {
  getWriteOffs,
  calculateAmountsByWriteOffMonth,
  getWriteOffIds
};

export default writeOffService;
