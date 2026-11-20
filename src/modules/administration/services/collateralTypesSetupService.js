import axiosInstance from "core/services/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}collateral-types`;

const getCollateralTypes = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getAllCollateralTypes = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
    },
  });
  return response.data;
};

const createCollateralType = async (data) => {
  const response = await axiosInstance.post(`${API_URL}`, data);
  return response.data;
};

const updateCollateralType = async (uuid, data) => {
  const response = await axiosInstance.put(`${API_URL}/${uuid}`, data);
  return response.data;
};

const deleteCollateralType = async (uuid) => {
  const response = await axiosInstance.delete(`${API_URL}/${uuid}`);
  return response.data;
};

// Will add batch delete --

const CollateralTypeService = {
  createCollateralType,
  getCollateralTypes,
  updateCollateralType,
  deleteCollateralType,
  getAllCollateralTypes
};

export default CollateralTypeService;
