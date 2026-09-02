import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}insurance-premium-fees`;

const getInsurancePremiumFees = async (params, allFlag) => {
  let response;
  if (!allFlag) {
    response = await axiosInstance.get(API_URL, {
      params: {
        ...params,
        limit: +params?.limit || 50,
      },
    });
  } else {
    response = await axiosInstance.get(API_URL, {
      params: {
        ...params,
      },
    });
  }
 
  return response.data;
};

const deleteInsurancePremiumFee = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateInsurancePremiumFee = async (id, data) => {
  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );
  return response.data;
};

const createInsurancePremiumFee = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};


const InsurancePremiumFeeService = {
  createInsurancePremiumFee,
  deleteInsurancePremiumFee,
  updateInsurancePremiumFee,
  getInsurancePremiumFees
};

export default InsurancePremiumFeeService;
