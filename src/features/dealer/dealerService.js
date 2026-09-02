import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}dealers`;

const getDealers = async (params, allFlag) => {
  let response;
  if(!allFlag){
    response = await axiosInstance.get(API_URL, {
      params: {
        ...params,
        limit: +params?.limit || 50,
      },
    });
  } else {
    response = await axiosInstance.get(API_URL, {
      params: {
        ...params,
      },
    });
  }
  
  return response.data;
};

const getDealerByDealerType = async (dealerTypes) => {
  // Convert dealerTypes array to a JSON string for the query parameter
  const params = { dealer_types: JSON.stringify(dealerTypes) };

  const response = await axiosInstance.get(API_URL, { params });
  return response.data;
};


const getDealersByUserRole = async (params) => {

  const response = await axiosInstance.get(`get-dealer-by-userRole`,{
    params: {
      ...params,
    },
  });
  return response.data;
};

const deleteDealer = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const getDealerByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL + "/" + uuid);
  return response.data;
};

const updateDealer = async (id, data) => {
  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );
  return response.data;
};

const createDealer = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

const createGuaranteeData = async (data) => {
  const response = await axiosInstance.post(`dealer-guarantees`, data);
  return response.data;
};

const getGuaranteeData = async (params) => {
  const response = await axiosInstance.get(`dealer-guarantees`, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const updateGuaranteeData = async (id, data) => {
  const response = await axiosInstance.put(
    `dealer-guarantees/${id}`,
    data,
  );
  return response.data;
};

const deleteGuaranteeData = async (id) => {
  const response = await axiosInstance.delete(
    `dealer-guarantees/${id}`
  );
  return response.data;
};

const batchDeleteGuaranteeData = async (ids) => {

  const response = await axiosInstance.post(
    `dealer-guarantee-multi-delete`, ids);

  return response.data;
};

const getGuaranteeDataCount = async (params) => {
  const response = await axiosInstance.get(`dealer-guarantees-count`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

const dealerService = {
  createDealer,
  getDealers,
  deleteDealer,
  updateDealer,
  getDealersByUserRole,
  createGuaranteeData,
  getGuaranteeData,
  updateGuaranteeData,
  getDealerByUuid,
  deleteGuaranteeData,
  batchDeleteGuaranteeData,
  getDealerByDealerType,
  getGuaranteeDataCount
};

export default dealerService;
