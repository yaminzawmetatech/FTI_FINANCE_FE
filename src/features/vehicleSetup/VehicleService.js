import axiosInstance from "features/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;


const API_URL = `${base_url}vehicles`;


const getVehicles = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getAllVehicles = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
    },
  });
  return response.data;
};



const createVehicle = async (data) => {
  const response = await axiosInstance.post(`${API_URL}`, data);
  return response.data;
};

const updateVehicle = async (data,uuid) => {
  const response = await axiosInstance.put(`${API_URL}/${uuid}`,data)
  return response.data;
}


const deleteVehicle = async (uuid) => {
  const response = await axiosInstance.delete(`${API_URL}/${uuid}`);
  return response.data;
}
// will add batch delete -- 


const 
VehicleService = {
  createVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
  getAllVehicles
};

export default VehicleService