import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL


// Get permission sets data
const getAllPenaltyLogs = async (params) => {
  const response = await axiosInstance.get('/penalty-logs', {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
}

const calculatePenalties = async (body) => {
  const response = await axiosInstance.post("/test-command", body);
  return response.data;
};

const readPenaltyLog = async (file_name) => {
  const response = await axiosInstance.get(`read-log/${file_name}`);
  return response.data;
};

const penaltyLogService = {
  readPenaltyLog,
  getAllPenaltyLogs,
  calculatePenalties
}


export default penaltyLogService
