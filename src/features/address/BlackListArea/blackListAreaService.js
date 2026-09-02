import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}get-blacklist-area`;

const getBlackListAreaList = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const createExcludeBlackListArea = async (body) => {

  const response = await axiosInstance.post("excluded-area", body);

  return response.data;
};

const blackListAreaService = {
  getBlackListAreaList,
  createExcludeBlackListArea
};

export default blackListAreaService;
