import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}survey-header-survey-types`

// Get user survey types
const getsurveyTypes = async () => {
  
  const response = await axiosInstance.get(API_URL)
  return response.data
}

const surveyTypeService = {
  getsurveyTypes,
}


export default surveyTypeService
