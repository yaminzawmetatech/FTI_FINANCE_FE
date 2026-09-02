import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}categories`;

// Get user category
const getCategories = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const getMobCategories = async () => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      mob_status: 1,
    },
  });
  return response.data;
};

const categoryService = {
  getCategories
};

export default categoryService;
