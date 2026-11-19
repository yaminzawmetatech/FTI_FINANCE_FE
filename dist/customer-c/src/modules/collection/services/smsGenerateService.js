import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}sms-generate`;
const DOWNLOAD_API_URL = `${base_url}download-sms-histories-excel`;
const DP_API_URL = `${base_url}generate-disbursement-sms`;
const SMS_GENERATE_LOAN_SKIPPED_API_URL = `${base_url}sms-generate-for-is-sms-generated-category`;

// Create Generated SMS

const createGeneratedSMS = async (params) => {
  const response = await axiosInstance.post(API_URL, params);
  return response.data;
};

const createSMSLoanSkipped = async (params) => {
  const response = await axiosInstance.post(SMS_GENERATE_LOAN_SKIPPED_API_URL, params);
  return response.data;
};

// Download SMS History Excel
const downloadSMSHistoryExcel = async (params) => {
  const response = await axiosInstance.get(DOWNLOAD_API_URL, {
    params:{
      ...params
    },
    //responseType: "arraybuffer",
  });
  return response.data; // Return raw file data
};

const createDisbursementGeneratedSMS = async (params) => {
  const response = await axiosInstance.post(DP_API_URL, params);
  return response.data;
};

const smsGenerateService = {
  createGeneratedSMS,
  downloadSMSHistoryExcel,
  createDisbursementGeneratedSMS,
  createSMSLoanSkipped
};

export default smsGenerateService;
