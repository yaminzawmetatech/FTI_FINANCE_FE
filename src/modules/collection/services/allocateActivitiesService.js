import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}allocate-activities`;

// Get
const getAllocateActivities = async ( params = null) => {

  const response = await axiosInstance.get(API_URL);

  return response.data;
};

// Delete
const deleteAllocateActivity = async (uuid) => {
  const response = await axiosInstance.delete(API_URL + "/" + uuid);
  return response.data;
};

// update
const updateAllocateActivity = async (id, data) => {

  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );

  return response.data;
};

// Create
const createAllocateActivity = async (data) => {
  const response = await axiosInstance.post(API_URL, data,);

  return response.data;
};


const allocateActivityService = {
  getAllocateActivities,
  createAllocateActivity,
  updateAllocateActivity,
  deleteAllocateActivity,
};

export default allocateActivityService;
