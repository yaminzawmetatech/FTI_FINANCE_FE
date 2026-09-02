import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}address-cities`;

// Get address City
const getAddressCities = async (access_token, params = null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params,
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

// Create new address City
const createAddressCity = async (addressCityData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, addressCityData, config);

  return response.data;
};

// update address City
const updateAddressCity = async (addressCityId, addressCityData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + addressCityId,
    addressCityData,
    config
  );

  return response.data;
};

// Delete address City
const deleteAddressCity = async (addressCityId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + addressCityId, config);

  return response.data;
};

// batch delete address City
const batchDeleteAddressCities = async (addressCityIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    API_URL + "/batch-delete",
    addressCityIds,
    config
  );

  return response.data;
};

const addressCityService = {
  getAddressCities,
  createAddressCity,
  updateAddressCity,
  deleteAddressCity,
  batchDeleteAddressCities,
};

export default addressCityService;
