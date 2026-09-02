import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}dealer-packages`;

// Fetch dealer packages with optional pagination and filters
const getDealerPackages = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

// Fetch all dealer packages without pagination
const getAllDealerPackages = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
    },
  });
  return response.data;
};

// Fetch dealer packages by dealer ID
const getDealerPackagesByDealerId = async (dealerId) => {
  const response = await axiosInstance.get(`${API_URL}/dealer/${dealerId}`);
  return response.data;
};

// Fetch dealer packages by dealer ID
const getDealerPackagesById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

// Delete a specific dealer package by ID
const deleteDealerPackage = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};

// Update a dealer package by ID
const updateDealerPackage = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_URL}/${id}`,
    data,
  );
  return response.data;
};

// Create a new dealer package
const createDealerPackage = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

const dealerPackageService = {
  createDealerPackage,
  getDealerPackages,
  deleteDealerPackage,
  updateDealerPackage,
  getDealerPackagesByDealerId,
  getAllDealerPackages,
  getDealerPackagesById
};

export default dealerPackageService;
