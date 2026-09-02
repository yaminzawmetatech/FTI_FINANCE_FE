import axiosInstance from "features/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}account-codes`;

// Get Account Codes
const getAccountCodes = async (params, access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params
    }
  } , config);

  return response.data;
};

// Get Bank Account Codes
const getBankAccountCodes = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get(`${base_url}bank-account-codes`, config);

  return response.data;
};

// Delete Account Code
const deleteAccountCode = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + id, config);
  return response.data;
};

// Update Account Code
const updateAccountCode = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(API_URL + "/" + id, data, config);

  return response.data;
};

// Create new Account Code
const createAccountCode = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, data, config);

  return response.data;
};

const accountCodeService = {
  getAccountCodes,
  createAccountCode,
  deleteAccountCode,
  updateAccountCode,
  getBankAccountCodes
};

export default accountCodeService;
