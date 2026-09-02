import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}address-townships`;

// Get addressTownships
const getAddressTownships = async (access_token, params = null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params,
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

// Create new addressTownship
const createAddressTownship = async (addressTownshipData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, addressTownshipData, config);

  return response.data;
};

// update addressTownship
const updateAddressTownship = async (
  addressTownshipId,
  addressTownshipData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + addressTownshipId,
    addressTownshipData,
    config
  );

  return response.data;
};

// Delete addressTownship
const deleteAddressTownship = async (addressTownshipId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(
    API_URL + "/" + addressTownshipId,
    config
  );

  return response.data;
};

// batch delete addressTownships
const batchDeleteAddressTownships = async (addressTownshipIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    API_URL + "/batch-delete",
    addressTownshipIds,
    config
  );

  return response.data;
};

const addressTownshipService = {
  getAddressTownships,
  createAddressTownship,
  updateAddressTownship,
  deleteAddressTownship,
  batchDeleteAddressTownships,
};

export default addressTownshipService;
