import axiosInstance from "../api/axiosInstance";

const createStampDutyPayment = async (body) => {
  const response = await axiosInstance.post(`stamp-duty-payments`, body);
  return response.data;
};

const updateStampDutyPayment = async (body, uuid) => {
  const response = await axiosInstance.put(
    `stamp-duty-payments/${uuid}`,
    body
  );
  return response.data;
};

const changeStatusStampDutyPayment = async (status, uuid) => {
  const response = await axiosInstance.post(
    `stamp-duty-payments-approved-rejected/${uuid}`,
    {
      status,
    }
  );
  return response.data;
};

const postStampDutyPayment = async (uuid) => {
  const response = await axiosInstance.post(
    `stamp-duty-payments-posted/${uuid}`
  );
  return response.data;
};

const settledStampDutyPayment = async (body, uuid) => {
  const response = await axiosInstance.post(
    `stamp-duty-payments-settlement/${uuid}`,
    body
  );
  return response.data;
};

const getAllStampDutyPayments = async (params, url = "stamp-duty-payments") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getStampDutyPaymentByUuid = async (uuid) => {
  const response = await axiosInstance.get(`stamp-duty-payments/${uuid}`);
  return response.data;
};

const getGeneralLedgerEnteriesSyncPost = async (params, url = "get-general-ledger-entries-sync-post") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const stampDutyPaymentService = {
  createStampDutyPayment,
  getAllStampDutyPayments,
  getStampDutyPaymentByUuid,
  changeStatusStampDutyPayment,
  updateStampDutyPayment,
  postStampDutyPayment,
  settledStampDutyPayment,
  getGeneralLedgerEnteriesSyncPost
};

export default stampDutyPaymentService;
