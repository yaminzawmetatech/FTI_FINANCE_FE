import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}refinance-customers`;

const getRefinanceCustomers = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const deleteRefinanceCustomer = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateRefinanceCustomer = async (id, data) => {
  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );
  return response.data;
};

const createRefinanceCustomer = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

const refinanceCustomerService = {
  getRefinanceCustomers,
  createRefinanceCustomer,
  deleteRefinanceCustomer,
  updateRefinanceCustomer

};

export default refinanceCustomerService;
