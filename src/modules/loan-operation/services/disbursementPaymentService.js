import axiosInstance from "core/services/api/axiosInstance";

const createDisbursementPayment = async (body) => {
  const response = await axiosInstance.post(`disbursement-payments`, body);
  return response.data;
};

const updateDisbursementPayment = async (body, uuid) => {
  const response = await axiosInstance.put(
    `disbursement-payments/${uuid}`,
    body
  );
  return response.data;
};

const changeStatusDisbursementPayment = async (status, uuid) => {
  const response = await axiosInstance.post(
    `disbursement-payments-approved-rejected/${uuid}`,
    {
      status,
    }
  );
  return response.data;
};

const postDisbursementPayment = async (uuid) => {
  const response = await axiosInstance.post(
    `disbursement-payments-posted/${uuid}`
  );
  return response.data;
};

const settledDisbursementPayment = async (body, uuid) => {
  const response = await axiosInstance.post(
    `disbursement-payments-settlement/${uuid}`,
    body
  );
  return response.data;
};

const getAllDisbursementPayments = async (params, url = "disbursement-payments") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getDisbursementPaymentByUuid = async (uuid) => {
  try {
    const response = await axiosInstance.get('/disbursement-payments/' + uuid);
    return response.data;
  } catch (error) {
    console.error("Error fetching disbursement payment by UUID:", error);
    throw error;
  }
};


const disbursementPaymentService = {
  createDisbursementPayment,
  getAllDisbursementPayments,
  getDisbursementPaymentByUuid,
  changeStatusDisbursementPayment,
  updateDisbursementPayment,
  postDisbursementPayment,
  settledDisbursementPayment,
};

export default disbursementPaymentService;
