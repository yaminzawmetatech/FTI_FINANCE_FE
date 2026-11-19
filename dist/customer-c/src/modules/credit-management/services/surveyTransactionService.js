import axiosInstance from "core/services/api/axiosInstance";

const getSurveyTransaction = async () => {
  const response = await axiosInstance.get(`survey-transactions`);
  return response.data;
};

const createSurveyTransaction = async ({
  survey_transactions = [],
  application_id,
  type
}) => {
  const response = await axiosInstance.post(`survey-transactions`, {
    survey_transactions,
    application_id,
    type
  });
  return response.data;
};

const surveyTransactionService = {
  getSurveyTransaction,
  createSurveyTransaction,
};

export default surveyTransactionService;
