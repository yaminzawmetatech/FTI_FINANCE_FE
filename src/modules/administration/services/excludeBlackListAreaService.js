import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}excluded-area`;

const getExcludeBlackListAreaList = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};


const deleteExcludeBlackListArea = async (id) => {

  const response = await axiosInstance.delete(API_URL + "/" + id);

  return response.data;
};


const batchDeleteExcludeBlackList = async (ids) => {

  const response = await axiosInstance.post(API_URL + "/batch-delete",ids);

  return response.data;
};

const excludeBlackListAreaService = {
  getExcludeBlackListAreaList,
  deleteExcludeBlackListArea,
  batchDeleteExcludeBlackList
};

export default excludeBlackListAreaService;
