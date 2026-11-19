import axiosInstance from "core/services/api/axiosInstance";

const getFileAttachesApi = async (params, url = "file-attaches") => {
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

const createFileAttachApi = async (body) => {
  const response = await axiosInstance.post(`file-attaches`, body);
  return response.data;
};

const getDocumentTypesApi = async (table_name, params = null) => {
  const response = await axiosInstance.get("document-accesses", {
    params: {
      ...params,
      table_name,
    },
  });
  return response.data;
};

const deleteFileAttachApi = async (id) => {
  const response = await axiosInstance.delete(`file-attaches/${id}`);
  return response.data;
}

const getCustomerApplicationAttachment = async (id) => {
  const response = await axiosInstance.get(`get-images-by-customer-web-id/${id}`);
  return response.data;
};

const fileAttachService = {
  getFileAttachesApi,
  createFileAttachApi,
  getDocumentTypesApi,
  deleteFileAttachApi,
  getCustomerApplicationAttachment
};

export default fileAttachService;
