import axiosInstance from "../api/axiosInstance";

const createEOM = async (body) => {
  //const response = await axiosInstance.post(`/eom-bom`, body);
  const response = await axiosInstance.post(`/eom-bom-job-post`, body);
  return response.data;
};

const getEOMLogEntries = async (params) => {

  const response = await axiosInstance.get('/eom-bom', {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getEOMLogEntryByUuid = async (uuid) => {
  const response = await axiosInstance.get(`/eom-bom/${uuid}`);
  return response.data;
};

const EOMService = {
  createEOM,
  getEOMLogEntries,
  getEOMLogEntryByUuid
};

export default EOMService;
