import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}address-wards`;

// Get address Ward
const getAddressWards = async (access_token, params = null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params,
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

const getAddressWardList = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

// Delete
const deleteAddressWard = async (addressWardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + addressWardId, config);

  return response.data;
};

// update
const updateAddressWard = async (addressWardId, addressWardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + addressWardId,
    addressWardData,
    config
  );

  return response.data;
};

// Create
const createAddressWard = async (addressWardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, addressWardData, config);

  return response.data;
};

// batch delete
const batchDeleteAddressWards = async (addressWardsIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    API_URL + "/batch-delete",
    addressWardsIds,
    config
  );

  return response.data;
};

const addressWardService = {
  getAddressWards,
  createAddressWard,
  updateAddressWard,
  deleteAddressWard,
  batchDeleteAddressWards,
  getAddressWardList
};

export default addressWardService;
