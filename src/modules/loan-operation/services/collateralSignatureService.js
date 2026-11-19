import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}collateral-signatures`;
const LMS_URL = `${base_url}lc-batch-signatures`;

const getCollateralSignature = async ({ params }) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params
    },
  });
  return response.data;
};
const createCollateralSignature = async (body) => {
  const response = await axiosInstance.post(API_URL, body);
  return response.data;
};
const updateCollateralSignature = async (uuid, body) => {
  const response = await axiosInstance.put(API_URL + "/" + uuid, body);
  return response.data;
};

const getCollateralSignatureByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL + "/" + uuid);
  return response.data;
};

const createBatchLCSignature = async (body) => {
  const response = await axiosInstance.post(LMS_URL, body);
  return response.data;
};

const collateralSignatureService = {
  createCollateralSignature,
  updateCollateralSignature,
  getCollateralSignature,
  getCollateralSignatureByUuid,
  createBatchLCSignature
};

export default collateralSignatureService;
