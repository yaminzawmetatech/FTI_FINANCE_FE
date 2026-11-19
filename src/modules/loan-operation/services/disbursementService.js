import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}disbursement-setups`;

const getDisbursements = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get(
    API_URL,
    config
  );

  return response.data;
};

const deleteDisbursement = async (disbursementId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + disbursementId, config);

  return response.data;
};

const updateDisbursement = async (disbursementId, disbursementData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + disbursementId,
    disbursementData,
    config
  );

  return response.data;
};

const createDisbursement = async (disbursementData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, disbursementData, config);

  return response.data;
};

const disbursementService = {
  createDisbursement,
  getDisbursements,
  deleteDisbursement,
  updateDisbursement,
};

export default disbursementService;
