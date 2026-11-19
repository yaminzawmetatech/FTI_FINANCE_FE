import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}follow-up-results`;

// Get
const getFollowUpResults = async (access_token, params = null) => {
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
const deleteFollowUpResult = async (addressWardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + addressWardId, config);

  return response.data;
};

// update
const updateFollowUpResult = async (addressWardId, addressWardData, token) => {
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
const createFollowUpResult = async (addressWardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, addressWardData, config);

  return response.data;
};


const followUpResultService = {
  getFollowUpResults,
  createFollowUpResult,
  updateFollowUpResult,
  deleteFollowUpResult,
};

export default followUpResultService;
