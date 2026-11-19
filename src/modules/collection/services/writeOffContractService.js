import axiosInstance from "core/services/api/axiosInstance";

const updateWriteOffContract = async (body, id) => {
  const response = await axiosInstance.put(
    `write-off-contracts/${id}`,
    body
  );
  return response.data;
};

const getWriteOffContractByUuid = async (uuid) => {
  const response = await axiosInstance.get(`get-write-off-contract/${uuid}`);
  return response.data;
};

const writeOffContractService = {
  getWriteOffContractByUuid,
  updateWriteOffContract,
};

export default writeOffContractService;
