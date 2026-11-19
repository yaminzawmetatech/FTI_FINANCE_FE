import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}positions`;

// Get user position
const getPosition = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

// Delete user position
const deletePosition = async (positionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + positionId, config);

  return response.data;
};

const updatePosition = async (positionId, positionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + positionId,
    positionData,
    config
  );

  return response.data;
};

// Create new position
const createPosition = async (positionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, positionData, config);

  return response.data;
};

const batchDeletePosition = async (positionIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    API_URL + "/batch-delete",
    positionIds,
    config
  );

  return response.data;
};

const positionService = {
  createPosition,
  getPosition,
  deletePosition,
  updatePosition,
  batchDeletePosition,
};

export default positionService;
