import axiosInstance from "../api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}ihco-and-assessment-remarks`

// Get
const getApplicationAssessmentResponses = async () => {
  const response = await axiosInstance.get(API_URL)

  return response.data;
}

// Get
const getApplicationResponses = async () => {
  const response = await axiosInstance.get("ihco-and-assessment-remarks-byType/Application")

  return response.data;
}

const getExternalResponses = async (type,status) => {
  const response = await axiosInstance.get("ihco-and-assessment-remarks-byType"+"/"+type+"/"+status+"/external")

  return response.data;
}

const getInternalResponses = async (type,status) => {
  const response = await axiosInstance.get("ihco-and-assessment-remarks-byType"+"/"+type+"/"+status+"/internal")

  return response.data;
}

const getAssessmentApprovedResponses = async () => {
  const response = await axiosInstance.get("ihco-and-assessment-remarks-byType/Assessment/Approved")

  return response.data;
}


// Delete 
const deleteApplicationResponse = async (id) => {
  const response = await axiosInstance.delete(API_URL +'/'+ id)

  return response.data;
}

const updateApplicationResponse = async(id, data) => {
  const response = await axiosInstance.put(API_URL +'/'+id, data)

  return response.data;

}

// Create 
const createApplicationResponse = async (data) => {
  const response = await axiosInstance.post(API_URL, data)

  return response.data
}


const applicationResponseService = {
  createApplicationResponse,
  getApplicationAssessmentResponses,
  deleteApplicationResponse,
  updateApplicationResponse,
  getExternalResponses,
  getInternalResponses,
  getApplicationResponses,
  getAssessmentApprovedResponses
}


export default applicationResponseService
