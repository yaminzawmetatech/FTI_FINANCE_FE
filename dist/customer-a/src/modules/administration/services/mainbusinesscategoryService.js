import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}main-business-categories`;

const getMainBusinessCategories = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

const deleteMainBusinessCategory = async (mainBusinessCategoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(
    API_URL + "/" + mainBusinessCategoryId,
    config
  );

  return response.data;
};

const updateMainBusinessCategory = async (
  mainBusinessCategoryId,
  mainbusinesscategoryData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + mainBusinessCategoryId,
    mainbusinesscategoryData,
    config
  );

  return response.data;
};

const createMainBusinessCategory = async (mainbusinesscategoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, mainbusinesscategoryData, config);

  return response.data;
};

const batchDeleteMainBusinessCategory = async (
  mainBusinessCategoryId,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    API_URL + "/batch-delete",
    mainBusinessCategoryId,
    config
  );

  return response.data;
};

const mainbusinesscategoryService = {
  createMainBusinessCategory,
  getMainBusinessCategories,
  deleteMainBusinessCategory,
  updateMainBusinessCategory,
  batchDeleteMainBusinessCategory,
};

export default mainbusinesscategoryService;
