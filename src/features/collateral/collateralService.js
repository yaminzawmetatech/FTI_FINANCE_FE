import axiosInstance from "../api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;
const API_URL = `${base_url}application-collaterals`;
const RAPI_URL = `${base_url}repayment-collaterals`;
const LC_URL = `${base_url}license-renewal-assign`;
const UAPI_URL = `${base_url}update-application-collateral`;

const getAllCollaterals = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const getCollateralByUuid = async (uuid) => {
  const response = await axiosInstance.get(`${API_URL}/${uuid}`);
  return response.data;
};

const createCollateral = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

const updateCollateral = async (data, uuid) => {
  const response = await axiosInstance.put(`${API_URL}/${uuid}`, data);
  return response.data;
};

const lockCollateral = async (data) => {
  const response = await axiosInstance.post(`lock-collateral`, data);
  return response.data;
};

const checkLocked = async (data) => {
  const response = await axiosInstance.post(`check-collateral-edit-permission`, data);
  return response.data;
};

const deleteCollateral = async (uuid) => {
  const response = await axiosInstance.delete(`${API_URL}/${uuid}`);
  return response.data;
};

const updateCollateralStatusChange = async (data, uuid) => {
  const response = await axiosInstance.post(`${UAPI_URL}/${uuid}`, data);
  return response.data;
};

const getRepaymentCollaterals = async (params) => {
  const response = await axiosInstance.get(RAPI_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

const licenseRenewalAssign = async (data) => {
  const response = await axiosInstance.post(LC_URL, data);
  return response.data;
};

// Will add batch delete --

const collateralService = {
  getAllCollaterals,
  getCollateralByUuid,
  createCollateral,
  updateCollateral,
  deleteCollateral,
  lockCollateral,
  checkLocked,
  updateCollateralStatusChange,
  getRepaymentCollaterals,
  licenseRenewalAssign
};

export default collateralService;
