import axiosInstance from "../api/axiosInstance";

const createBookingProcess = async (body) => {
  
  const response = await axiosInstance.post(`booking-processes`, body);
  return response.data;
};

const updateBookingProcess = async (body) => {
  
  const response = await axiosInstance.put(`booking-processes`, body);
  return response.data;
};

const getAllBookingProcesses = async (params, url = "booking-processes") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getBookingByUuid = async (uuid) => {
  const response = await axiosInstance.get(`booking-processes/${uuid}`);
  return response.data;
};

const bookingProcessService = {
  createBookingProcess,
  getAllBookingProcesses,
  updateBookingProcess,
  getBookingByUuid
};

export default bookingProcessService;
