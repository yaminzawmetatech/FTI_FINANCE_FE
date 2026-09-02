import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}billing-date-registrations`;

const getBillingDates = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get(
    API_URL,
    config
  );

  return response.data;
};

const deleteBillingDate = async (billingDateId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + "/" + billingDateId, config);

  return response.data;
};

const updateBillingDate = async (billingDateId, billingDateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + billingDateId,
    billingDateData,
    config
  );

  return response.data;
};

const createBillingDate = async (billingDateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, billingDateData, config);

  return response.data;
};

const billingDateService = {
  createBillingDate,
  getBillingDates,
  deleteBillingDate,
  updateBillingDate,
};

export default billingDateService;
