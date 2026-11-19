import axiosInstance from "core/services/api/axiosInstance";

const getMobApplicationsCount = async (params) => {
  const response = await axiosInstance.get(`get-mob-application-counts`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

const getMobSurveysCount = async () => {
  const response = await axiosInstance.get(`get-mob-survey-counts`);
  return response.data;
};

const getMobDownPaymentsCount = async () => {
  const response = await axiosInstance.get(`get-mob-downPayment-counts`);
  return response.data;
};

const getMobContractsCount = async (params) => {
  const response = await axiosInstance.get(`get-mob-contract-counts`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

const getMobSaleInvoicesCount = async () => {
  const response = await axiosInstance.get(`get-mob-saleInvoice-counts`);
  return response.data;
};

const getMobRemindersCount = async () => {
  const response = await axiosInstance.get(`get-mob-reminder-counts`);
  return response.data;
};

const applicationService = {
  getMobApplicationsCount,
  getMobSurveysCount,
  getMobDownPaymentsCount,
  getMobContractsCount,
  getMobSaleInvoicesCount,
  getMobRemindersCount,
};

export default applicationService;
