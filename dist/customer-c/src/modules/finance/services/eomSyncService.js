import axiosInstance from "core/services/api/axiosInstance";

const getAllSyncEOM = async (id, params, url = "get-records-by-log-entry-id") => {
  const response = await axiosInstance.get(url+"/"+id ,{
    params: {
      ...params,
      limit: +params?.limit || 50,
    },});
  return response.data;
};

const syncEOM = async (id, url = "sync-record") => {
  const response = await axiosInstance.get(url+"/"+id);
  return response.data;
};


const eomSyncService = {
  getAllSyncEOM,
  syncEOM
};

export default eomSyncService;
