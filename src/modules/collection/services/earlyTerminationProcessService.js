import axiosInstance from "core/services/api/axiosInstance";

const createEarlyTerminationProcess = async (body) => {
  const response = await axiosInstance.post(`early-termination-process`, body);
  return response.data;
};

const updateEarlyTerminationProcess = async (body, uuid) => {
  const response = await axiosInstance.put(`early-termination-process/${uuid}`, body);
  return response.data;
};

const changeStatusEarlyTerminationProcess = async (status, uuid, id) => {
  const response = await axiosInstance.put(
    status === "Request For Approval"
      ? `early-termination-process/request-for-approval/${uuid}`
      : `early-termination-process/approved/${uuid}`
  );
  return response.data;
};

const getAllEarlyTerminationProcesses = async (
  params,
  url = "early-termination-process"
) => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const deleteEarlyTerminationProcess = async ( uuid) => {
  const response = await axiosInstance.delete(`early-termination-process/${uuid}`);
  return response.data;
};


const getEarlyTerminationProcessByUuid = async (uuid) => {
  const response = await axiosInstance.get(`early-termination-process/${uuid}`);
  return response.data;
};

const earlyTerminationProcessService = {
  createEarlyTerminationProcess,
  getAllEarlyTerminationProcesses,
  getEarlyTerminationProcessByUuid,
  changeStatusEarlyTerminationProcess,
  updateEarlyTerminationProcess,
  deleteEarlyTerminationProcess
};

export default earlyTerminationProcessService;
