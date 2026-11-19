import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}work-flows`

// Get Data
const getWorkflows = async () => {

  const response = await axiosInstance.get(API_URL)
  return response.data
}

// Create 
const createWorkflow = async (workflowData) => {

  const response = await axiosInstance.post(API_URL, workflowData)
  return response.data
}

// update
const updateWorkflow = async(workflowId, workflowData) => {
   
  const response = await axiosInstance.put(API_URL +'/'+workflowId, workflowData)
  return response.data;  
}

// Delete 
const deleteWorkflow = async (workflowId) => {

  const response = await axiosInstance.delete(API_URL +'/'+ workflowId)
  return response.data
}

const workflowService = {
  getWorkflows,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
}

export default workflowService
