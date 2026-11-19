import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}type-of-businesses`;

const getTypeofBusinesses = async () => {
 
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const deleteTypeofBusiness = async (typeofbusinessCode) => {
  
  const response = await axiosInstance.delete(API_URL + "/" + typeofbusinessCode);
  return response.data;
};

const updateTypeofBusiness = async (typeofbusinessCode, typeofbusinessData) => {
 
  const response = await axiosInstance.put(API_URL + "/" + typeofbusinessCode, typeofbusinessData);
  return response.data;
};

const createTypeofBusiness = async (typeofbusinessData) => {

  const response = await axiosInstance.post(API_URL, typeofbusinessData);
  return response.data;
};

const batchDeleteTypeofBusiness = async (typeofbusinessCode) => {
  
  const response = await axiosInstance.post(API_URL + "/batch-delete", typeofbusinessCode);
  return response.data;
};

const typeofbusinessService = {
  createTypeofBusiness,
  getTypeofBusinesses,
  deleteTypeofBusiness,
  updateTypeofBusiness,
  batchDeleteTypeofBusiness,
};

export default typeofbusinessService;
