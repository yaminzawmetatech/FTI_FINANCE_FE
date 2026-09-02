import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}address-villages`;

// Get
const getAddressVillages = async (access_token, params = null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params,
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

const getAddressVillageList = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};


// Delete
const deleteAddressVillage = async (addressVillageId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + addressVillageId, config);

  return response.data;
};

// update
const updateAddressVillage = async (
  addressVillageId,
  addressVillageData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + addressVillageId,
    addressVillageData,
    config
  );

  return response.data;
};

// Create
const createAddressVillage = async (addressVillageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, addressVillageData, config);

  return response.data;
};

// batch delete
const batchDeleteAddressVillages = async (addressVillagesIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    API_URL + "/batch-delete",
    addressVillagesIds,
    config
  );

  return response.data;
};

const addressVillageService = {
  getAddressVillages,
  createAddressVillage,
  updateAddressVillage,
  deleteAddressVillage,
  batchDeleteAddressVillages,
  getAddressVillageList
};

export default addressVillageService;
