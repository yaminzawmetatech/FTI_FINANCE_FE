import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}nrc-townships`;

// Get NRC Townships
const getNRCTownships = async (access_token, params = null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params,
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

// Delete
const deleteNRCTownship = async (nrcTownshipId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + nrcTownshipId, config);

  return response.data;
};

const updateNRCTownship = async (nrcTownshipId, nrcTownshipData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + nrcTownshipId,
    nrcTownshipData,
    config
  );

  return response.data;
};

// Create
const createNRCTownship = async (nrcTownshipData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, nrcTownshipData, config);

  return response.data;
};

const batchDeleteNRCTownships = async (nrcTownshipIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    API_URL + "/batch-delete",
    nrcTownshipIds,
    config
  );

  return response.data;
};

const nrcTownshipService = {
  getNRCTownships,
  createNRCTownship,
  updateNRCTownship,
  deleteNRCTownship,
  batchDeleteNRCTownships,
};

export default nrcTownshipService;
