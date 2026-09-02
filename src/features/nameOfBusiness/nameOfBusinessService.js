import axiosInstance from "../api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}name-of-businesses`;

// Get 
const getNameOfBusinesses = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getAllNameOfBusinesses = async (params) => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

// Delete 
const deleteNameOfBusiness = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};

// Update 
const updateNameOfBusiness = async (id, data) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Create 
const createNameOfBusiness = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

const nameOfBusinessService = {
  getNameOfBusinesses,
  deleteNameOfBusiness,
  updateNameOfBusiness,
  createNameOfBusiness,
  getAllNameOfBusinesses
};

export default nameOfBusinessService;
