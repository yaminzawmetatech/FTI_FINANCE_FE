import axiosInstance from "../api/axiosInstance";

const createInsurancePayment = async (body) => {
  const response = await axiosInstance.post(`insurance-payments`, body);
  return response.data;
};

const updateInsurancePayment = async (body, uuid) => {
  const response = await axiosInstance.put(
    `insurance-payments/${uuid}`,
    body
  );
  return response.data;
};

const changeStatusInsurancePayment = async (status, uuid) => {
  const response = await axiosInstance.post(
    `insurance-payments-approved-rejected/${uuid}`,
    { status }
  );
  return response.data;
};

const postInsurancePayment = async (uuid) => {
  const response = await axiosInstance.post(
    `insurance-payments-posted/${uuid}`
  );
  return response.data;
};

const settledInsurancePayment = async (body, uuid) => {
  const response = await axiosInstance.post(
    `insurance-payments-settlement/${uuid}`,
    body
  );
  return response.data;
};

const getAllInsurancePayments = async (params, url = "insurance-payments") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getInsurancePaymentByUuid = async (uuid) => {
  try {
    const response = await axiosInstance.get('/insurance-payments/' + uuid);
    return response.data;
  } catch (error) {
    console.error("Error fetching insurance payment by UUID:", error);
    throw error;
  }
};

const insurancePaymentService = {
  createInsurancePayment,
  getAllInsurancePayments,
  getInsurancePaymentByUuid,
  changeStatusInsurancePayment,
  updateInsurancePayment,
  postInsurancePayment,
  settledInsurancePayment,
};

export default insurancePaymentService;
