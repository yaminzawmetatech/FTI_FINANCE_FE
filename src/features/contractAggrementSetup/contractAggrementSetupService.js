import axiosInstance from "../api/axiosInstance";

const getContractTemplateParameters = async (url = "get-template-parameters") => {
  const response = await axiosInstance.get(url);
  return response.data;
};

const getContractAggrementSetups = async (url = "contract-agreement-setups") => {
  const response = await axiosInstance.get(url);
  return response.data;
};

const createContractAggrementSetup = async (body, url = "contract-agreement-setups") => {
  const response = await axiosInstance.post(url, body);
  return response.data;
};

const updateContractAggrementSetup = async (id, body) => {
    const response = await axiosInstance.put(`contract-agreement-setups/${id}`, body);
    return response.data;
};

const getContractAggrementSetup = async (uuid, url = "contract-agreement-setups") => {
    const response = await axiosInstance.get(`${url}/${uuid}`);
    return response.data;
}

const deleteContractAgreementSetup = async (uuid, url = "contract-agreement-setups") => {
    const response = await axiosInstance.delete(`${url}/${uuid}`);
    return response.data;
}

const contractAggrementSetupService = {
    getContractTemplateParameters,
    getContractAggrementSetups,
    getContractAggrementSetup,
    createContractAggrementSetup,
    updateContractAggrementSetup,
    deleteContractAgreementSetup

};
  
  export default contractAggrementSetupService;