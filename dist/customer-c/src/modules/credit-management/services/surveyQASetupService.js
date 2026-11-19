import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}survey-qa-setups`

const API_URL_QUS = `${base_url}survey-headers`

// Get survey name
const getSurveyQAs = async () => {

  const response = await axiosInstance.get(API_URL)
  return response.data
}

// Get survey questions
const getSurveyQuestions = async (surveyHeaderCode) => {
 
  const response = await axiosInstance.get(API_URL_QUS +'/'+surveyHeaderCode+'/survey-questions')
  return response.data
}


// Delete survey name
const deleteSurveyQA = async (surveyHeaderCode) => {

  const response = await axiosInstance.delete(API_URL +'/'+ surveyHeaderCode)
  return response.data
}

const updateSurveyQA = async(surveyHeaderCode, surveyHeaderData) => {
 
  const response = await axiosInstance.put(API_URL +'/'+surveyHeaderCode, surveyHeaderData)
  return response.data;

}

// Create new survery header
const createSurveyQA = async (surveyHeaderData) => {
  
  const response = await axiosInstance.post(API_URL, surveyHeaderData)
  return response.data
}

// Create new survery header
const copySurveyQA = async (surveyHeaderData) => {
  
  const response = await axiosInstance.post(API_URL+'/'+'copy', surveyHeaderData)
  return response.data
}

const surveyQASetupService = {
  createSurveyQA,
  copySurveyQA,
  getSurveyQAs,
  getSurveyQuestions,
  deleteSurveyQA,
  updateSurveyQA,
}


export default surveyQASetupService
