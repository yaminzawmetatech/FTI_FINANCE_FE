import axiosInstance from "core/services/api/axiosInstance";

const getAssessmentsApi = async (params, url = "assessments") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getAssessmentApi = async (id) => {
  const response = await axiosInstance.get(`assessments/${id}`);
  return response.data;
};

const getAllAssessmentApi = async () => {
  const response = await axiosInstance.get(`assessments`);
  return response.data;
};

const createAssessmentApi = async (body) => {
  const response = await axiosInstance.post(`assessments`, body);
  return response.data;
};

const updateAssessmentApi = async (id, body) => {
  const response = await axiosInstance.put(`assessments/${id}`, body);
  return response.data;
};

const updateAssessmentStatusApi = async (id, status, body = null) => {
  const response = await axiosInstance.put(
    `assessments/${id}/updateAssessmentStatus`,
    { ...body, status }
  );
  return response.data;
};

const deleteAssessmentApi = async (id) => {
  const response = await axiosInstance.delete(`assessments/${id}`);
  return response.data;
};

// Get application
const getAssessmentByUuidApi = async (uuid) => {
  const response = await axiosInstance.get(`assessments/${uuid}`);
  return response.data;
};

const calculateProrataDisbursementApi = async (uuid, body) => {
  const response = await axiosInstance.post(
    `assessments/calculate-disbursement/${uuid}`,
    body
  );
  return response.data;
};

const assignAssessmentUser = async (data) => {
  const response = await axiosInstance.post(`assign-assessment-user`, data);

  return response.data;
};


const assessmentService = {
  getAssessmentsApi,
  getAssessmentApi,
  createAssessmentApi,
  updateAssessmentApi,
  deleteAssessmentApi,
  updateAssessmentStatusApi,
  getAllAssessmentApi,
  calculateProrataDisbursementApi,
  getAssessmentByUuidApi,
  assignAssessmentUser
};

export default assessmentService;
