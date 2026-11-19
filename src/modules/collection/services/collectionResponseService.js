import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}collection-responses`;

const getCollectionResponsesByUuid = async (uuid) => {
  const response = await axiosInstance.get(`${base_url}reminder-allocations/${uuid}/collection-responses`);
  return response.data;
};

const deleteCollectionResponse = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);

  return response.data;
};

const updateCollectionResponseByUuid = async (uuid, body) => {
  const response = await axiosInstance.put(API_URL + "/" + uuid, body);

  return response.data;
};

const createCollectionResponse = async (body) => {
  const response = await axiosInstance.post(API_URL, body);

  return response.data;
};

const collectionResponseService = {
  createCollectionResponse,
  getCollectionResponsesByUuid,
  deleteCollectionResponse,
  updateCollectionResponseByUuid,
};

export default collectionResponseService;
