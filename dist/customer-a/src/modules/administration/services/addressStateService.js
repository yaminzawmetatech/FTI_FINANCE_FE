import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}address-states`

// Get States
const getAddressStates = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Delete 
const deleteAddressState = async (addressStateId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ addressStateId, config)

  return response.data
}

const updateAddressState = async(addressStateId, addressStateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.put(API_URL +'/'+addressStateId, addressStateData, config)

  return response.data;

}

// Create 
const createAddressState = async (addressStateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL, addressStateData, config)

  return response.data
}


const batchDeleteAddressStates = async (addressStatesIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL+'/batch-delete', addressStatesIds, config)

  return response.data
}

const addressStateService = {
  createAddressState,
  getAddressStates,
  deleteAddressState,
  updateAddressState,
  batchDeleteAddressStates
}

export default addressStateService
