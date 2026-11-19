import axiosInstance from "core/services/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}survey-result-list`;

// Get survey name
const getSurveyResultList = async () => {
 
  const response = await axiosInstance.get(API_URL);

  return response.data;
};

const surveyResultListService = {
  getSurveyResultList,
};

export default surveyResultListService;
