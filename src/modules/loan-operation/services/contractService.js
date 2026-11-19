import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}contracts`;
const EP_URL = `${base_url}contracts-exceed-payments`;
const RP_URL = `${base_url}refund-payment`;

const getContracts = async (params) => {
  const response = await axiosInstance.get(API_URL,
    {
      params: {
        ...params,
        // 'is_generated_gl' : true,
        limit: +params?.limit || 50,
      },
    }
  );
  return response.data;
};

const getContractList = async (params) => {
  const response = await axiosInstance.get("get-contract-list",
    {
      params: {
        ...params,
        // 'is_generated_gl' : true,
        limit: +params?.limit || 50,
      },
    }
  );
  return response.data;
};


const getContractsStampDuty = async (params) => {
  const response = await axiosInstance.get(API_URL,
    {
      params: {
        ...params
      },
    }
  );
  return response.data;
};

const getContractsForReminderAllocation = async (params) => {
  const response = await axiosInstance.get("contracts-reminder-allocations",
    {
      params: {
        ...params,
        // 'is_generated_gl' : true,
        limit: +params?.limit || 50,
      },
    },

  );
  return response.data;
};

const getContractByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL + "/" + uuid);
  return response.data;
};

const deleteContracts = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);

  return response.data;
};

const updateContractByUuid = async (id, data) => {
  const response = await axiosInstance.put(API_URL + "/" + id, data);

  return response.data;
};

const updateContractByUuidAdmin = async (id, body) => {
  const response = await axiosInstance.put("admin-contract-update" + "/" + id, body);

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

const createContracts = async (data) => {
  const response = await axiosInstance.post(API_URL, data);

  return response.data;
};

const getReminderAllocationCounts = async (params) => {
  const response = await axiosInstance.get(`${base_url}contract-for-reminder-allocation-count`, {
    params: {
      ...params,
    },
  });

  return response.data;
};

const getActualPaymentLinesByContractId = async (id) => {
  const response = await axiosInstance.get(`${base_url}actual-payment-lines-for-credit` + "/" + id);
  return response.data;
};

const updateContractDisbursement = async (data) => {
  const response = await axiosInstance.post(`${API_URL}/request-for-disbursement`, data);
  return response.data;
};

const getExceedPayments = async (params) => {
  const response = await axiosInstance.get(EP_URL,
    {
      params: {
        ...params,
        // 'is_generated_gl' : true,
        limit: +params?.limit || 50,
      },
    }
  );
  return response.data;
};

const refundPayments = async (data) => {
  const response = await axiosInstance.post(RP_URL, data);

  return response.data;
};

const getExceedBankStatement = async (params, url = "get-exceed-bank-statement") => {
  const response = await axiosInstance.get(url, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const updateAPLByUuid = async (uuid, data) => {
  const response = await axiosInstance.post(`update-each-actualPaymentLine/${uuid}`, data);

  return response.data;
};

const getGeneralLedgerSyncedData = async (id) => {
  const response = await axiosInstance.get(`get-general-ledger-synced-data/${id}`);
  return response.data;
};

const contractService = {
  createContracts,
  getContracts,
  deleteContracts,
  updateContractByUuid,
  getContractByUuid,
  generatedGLContractByContractIds,
  getContractsForReminderAllocation,
  getReminderAllocationCounts,
  getContractsStampDuty,
  getActualPaymentLinesByContractId,
  updateContractDisbursement,
  getExceedPayments,
  refundPayments,
  getExceedBankStatement,
  getContractList,
  updateAPLByUuid,
  getGeneralLedgerSyncedData,
  updateContractByUuidAdmin
};

export default contractService;
