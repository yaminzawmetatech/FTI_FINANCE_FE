import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}general-ledger-entry-setups`
const RPMT_URL = `${base_url}repayment-amount-types`
const RPDT_URL = `${base_url}repayment-date-types`
const ACT_URL = `${base_url}account-types`
const AMT_URL = `${base_url}amount-types`
const TST_URL = `${base_url}transaction-types`

// Get Data
const getGeneralLedgerEntrySetup = async () => {
  const response = await axiosInstance.get(API_URL)
  return response.data
}

// Create 
const createGeneralLedgerEntrySetup = async (data) => {
  const response = await axiosInstance.post(API_URL, data)
  return response.data
}

// update
const updateGeneralLedgerEntrySetup = async (uuid, body) => {
  const response = await axiosInstance.post(API_URL + '/' + uuid, {
    ...body,
    _method: 'PUT'
  });
  return response.data;
}


// Delete 
const deleteGeneralLedgerEntrySetup = async (id) => {
  const response = await axiosInstance.delete(API_URL +'/'+ id)
  return response.data
}

const getGeneralLedgerEntrySetupByUuid = async (uuid) => {
  const response = await axiosInstance.get(`${API_URL}`, {
    params: { uuid: uuid }
  });
  return response.data;
};


// Get Data
const getGeneralRepaymentAmountTypes = async () => {
  const response = await axiosInstance.get(RPMT_URL)
  return response.data
}

const getGeneralRepaymentDateTypes = async () => {
  const response = await axiosInstance.get(RPDT_URL)
  return response.data
}

// Get Data
const getGeneralAccountTypes = async () => {
  const response = await axiosInstance.get(ACT_URL)
  
  return response.data
}

// Get Data
const getGeneralAmountTypes = async () => {
  const response = await axiosInstance.get(AMT_URL)
  
  return response.data
}

// Get Data
const getGeneralTransactionTypes = async () => {
  const response = await axiosInstance.get(TST_URL)
  
  return response.data
}



const generalLedgerEntrySetupService = {
  getGeneralLedgerEntrySetup,
  createGeneralLedgerEntrySetup,
  updateGeneralLedgerEntrySetup,
  deleteGeneralLedgerEntrySetup,
  getGeneralLedgerEntrySetupByUuid,
  getGeneralRepaymentAmountTypes,
  getGeneralAccountTypes,
  getGeneralAmountTypes,
  getGeneralTransactionTypes,
  getGeneralRepaymentDateTypes
}

export default generalLedgerEntrySetupService
