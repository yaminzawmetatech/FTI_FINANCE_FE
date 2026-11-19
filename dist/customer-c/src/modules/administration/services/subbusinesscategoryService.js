import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}sub-business-categories`;

const getSubBusinessCategories = async () => {

  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const deleteSubBusinessCategory = async (subbusinesscategoryId) => {

  const response = await axiosInstance.delete(API_URL + "/" + subbusinesscategoryId);
  return response.data;
};

const updateSubBusinessCategory = async (subbusinesscategoryId, subbusinesscategoryData) => {

  const response = await axiosInstance.put(API_URL + "/" + subbusinesscategoryId,subbusinesscategoryData);
  return response.data;
};

const createSubBusinessCategory = async (subbusinesscategoryData) => {

  const response = await axiosInstance.post(API_URL, subbusinesscategoryData);
  return response.data;
};

const batchDeleteSubBusinessCategory = async (subbusinesscategoryIds) => {
  
  const response = await axiosInstance.post(API_URL + "/batch-delete",subbusinesscategoryIds);
  return response.data;
};

const subbusinesscategoryService = {
  createSubBusinessCategory,
  getSubBusinessCategories,
  deleteSubBusinessCategory,
  updateSubBusinessCategory,
  batchDeleteSubBusinessCategory,
};

export default subbusinesscategoryService;
