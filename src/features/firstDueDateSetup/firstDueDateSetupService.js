import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}first-due-date-setups`;

const getFirstDueDateSetup = async () => {

  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const deleteFirstDueDateSetup = async (firstDueDateSetupId) => {

  const response = await axiosInstance.delete(API_URL + "/" + firstDueDateSetupId);
  return response.data;
};

const updateFirstDueDateSetup = async (firstDueDateSetupId, firstDueDateSetupData) => {

  const response = await axiosInstance.put(API_URL + "/" + firstDueDateSetupId, firstDueDateSetupData);
  return response.data;
};

const createFirstDueDateSetup = async (firstDueDateSetupData) => {

  const response = await axiosInstance.post(API_URL, firstDueDateSetupData);
  return response.data;
};

const batchDeleteFirstDueDateSetup = async (firstDueDateSetupIds) => {
  
  const response = await axiosInstance.post(API_URL + "/batch-delete", firstDueDateSetupIds);
  return response.data;
};

const firstDueDateSetupService = {
  createFirstDueDateSetup,
  getFirstDueDateSetup,
  deleteFirstDueDateSetup,
  updateFirstDueDateSetup,
  batchDeleteFirstDueDateSetup,
};

export default firstDueDateSetupService;
