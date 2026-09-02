import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}signers`;

const getSigners = async (access_token) => {
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

const deleteSigner = async (signerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + signerId, config);

  return response.data;
};

const updateSigner = async (signerId, signerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + signerId,
    signerData,
    config
  );

  return response.data;
};

const createSigner = async (signerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, signerData, config);

  return response.data;
};

const signerService = {
  createSigner,
  getSigners,
  deleteSigner,
  updateSigner,
};

export default signerService;
