import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}application-reasons`;

const getApplicationReasons = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const getApplicationReasonsByStatus = async (status) => {
  const response = await axiosInstance.get(`application-reasons-byType/${status}`);
  return response.data;
};

const deleteApplicationReason = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateApplicationReason = async (id, data) => {
  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );
  return response.data;
};

const createApplicationReason = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};


const applicationReasonService = {
  createApplicationReason,
  getApplicationReasons,
  deleteApplicationReason,
  updateApplicationReason,
  getApplicationReasonsByStatus
};

export default applicationReasonService;
