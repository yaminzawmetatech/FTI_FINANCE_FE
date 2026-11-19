import axiosInstance from "core/services/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}assessment-responses`

// Get
const getAssessmentResponses = async () => {
  const response = await axiosInstance.get(API_URL)

  return response.data;
}

// Get
const getExternalResponses = async (status) => {
  const response = await axiosInstance.get(API_URL+"?type=external&status="+status)

  return response.data;
}

// Delete 
const deleteAssessmentResponse = async (id) => {
  const response = await axiosInstance.delete(API_URL +'/'+ id)

  return response.data;
}

const updateAssessmentResponse = async(id, data) => {
  const response = await axiosInstance.put(API_URL +'/'+id, data)

  return response.data;

}

// Create 
const createAssessmentResponse = async (data) => {
  const response = await axiosInstance.post(API_URL, data)

  return response.data
}


const assessmentResponseService = {
  createAssessmentResponse,
  getAssessmentResponses,
  deleteAssessmentResponse,
  updateAssessmentResponse,
  getExternalResponses
}

export default assessmentResponseService
