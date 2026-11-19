import axiosInstance from "core/services/api/axiosInstance";

const getGenerateLedger = async (params, url = "applications") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const generateLedgerService = {
  getGenerateLedger,
};

export default generateLedgerService;
