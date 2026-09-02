import axiosInstance from "../api/axiosInstance";

const createInsufficientPaymentBatch = async (body) => {
  const response = await axiosInstance.post(`insufficient-contracts-batch`, body);
  return response.data;
};

const updateInsufficientPaymentBatch = async (body, uuid) => {
  const response = await axiosInstance.put(
    `insufficient-contracts-batch/${uuid}`,
    body
  );
  return response.data;
};

const removeInsufficientPaymentContract = async (contract_id) => {
  const response = await axiosInstance.post(`insufficient-contracts/remove`,
    {
      contract_id,
    });
  return response.data;
};

// const changeStatusInsufficientPaymentBatch = async (status, uuid) => {
//   const response = await axiosInstance.post(
//     `update/${uuid}/write-off-contract-status`,
//     {
//       status,
//     }
//   );
//   return response.data;
// };

const changeStatusInsufficientPaymentBatch = async (status, uuid) => {
  const endpoint =
    status === "Request For Approval"
      ? `insufficient-contracts-batch/request-for-approval/${uuid}`
      : `insufficient-contracts-batch/approved/${uuid}`;
  const response = await axiosInstance.put(endpoint);
  return response.data;
};

const changeRejectStatusInsufficientPaymentBatch = async ( uuid) => {
  const response = await axiosInstance.put(`insufficient-contracts-batch/rejected/${uuid}`,);
  return response.data;
};


const getAllInsufficientPaymentBatchs = async (params, url = "insufficient-contracts-batch") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getInsufficientPaymentBatchByUuid = async (uuid) => {
  const response = await axiosInstance.get(`insufficient-contracts-batch/${uuid}`);
  return response.data;
};

const applyInsufficientPayment = async (uuid) => {
  const response = await axiosInstance.post(
    `insufficient-contracts/apply/${uuid}`
  );
  return response.data;
};

const insufficientPaymentBatchService = {
  createInsufficientPaymentBatch,
  getAllInsufficientPaymentBatchs,
  getInsufficientPaymentBatchByUuid,
  changeStatusInsufficientPaymentBatch,
  updateInsufficientPaymentBatch,
  removeInsufficientPaymentContract,
  applyInsufficientPayment,
  changeRejectStatusInsufficientPaymentBatch
};

export default insufficientPaymentBatchService;
