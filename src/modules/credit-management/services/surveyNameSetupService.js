import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}survey-headers`

// Get survey name
const getSurveyHeaders = async () => {

  const response = await axiosInstance.get(API_URL)
  return response.data
}

// Delete survey name
const deleteSurveyHeader = async (surveyHeaderCode) => {
 
  const response = await axiosInstance.delete(API_URL +'/'+ surveyHeaderCode)
  return response.data
}

const updateSurveyHeader = async(surveyHeaderCode, surveyHeaderData) => {

  const response = await axiosInstance.put(API_URL +'/'+surveyHeaderCode, surveyHeaderData)
  return response.data;

}

// Create new survery header
const createSurveyHeader = async (surveyHeaderData) => {
  
  const response = await axiosInstance.post(API_URL, surveyHeaderData)
  return response.data
}

const getSurveyHeaderByUuid = async(surveyHeaderCode) => {

  const response = await axiosInstance.get(API_URL +'/'+surveyHeaderCode)
  return response.data;

}

const getSurveyQAsByHeaderUuid = async(surveyHeaderCode) => {

  const response = await axiosInstance.get(API_URL +'/'+surveyHeaderCode+'/survey-qa-setups')
  return response.data;

}
const surveyNameSetupService = {
  createSurveyHeader,
  getSurveyHeaders,
  deleteSurveyHeader,
  updateSurveyHeader,
  getSurveyHeaderByUuid,
  getSurveyQAsByHeaderUuid
}


export default surveyNameSetupService
