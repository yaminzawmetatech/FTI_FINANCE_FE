import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}blacklist-customers`

// Get Data
const getBlacklistCustomers = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Create 
const createBlacklistCustomer = async (blacklistCustomerData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axiosInstance.post(API_URL, blacklistCustomerData, config)
  
    return response.data
}

// update
const updateBlacklistCustomer = async(blacklistCustomerId, blacklistCustomerData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axiosInstance.put(API_URL +'/'+blacklistCustomerId, blacklistCustomerData, config)
  
    return response.data;  
}

// Delete 
const deleteBlacklistCustomer = async (blacklistCustomerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ blacklistCustomerId, config)

  return response.data
}

// batch delete
const batchDeleteBlacklistCustomers = async (blacklistCustomerIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL+'/batch-delete', blacklistCustomerIds, config)

  return response.data
}

// Get Data by Blacklist uuid
const getBlacklistCustomersById = async (access_token,uuid) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL+`/${uuid}`, config)

  return response.data
}

const blacklistCustomerService = {
  getBlacklistCustomers,
  createBlacklistCustomer,
  updateBlacklistCustomer,
  deleteBlacklistCustomer,
  batchDeleteBlacklistCustomers,
  getBlacklistCustomersById,
}

export default blacklistCustomerService
