import axiosInstance from "core/services/api/axiosInstance";

// Get application
const getApplication = async (params, url = "applications") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

// Get application
const getApplicationByUuid = async (uuid) => {
  const response = await axiosInstance.get(`applications/${uuid}`);
  return response.data;
};

// Get application
const updateApplicationByUuid = async (uuid, body) => {
  const response = await axiosInstance.put(`applications/${uuid}`, body);
  return response.data;
};

const createApplicationApi = async (body) => {
  const response = await axiosInstance.post(`applications`, body);
  return response.data;
};

const sendToCreditManagerApplicationApi = async (uuid) => {
  const response = await axiosInstance.get(
    `applications/${uuid}/send-to-credit-manager`
  );
  return response.data;
};

const cancelApplicationByUuid = async (uuid, body) => {
  const response = await axiosInstance.put(
    `applications/${uuid}/cancelApplication`,
    body
  );
  return response.data;
};

const getApplicationStatusCount = async (
  params,
  url = "get-application-counts"
) => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
    },
  });
  return response.data;
};

const getLoanOperaitonApplicationCountApi = async () => {
  const response = await axiosInstance.get(`applications/count-by/disbursed`);
  return response.data;
};

const getLoanOperaitonApplicationCountBeforeContract = async (params) => {
  const response = await axiosInstance.get(`loan-application-counts`,{ params: {
    ...params,
  },});
  return response.data;
};

const checkExistingCustomer = async (body) => {
  const response = await axiosInstance.post(`check-customer-nrc`, body);
  return response.data;
};

const calculateProrataDisbursement = async (uuid,body) => {
  const response = await axiosInstance.post(`loan-detail/calculate-disbursement/${uuid}`, body);
  return response.data;
};

const syncToGuarantorReference = async (type,id) => {
  const response = await axiosInstance.post(`sync-mnet-information/${type}/${id}`);
  return response.data;
};

const syncToGuarantor = async (id,application_id) => {
  const response = await axiosInstance.post(`sync-guarantor-information/${id}`, {application_id: application_id});
  return response.data;
};


const fetchMnetAttachments = async (uuid,verbose) => {
  const response = await axiosInstance.get(`process-mnet-application-attachments/${uuid}`,{
    params: {
              verbose : verbose
            }
  });
  return response.data;
};

const lockApplication = async (data) => {
  const response = await axiosInstance.post(`application-lock`, data);
  return response.data;
};

const checkLocked = async (data) => {
  const response = await axiosInstance.post(`check-application-edit-permission`, data);
  return response.data;
};

const applicationCompleteFlagChange = async (data) => {
  const response = await axiosInstance.post(`change-application-complete-point`, data);
  return response.data;
}
const applicationCompleteSignature = async (uuid) => {
  const response = await axiosInstance.get(`applications/${uuid}/complete-signature`);
  return response.data;
};

const getApplicationSignatures = async (id) => {
  const response = await axiosInstance.get(`get-signature-list/${id}`);
  return response.data;
};

const invoiceSendToCMCOFlagChange = async (data) => {
  const response = await axiosInstance.post(`send-to-cmco`, data);
  return response.data;
}

const applicationService = {
  getApplication,
  getApplicationByUuid,
  updateApplicationByUuid,
  createApplicationApi,
  sendToCreditManagerApplicationApi,
  cancelApplicationByUuid,
  getApplicationStatusCount,
  getLoanOperaitonApplicationCountApi,
  checkExistingCustomer,
  calculateProrataDisbursement,
  syncToGuarantorReference,
  fetchMnetAttachments,
  lockApplication,
  checkLocked,
  syncToGuarantor,
  getLoanOperaitonApplicationCountBeforeContract,
  applicationCompleteFlagChange,
  applicationCompleteSignature,
  getApplicationSignatures,
  invoiceSendToCMCOFlagChange,
};

export default applicationService;
