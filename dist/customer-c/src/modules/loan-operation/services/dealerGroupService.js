import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}dealer-groups`;

const getDealerGroups = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getAllDealerGroups = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
    },
  });
  return response.data;
};

const getDealerGroupsByStatus = async (status) => {
  const response = await axiosInstance.get(API_URL+'/'+status);
  return response.data;
};

const deleteDealerGroup = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateDealerGroup = async (id, data) => {
  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );
  return response.data;
};

const createDealerGroup = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};


const dealerGroupService = {
  createDealerGroup,
  getDealerGroups,
  deleteDealerGroup,
  updateDealerGroup,
  getDealerGroupsByStatus,
  getAllDealerGroups
};

export default dealerGroupService;
