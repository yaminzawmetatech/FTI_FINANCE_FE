import axiosInstance from "core/services/api/axiosInstance";

const getIncompleteFields = async (id) => {
  const response = await axiosInstance.get(`incomplete-fields`, 
  {
    params: {
      application_id : id
    },
  },
  );
  return response.data;
}

const getKPayFields = async (uuid) => {
  const response = await axiosInstance.get(`applications/${uuid}/kpay-fields`);
  return response.data;
}

const saveIncompleteFields = async (body) => {
  const response = await axiosInstance.post(`incomplete-fields`, body);
  return response.data;
};

const updateIncompleteFields = async (uuid,body) => {
  const response = await axiosInstance.put(`incomplete-fields/${uuid}`, body);
  return response.data;
};

const notifyIncompleteFields = async (uuid) => {
  const response = await axiosInstance.put(`applications/${uuid}/send-notification`);
  return response.data;
};

const incompleteFieldsService = {
  getIncompleteFields,
  getKPayFields,
  saveIncompleteFields,
  updateIncompleteFields,
  notifyIncompleteFields
}


export default incompleteFieldsService
