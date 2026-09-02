import axiosInstance from "../api/axiosInstance";

const getAllDemandLetters = async (contract_id, params, url = "contract-demand-letters") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      contract_id: contract_id,
      limit: +params?.limit || 50,
    },});
  return response.data;
};

const createDemandLetter = async (params, url = "contract-demand-letters") => {
  const response = await axiosInstance.post(url , {
    ...params,
  });
  return response.data;
};


const demandLetterService = {
  getAllDemandLetters,
  createDemandLetter
};

export default demandLetterService;
