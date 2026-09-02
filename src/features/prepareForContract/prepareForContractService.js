import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}disbursement-contracts`;

const getPrepareForContracts = async (params) => {
  const response = await axiosInstance.get(API_URL, 
    {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  },
  
  );
  return response.data;
};


const getPrepareForContractByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL+ "/"+ uuid);
  return response.data;
};

const deletePrepareForContract = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);

  return response.data;
};


const updatePrepareForContractByUuid = async (id, data) => {
  const response = await axiosInstance.put(API_URL + "/" + id, data);

  return response.data;
};

const generatedGLContractByContractIds = async (params) => {

  const response = await axiosInstance.get(base_url + 'generate-gl', {
    params: {
      ...params,
    },
  })

  return response.data;
};

const createPrepareForContracts = async (data) => {
  const response = await axiosInstance.post(API_URL, data);

  return response.data;
};

const updatePrepareForContracts = async (data) => {
  const response = await axiosInstance.post(API_URL+"/update", data);

  return response.data;
};

const prepareForContractsService = {
  createPrepareForContracts,
  updatePrepareForContracts,
  getPrepareForContracts,
  updatePrepareForContractByUuid,
  getPrepareForContractByUuid,
  generatedGLContractByContractIds,
  deletePrepareForContract
};

export default prepareForContractsService;
