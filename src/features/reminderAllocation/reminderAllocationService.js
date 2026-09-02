import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}reminder-allocations`;

const getReminderAllocations = async (params) => {
  const response = await axiosInstance.get(API_URL, 
    {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  },
  
  );
  return response.data;
};

const getReminderAllocationHistoryByContractId = async (params) => {
  const response = await axiosInstance.get(API_URL, 
    {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  },
  
  );
  return response.data;
};

const getContractByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL+ "/"+ uuid);
  return response.data;
};

const deleteReminderAllocationByUuid = async (uuid) => {
  const response = await axiosInstance.delete(API_URL + "/" + uuid);

  return response.data;
};

const updateReminderAllocationByUuid = async (uuid, body) => {
  const response = await axiosInstance.put(API_URL + "/" + uuid, body);

  return response.data;
};

const createReminderAllocation = async (body) => {
  const response = await axiosInstance.post(API_URL, body);

  return response.data;
};

const reAssignReminderAllocation = async (body) => {
  const response = await axiosInstance.post(API_URL+"/reassign", body);

  return response.data;
};

const getReminderAllocationByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL + "/" + uuid);

  return response.data;
};

const getReminderAllocationByContractId = async (id) => {
  const response = await axiosInstance.get("reminder-allocations-contract-id" + "/" + id);

  return response.data;
};

const getAllocatedReminderCounts = async (params) => {
  const response = await axiosInstance.get(`${base_url}reminder-allocation-count`,   {
    params: {
      ...params,
    },
  });

  return response.data;
};

const reminderAllocationService = {
  createReminderAllocation,
  getReminderAllocations,
  deleteReminderAllocationByUuid,
  updateReminderAllocationByUuid,
  getContractByUuid,
  getReminderAllocationByUuid,
  getReminderAllocationByContractId,
  reAssignReminderAllocation,
  getReminderAllocationHistoryByContractId,
  getAllocatedReminderCounts
};

export default reminderAllocationService;
