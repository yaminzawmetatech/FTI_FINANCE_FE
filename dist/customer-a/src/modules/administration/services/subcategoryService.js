import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}sub-categories`;

const getSubCategory = async () => {

  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const deleteSubCategory = async (subcategoryId) => {

  const response = await axiosInstance.delete(API_URL + "/" + subcategoryId);
  return response.data;
};

const updateSubCategory = async (subcategoryId, subcategoryData) => {

  const response = await axiosInstance.put(API_URL + "/" + subcategoryId, subcategoryData);
  return response.data;
};

const createSubCategory = async (subcategoryData) => {

  const response = await axiosInstance.post(API_URL, subcategoryData);
  return response.data;
};

const batchDeleteSubCategory = async (subcategoryIds) => {
  
  const response = await axiosInstance.post(API_URL + "/batch-delete", subcategoryIds);
  return response.data;
};

const subcategoryService = {
  createSubCategory,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
  batchDeleteSubCategory,
};

export default subcategoryService;
