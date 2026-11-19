import axiosInstance from "core/services/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;


const API_URL = `${base_url}product-models`;


const getModels = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};


const createModel = async (data) => {
  const response = await axiosInstance.post(`${API_URL}`, data);
  return response.data;
};

const updateModel = async (data,uuid) => {
  const response = await axiosInstance.put(`${API_URL}/${uuid}`,data)
  return response.data;
}


const deleteModel = async (uuid) => {
  const response = await axiosInstance.delete(`${API_URL}/${uuid}`);
  return response.data;
}
// will add batch delete -- 


const 
ModelService = {
  getModels,
  createModel,
  updateModel,
  deleteModel,
};

export default ModelService