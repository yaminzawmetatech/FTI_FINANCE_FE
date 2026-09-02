import axiosInstance from "../api/axiosInstance";

const getReferencesApi = async (params, url = "references") => {
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

const getReferenceApi = async (id) => {
  const response = await axiosInstance.get(`references/${id}`);
  return response.data;
};


const getAllReferencesApi = async () => {
  const response = await axiosInstance.get(`references`);
  return response.data;
};

const createReferencesApi = async (body) => {
  const response = await axiosInstance.post(`references`, body);
  return response.data;
};

const updateReferenceApi = async (id, body) => {
  const response = await axiosInstance.put(`references/${id}`, body);
  return response.data;
};

const updateguarantorstatusApi = async (id, status) => {
  const response = await axiosInstance.put(
    `guarantors/${id}/updateguarantorstatus`,
    { status }
  );
  return response.data;
};

const deleteReferenceApi = async (id, applicationId) => {
  const response = await axiosInstance.delete(`references/${id}/${applicationId}/delete`);
  return response.data;
};

const referenceService = {
  getReferencesApi,
  getReferenceApi,
  createReferencesApi,
  updateReferenceApi,
  deleteReferenceApi,
  updateguarantorstatusApi,
  getAllReferencesApi
};

export default referenceService;
