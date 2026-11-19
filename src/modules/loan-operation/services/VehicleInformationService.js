import axiosInstance from "core/services/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;
const API_URL = `${base_url}vehicle-information`;
const LAPI_URL = `${base_url}latest-vehicle-information`;

const getVehicleInformation = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getLatestVehicleInformation = async (params) => {
  const response = await axiosInstance.get(LAPI_URL, {
    params: {
      ...params,
    },
  });
  return response.data;
};

const getAllVehicleInformation = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
    },
  });
  return response.data;
};

const getVehicleInformationByUuid = async (uuid) => {
  const response = await axiosInstance.get(`${API_URL}/${uuid}`);
  return response.data;
};

const createVehicleInformation = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

const updateVehicleInformation = async (data, uuid) => {
  const response = await axiosInstance.put(`${API_URL}/${uuid}`, data);
  return response.data;
};

const deleteVehicleInformation = async (uuid) => {
  const response = await axiosInstance.delete(`${API_URL}/${uuid}`);
  return response.data;
};

// Will add batch delete --

const VehicleInformationService = {
  createVehicleInformation,
  getVehicleInformation,
  getVehicleInformationByUuid,
  updateVehicleInformation,
  deleteVehicleInformation,
  getAllVehicleInformation,
  getLatestVehicleInformation
};

export default VehicleInformationService;
