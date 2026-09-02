import axiosInstance from "../api/axiosInstance";

const getProvisionSetups = async (params) => {
  const response = await axiosInstance.get('/provision-setups', {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const storeProvisionSetups = async (params) => {
  let response = await axiosInstance.post('/provision-setups', params);
  return response.data;
};

const updateProvisionSetups = async (params, uuid) => {
  let response = await axiosInstance.patch(`/provision-setups/${uuid}`, params);
  return response.data;
};

const getProvisionSetupByUuid = async (uuid) => {
  let response = await axiosInstance.get(`/provision-setups/${uuid}`);
  return response.data;
};

const deleteProvisionSetupByUuid = async (uuid) => {
  let response = await axiosInstance.delete(`/provision-setups/${uuid}`);
  return response.data;
};

const provisionSetupService = {
  getProvisionSetups,
  storeProvisionSetups,
  getProvisionSetupByUuid,
  updateProvisionSetups,
  deleteProvisionSetupByUuid
};

export default provisionSetupService;
