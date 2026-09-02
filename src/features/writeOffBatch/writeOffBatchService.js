import axiosInstance from "../api/axiosInstance";

const createWriteOffBatch = async (body) => {
  const response = await axiosInstance.post(`write-off-contracts`, body);
  return response.data;
};

const updateWriteOffBatch = async (body,uuid) => {
  const response = await axiosInstance.put(
    `write-offs/${uuid}/update-many`,
    body
  );
  return response.data;
};

const removeWriteOffContract = async (writeOffUuid, contractUuid) => {
  const response = await axiosInstance.post(
    `write-off-preparations/${writeOffUuid}/write-off-contracts/${contractUuid}/delete`,
  );
  return response.data;
};

const updateWriteOffAmounts = async (prepareData, uuid) => {
  const response = await axiosInstance.put(
    `write-offs/${uuid}`,
    prepareData
  );
  return response.data;
};

const changeStatusWriteOffBatch = async (status, uuid) => {
  const response = await axiosInstance.post(
    `update/${uuid}/write-off-contract-status`,
    {
      status,
    }
  );
  return response.data;
};

const getAllWriteOffBatchs = async (params, url = "write-offs") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getWriteOffBatchByUuid = async (uuid) => {
  const response = await axiosInstance.get(`write-offs/${uuid}`);
  return response.data;
};

const postWriteOff = async (uuid) => {
  const response = await axiosInstance.post(
    `write-offs-posted/${uuid}`
  );
  return response.data;
};

const writeOffBatchService = {
  createWriteOffBatch,
  getAllWriteOffBatchs,
  getWriteOffBatchByUuid,
  changeStatusWriteOffBatch,
  updateWriteOffBatch,
  updateWriteOffAmounts,
  removeWriteOffContract,
  postWriteOff,
};

export default writeOffBatchService;
