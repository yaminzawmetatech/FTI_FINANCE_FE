import axiosInstance from "../api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}email-setups`

// Get email setups
const getEmailSetups = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Delete email setup
const deleteEmailSetup = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ id, config)
  return response.data
}

const updateEmailSetup = async(id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.put(API_URL +'/'+id, data, config)

  return response.data;

}

// Create new email setup
const createEmailSetup = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL, data, config)

  return response.data
}

const editEmailSetupService = {
  createEmailSetup,
  getEmailSetups,
  deleteEmailSetup,
  updateEmailSetup,
}


export default editEmailSetupService
