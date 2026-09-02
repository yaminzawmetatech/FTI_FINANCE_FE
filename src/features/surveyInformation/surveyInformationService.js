import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}get-survey-result-by-type`;

const getSurveyInformation = async (params) => {
  const response = await axiosInstance.get(API_URL, 
    {
    params: {
      ...params,
      // 'is_generated_gl' : true,
      limit: +params?.limit || 50,
    },
  }
  );
  return response.data;
};

const SurveyInformationService = {
  getSurveyInformation,
};

export default SurveyInformationService;
