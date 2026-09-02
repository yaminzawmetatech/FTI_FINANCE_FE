import axiosInstance from "../api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;
const API_URL = `${base_url}application-downpayments`;

const getApplicationDownPaymentsApi = async (params, url = "assessments") => {
  const response = await axiosInstance.get(API_URL, {
    params,
  });
  return response.data;
};

const getApplicationDownPaymentByUuid = async (uuid) => {
  const response = await axiosInstance.get(`${API_URL}/${uuid}`);
  return response.data;
};


const createApplicationDownPaymentApi = async (body) => {
  const response = await axiosInstance.post(API_URL, body);
  return response.data;
};

const updateApplicationDownPaymentByUuid = async (uuid, body) => {
  const response = await axiosInstance.put(`${API_URL}/${uuid}`, body);
  return response.data;
};

const deleteApplicationDownPayment = async (uuid) => {
  const response = await axiosInstance.delete(`${API_URL}/${uuid}`);
  return response.data;
};

const applicationDownPaymentService = {
  getApplicationDownPaymentsApi,
  getApplicationDownPaymentByUuid,
  createApplicationDownPaymentApi,
  updateApplicationDownPaymentByUuid,
  deleteApplicationDownPayment,
};

export default applicationDownPaymentService;
