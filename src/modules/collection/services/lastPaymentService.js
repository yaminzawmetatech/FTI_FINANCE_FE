import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}last-payment-set-up`;

const getLastPayments = async (params, allFlag) => {
  let response;
  if (!allFlag) {
    response = await axiosInstance.get(API_URL, {
      params: {
        ...params,
        limit: +params?.limit || 50,
      },
    });
  } else {
    response = await axiosInstance.get(API_URL, {
      params: {
        ...params,
      },
    });
  }
 
  return response.data;
};

const getLastPaymentHistory = async (params, allFlag) => {
  let response;
  if (!allFlag) {
    response = await axiosInstance.get("last-payment-history", {
      params: {
        ...params,
        limit: +params?.limit || 50,
      },
    });
  } else {
    response = await axiosInstance.get("last-payment-history", {
      params: {
        ...params,
      },
    });
  }
 
  return response.data;
};

const deleteLastPayment = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateLastPayment = async (id, data) => {
  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );
  return response.data;
};

const createLastPayment = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};


const LastPaymentService = {
  createLastPayment,
  deleteLastPayment,
  updateLastPayment,
  getLastPayments,
  getLastPaymentHistory
};

export default LastPaymentService;
