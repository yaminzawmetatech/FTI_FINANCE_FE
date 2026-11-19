import axiosInstance from "core/services/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;


const API_URL = `${base_url}brands`;


const getBrands = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};


const createBrand = async (data) => {
  const response = await axiosInstance.post(`${API_URL}`, data);
  return response.data;
};

const updateBrand = async (data,uuid) => {
  const response = await axiosInstance.put(`${API_URL}/${uuid}`,data)
  return response.data;
}


const deleteBrand = async (uuid) => {
  const response = await axiosInstance.delete(`${API_URL}/${uuid}`);
  return response.data;
}
// will add batch delete -- 


const 
BrandService = {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};

export default BrandService