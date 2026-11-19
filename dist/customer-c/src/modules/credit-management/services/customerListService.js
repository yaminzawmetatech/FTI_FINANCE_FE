import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}customers`;

const getAllCustomers = async () => {

  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const getCustomerDetail = async (id) => {

  const response = await axiosInstance.get(API_URL+ "/"+ id);
  return response.data;
};

const customerListService = {
  getAllCustomers,
  getCustomerDetail
};

export default customerListService;
