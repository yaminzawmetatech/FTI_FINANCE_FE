import axiosInstance from "core/services/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}customer-banks`;

// Get all customer banks
const getCustomerBanks = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

// Delete customer bank
const deleteCustomerBank = async (bankId) => {
  const response = await axiosInstance.delete(`${API_URL}/${bankId}`);
  return response.data;
};

// Update customer bank
const updateCustomerBank = async (bankId, bankData) => {
  const response = await axiosInstance.put(`${API_URL}/${bankId}`, bankData);
  return response.data;
};

// Create new customer bank
const createCustomerBank = async (bankData) => {
  const response = await axiosInstance.post(API_URL, bankData);
  return response.data;
};

const customerBankService = {
  getCustomerBanks,
  deleteCustomerBank,
  updateCustomerBank,
  createCustomerBank,
};

export default customerBankService;
