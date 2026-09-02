import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}reminder-setup`

// Get Data
const getReminders = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Create 
const createReminder = async (data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axiosInstance.post(API_URL, data, config)
  
    return response.data
}

// update
const updateReminder = async(id, newData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    
    const response = await axiosInstance.put(API_URL +'/'+id, newData, config)
  
    return response.data;  
}

// Delete 
const deleteReminder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ id, config)

  return response.data
}

const reminderSetupService = {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
}

export default reminderSetupService
