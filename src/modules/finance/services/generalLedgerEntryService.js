import axiosInstance from "core/services/api/axiosInstance";

const getAllGeneralLedgerEntries = async (params, url = "general-ledger-entries") => {
  const response = await axiosInstance.get(url,{
    params: {
      ...params,
      limit: +params?.limit || 50,
    },});
  return response.data;
};

const syncGeneralLedgerEntries = async (params, url = "general-ledger-entries-sync") => {
  const response = await axiosInstance.get(url);
  return response.data;
};


const generalLedgerEntryService = {
  getAllGeneralLedgerEntries,
  syncGeneralLedgerEntries
};

export default generalLedgerEntryService;
