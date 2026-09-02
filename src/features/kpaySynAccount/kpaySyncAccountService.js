import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}get-kpay-accounting-records-to-sync`;


const getKpaySyncAccounts = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const syncKpayAccounts = async (url = "sync-kpay-accounting-records") => {
  const response = await axiosInstance.get(url);
  return response.data;
};


const kpaySyncService = {
  getKpaySyncAccounts,
  syncKpayAccounts
};

export default kpaySyncService;
