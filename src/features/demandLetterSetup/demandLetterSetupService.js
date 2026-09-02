import axiosInstance from "../api/axiosInstance";

const getDemandLetterTemplateParameters = async (url = "get-template-fields") => {
  const response = await axiosInstance.get(url);
  return response.data;
};

const getAllDemandLetterSetups = async (url = "demand-letter-setups") => {
  const response = await axiosInstance.get(url);
  return response.data;
};

const createDemandLetterSetup = async (body, url = "demand-letter-setups") => {
  const response = await axiosInstance.post(url, body);
  return response.data;
};

const updateDemandLetterSetupByUuid = async (id, body) => {
    const response = await axiosInstance.put(`demand-letter-setups/${id}`, body);
    return response.data;
};

const getDemandLetterSetup = async (uuid, url = "demand-letter-setups") => {
    const response = await axiosInstance.get(`${url}/${uuid}`);
    return response.data;
}

const deleteDemandLetterSetups = async (uuid, url = "demand-letter-setups") => {
    const response = await axiosInstance.delete(`${url}/${uuid}`);
    return response.data;
}

const demandLetterSetupsService = {
    getDemandLetterTemplateParameters,
    getAllDemandLetterSetups,
    getDemandLetterSetup,
    createDemandLetterSetup,
    updateDemandLetterSetupByUuid,
    deleteDemandLetterSetups
};
  
  export default demandLetterSetupsService;