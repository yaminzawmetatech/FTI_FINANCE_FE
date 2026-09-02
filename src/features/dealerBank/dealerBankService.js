import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}dealer-bank`;

const getDealerBanks = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getDealerBanksByStatus = async (status) => {
  const response = await axiosInstance.get(API_URL+'/'+status);
  return response.data;
};

const deleteDealerBank = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateDealerBank = async (id, data) => {
  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );
  return response.data;
};

const createDealerBank = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};


const dealerBankService = {
  createDealerBank,
  getDealerBanks,
  deleteDealerBank,
  updateDealerBank,
  getDealerBanksByStatus
};

export default dealerBankService;
