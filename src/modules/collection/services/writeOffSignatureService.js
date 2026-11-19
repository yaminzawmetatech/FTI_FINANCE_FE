import axiosInstance from "core/services/api/axiosInstance";
import { sortBy } from "lodash";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}write-off-signatures`;

const getWriteOffSignature = async ({ params }) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params
    },
  });
  return response.data;
};
const createWriteOffSignature = async (body) => {
  const response = await axiosInstance.post(API_URL, body);
  return response.data;
};
const updateWriteOffSignature = async (uuid, body) => {
  const response = await axiosInstance.put(API_URL + "/" + uuid, body);
  return response.data;
};

const getWriteOffSignatureByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL + "/" + uuid);
  return response.data;
};

const writeOffSignatureService = {
  createWriteOffSignature,
  updateWriteOffSignature,
  getWriteOffSignature,
  getWriteOffSignatureByUuid,
};

export default writeOffSignatureService;
