import axiosInstance from "../api/axiosInstance";
import { sortBy } from "lodash";


const getInitialPaymentCalculation = async ({ params }) => {
  const response = await axiosInstance.get(`initial-downpayment-calculations`, {
    params: {
     ...params
    },
  });
  return response.data;
};
const createInitialPaymentCalculationApi = async (body) => {
  const response = await axiosInstance.post(`initial-downpayment-calculations`, body);
  return response.data;
};
const updateInitialPaymentCalculation = async (uuid, body) => {
  const response = await axiosInstance.put(`initial-downpayment-calculations/${uuid}`, body);
  return response.data;
};

const calculateInitialDownPayment = async (uuid,body) => {
  const response = await axiosInstance.post(`calculate-initial-downpayment/${uuid}`, body);
  return response.data;
};


const initialPaymentCalculationService = {
  createInitialPaymentCalculationApi,
  updateInitialPaymentCalculation,
  getInitialPaymentCalculation,
  calculateInitialDownPayment
};

export default initialPaymentCalculationService;
