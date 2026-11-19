import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}credit-schemes`;

// Get Credit Schemes
const getAllCreditSchemes = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
    },
  });

  return response.data;
};

// Get Credit Schemes
const getCreditSchemes = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });

  return response.data;
};

const updateCreditScheme = async (id, newData) => {
  const response = await axiosInstance.put(
    `${API_URL}/${id}`
    , {
      ...newData
    });
  return response.data;
}

const createCreditScheme = async (body) => {
  const response = await axiosInstance.post(
    API_URL,
    body
  )
  return response.data;
}

const deleteCreditScheme = async (id) => {
  const response = await axiosInstance.delete(
    `${API_URL}/${id}`
  );
  return response.data;
}

const creditSchemeService = {
  getAllCreditSchemes,
  getCreditSchemes,
  updateCreditScheme,
  createCreditScheme,
  deleteCreditScheme
};

export default creditSchemeService;
