import axiosInstance from "core/services/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}credit-criteria-keys`;

const getCreditCriteria = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });

  return response.data;
};

const getAllCreditCriteriaHistory = async (params) => {
  const response = await axiosInstance.get(`${base_url}all-credit-criteria`, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });

  return response.data;
};

const getCreditCriteriaVersions = async (id) => {
  const response = await axiosInstance.get(`${base_url}get-value-history/${id}`);

  return response.data;
};

const getAllCreditCriteria = async (category_id,sub_category_id) => {
  let response = null;
  if(sub_category_id){
    response = await axiosInstance.get(`${base_url}credit-criteria-by-conditions/${category_id}/${sub_category_id}`);
  }else{
    response = await axiosInstance.get(`${base_url}credit-criteria-by-conditions/${category_id}`);
  }

  return response.data;
};

const getLatestCreditCriteria = async (category_id) => {
 
  const  response = await axiosInstance.get(`${base_url}latest-credit-criteria`,{
    params: {
      category_id: category_id
    }
  });

  return response.data;
};

const deleteCreditCriteria = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateCreditCriteria = async (id, newData) => {
  const response = await axiosInstance.put(API_URL + "/" + id, newData);

  return response.data;
};

const createCreditCriteriaKey = async (data) => {
  const response = await axiosInstance.post(API_URL, data);

  return response.data;
};

const createCreditCriteriaValue = async (data) => {
  const response = await axiosInstance.post(
    `${base_url}credit-criteria-values`,
    data
  );

  return response.data;
};

const updateCreditCriteriaValue = async (id, newData) => {
  const response = await axiosInstance.put( `${base_url}credit-criteria-values` + "/" + id, newData);

  return response.data;
};

const deleteCreditCriteriaValue = async (id) => {
  const response = await axiosInstance.delete(`${base_url}credit-criteria-values` + "/" + id);
  return response.data;
};

const getCreditCriteriaTypes = async () => {
  const response = await axiosInstance.get(`${base_url}credit-criteria-types`);

  return response.data;
};

const getCreditCriteriaData = async (category_id, sub_category_id, type) => {
  let response = null;
  if(sub_category_id){
    response = await axiosInstance.get(`${base_url}required-category/${category_id}/${sub_category_id}/${type}`);
  }else{
    response = await axiosInstance.get(`${base_url}required-category/${category_id}/null/${type}`);
  }

  return response.data;
};
const getCreditCriteriaParent = async (category_id, sub_category_id, type) => {
  const response = await axiosInstance.get(
    `${base_url}required-parent-category/${category_id}/${sub_category_id}/${type}`
  );

  return response.data;
};

const creditCriteriaService = {
  createCreditCriteriaKey,
  getCreditCriteria,
  deleteCreditCriteria,
  updateCreditCriteria,
  createCreditCriteriaValue,
  getCreditCriteriaTypes,
  getCreditCriteriaData,
  getCreditCriteriaParent,
  updateCreditCriteriaValue,
  deleteCreditCriteriaValue,
  getAllCreditCriteria,
  getLatestCreditCriteria,
  getCreditCriteriaVersions,
  getAllCreditCriteriaHistory
};

export default creditCriteriaService;
