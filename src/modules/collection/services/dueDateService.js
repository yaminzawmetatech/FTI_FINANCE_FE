import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}signers`;

const getDueDates = async (access_token) => {
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

const deleteDueDate = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + id, config);

  return response.data;
};

const updateDueDate = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
    config
  );

  return response.data;
};

const createDueDate = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, data, config);

  return response.data;
};

const dueDateService = {
  createDueDate,
  getDueDates,
  deleteDueDate,
  updateDueDate,
};

export default dueDateService;
