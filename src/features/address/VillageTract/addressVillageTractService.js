import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}address-village-tracts`;

// Get address village tract
const getAddressVillageTracts = async (access_token, params = null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params,
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

const getAddressVillageTractList = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};


// Delete
const deleteAddressVillageTract = async (addressVillageTractId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(
    API_URL + "/" + addressVillageTractId,
    config
  );

  return response.data;
};

// update
const updateAddressVillageTract = async (
  addressVillageTractId,
  addressVillageTractData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + addressVillageTractId,
    addressVillageTractData,
    config
  );

  return response.data;
};

// Create
const createAddressVillageTract = async (addressVillageTractData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, addressVillageTractData, config);

  return response.data;
};

// batch delete
const batchDeleteAddressVillageTracts = async (
  addressVillageTractIds,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    API_URL + "/batch-delete",
    addressVillageTractIds,
    config
  );

  return response.data;
};

const addressVillageTractService = {
  getAddressVillageTracts,
  createAddressVillageTract,
  updateAddressVillageTract,
  deleteAddressVillageTract,
  batchDeleteAddressVillageTracts,
  getAddressVillageTractList
};

export default addressVillageTractService;
