import axiosInstance from "core/services/api/axiosInstance";
import { sortBy } from "lodash";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}application-signatures`;

const getCOR = async ({ params }) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
     ...params
    },
  });
  return response.data;
};
const createCOR = async (body) => {
  const response = await axiosInstance.post(API_URL, body);
  return response.data;
};
const updateCOR = async (uuid, body) => {
  const response = await axiosInstance.put(API_URL+"/"+uuid, body);
  return response.data;
};

const getCORByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL+"/"+uuid);
  return response.data;
};

const CORService = {
  createCOR,
  updateCOR,
  getCOR,
  getCORByUuid,
};

export default CORService;
