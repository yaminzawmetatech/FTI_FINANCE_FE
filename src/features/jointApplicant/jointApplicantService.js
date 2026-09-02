import axiosInstance from "../api/axiosInstance";

const getJointApplicantsApi = async (params, url = "joint-applications") => {
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

const getJointApplicantApi = async (id) => {
  const response = await axiosInstance.get(`joint-applications/${id}`);
  return response.data;
};


const getAllJointApplicantApi = async () => {
  const response = await axiosInstance.get(`joint-applications`);
  return response.data;
};

const createJointApplicantApi = async (body) => {
  const response = await axiosInstance.post(`joint-applications`, body);
  return response.data;
};

const updateJointApplicantApi = async (id, body) => {
  const response = await axiosInstance.put(`joint-applications/${id}`, body);
  return response.data;
};

const updateguarantorstatusApi = async (id, status) => {
  const response = await axiosInstance.put(
    `joint-applications/${id}/updateguarantorstatus`,
    { status }
  );
  return response.data;
};

const deleteJointApplicantApi = async (id, applicationId) => {
  const response = await axiosInstance.delete(`joint-applications/${id}/${applicationId}/delete`);
  return response.data;
};

const jointApplicantService = {
  getJointApplicantsApi,
  getJointApplicantApi,
  createJointApplicantApi,
  updateJointApplicantApi,
  deleteJointApplicantApi,
  updateguarantorstatusApi,
  getAllJointApplicantApi
};

export default jointApplicantService;
