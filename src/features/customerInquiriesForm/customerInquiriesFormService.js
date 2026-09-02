import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}customer-inquiry-form`;


const getCustomerInquiries = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const updateCustomerInquiries = async (id, data) => {
  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );
  return response.data;
};

const createCustomerInquiries = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};


const customerInquiriesFormService = {
  createCustomerInquiries,
  getCustomerInquiries,
  updateCustomerInquiries,
};

export default customerInquiriesFormService;
