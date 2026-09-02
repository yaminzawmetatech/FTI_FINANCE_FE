import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}priorities`;

const getPriorities = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const createPriority = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

const getPriorityByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL + "/" + uuid);
  return response.data;
};

const updatePriority = async (uuid, body) => {
  const response = await axiosInstance.put(API_URL + "/" + uuid, body);
  return response.data;
};

const deletePriority = async (uuid) => {
  const response = await axiosInstance.delete(API_URL + "/" + uuid);
  return response.data;
};

const getPriorityProperties = async () => {
  const response = await axiosInstance.get(`${base_url}priority-fields`);
  return response.data;
};

const priorityService = {
  getPriorities,
  createPriority,
  updatePriority,
  deletePriority,
  getPriorityByUuid,
  getPriorityProperties,
};

export default priorityService;
