import axiosInstance from "core/services/api/axiosInstance";
import { sortBy } from "lodash";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}application-inspections`;

const getInsuranceInspections = async ({ params }) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
     ...params
    },
  });
  return response.data;
};
const createInsuranceInspection = async (body) => {
  const response = await axiosInstance.post(API_URL, body);
  return response.data;
};
const updateInsuranceInspection = async (uuid, body) => {
  const response = await axiosInstance.put(API_URL+"/"+uuid, body);
  return response.data;
};

const getInsuranceInspectionByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL+"/"+uuid);
  return response.data;
};

const sendInspectionEmail = async ({ params }) => {
  const response = await axiosInstance.get("insurance-email", {
    params: {
     ...params
    },
  });
  return response.data;
};

const insuranceInspectionService = {
  createInsuranceInspection,
  updateInsuranceInspection,
  getInsuranceInspections,
  getInsuranceInspectionByUuid,
  sendInspectionEmail
};

export default insuranceInspectionService;
