import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}early-termination-fees`

// Get Data
const getEarlyTerminationFees = async () => {
  const response = await axiosInstance.get(API_URL)

  return response.data
}

// Create 
const createEarlyTerminationFees = async (approvalWorkflowData) => {
  
    const response = await axiosInstance.post(API_URL, approvalWorkflowData)
  
    return response.data
}

// update
const updateEarlyTerminationFees = async(approvalWorkflowId, approvalWorkflowData) => {
    const response = await axiosInstance.put(API_URL +'/'+approvalWorkflowId, approvalWorkflowData)
  
    return response.data;  
}

// Delete 
const deleteEarlyTerminationFees = async (approvalWorkflowId) => {

  const response = await axiosInstance.delete(API_URL +'/'+ approvalWorkflowId)

  return response.data
}
// Delete
const getDataForEarlyTerminationByApplicationId = async (applicationId) => {
  const response = await axiosInstance.post('/get-early-termination-info', applicationId)

  return response.data
}

const earlyTerminationFeesService = {
  getEarlyTerminationFees,
  createEarlyTerminationFees,
  updateEarlyTerminationFees,
  deleteEarlyTerminationFees,
  getDataForEarlyTerminationByApplicationId

}

export default earlyTerminationFeesService
