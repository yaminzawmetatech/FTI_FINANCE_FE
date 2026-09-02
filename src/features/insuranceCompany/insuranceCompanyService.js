import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}insurance-companies`;

const getInsuranceCompaines = async (params, allFlag) => {
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

const deleteInsuranceCompany = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateInsuranceCompany = async (id, data) => {
  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );
  return response.data;
};

const createInsuranceCompany = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};


const InsuranceCompanyService = {
  createInsuranceCompany,
  deleteInsuranceCompany,
  updateInsuranceCompany,
  getInsuranceCompaines
};

export default InsuranceCompanyService;
