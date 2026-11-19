import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}sms-format-header`

// Get Data
const getSMS = async () => {
  const response = await axiosInstance.get(API_URL)
  return response.data
}

// Create 
const createSMS = async (data) => {
  const response = await axiosInstance.post(API_URL, data)
  return response.data
}

// update
const updateSMS = async(uuid, body) => {
  const response = await axiosInstance.put(API_URL +'/'+uuid, body)
  return response.data;  
}

// Delete 
const deleteSMS = async (id) => {
  const response = await axiosInstance.delete(API_URL +'/'+ id)
  return response.data
}

const getSMSByUuid = async (uuid) => {
  const response = await axiosInstance.get(API_URL+'/'+ uuid);
  return response.data;
};

const getValues = async () => {
  const response = await axiosInstance.get(`get-sms-parameters`)
  return response.data
}

const smsSetupService = {
  getSMS,
  createSMS,
  updateSMS,
  deleteSMS,
  getSMSByUuid,
  getValues
}

export default smsSetupService
