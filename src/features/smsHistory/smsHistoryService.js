import axiosInstance from "../api/axiosInstance";

const getAllSms = async (params, url = "sms-histories") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const smsHistoryService = {
  getAllSms,
};

export default smsHistoryService;
