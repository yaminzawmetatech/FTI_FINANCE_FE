import axiosInstance from "../api/axiosInstance";

const getAllKpayNotifications = async (params, url = "kpay-notifications") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const kpayNotificationService = {
  getAllKpayNotifications,
};

export default kpayNotificationService;
