import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}nrc-states`

// Get NRC States
const getNRCStates = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Delete 
const deleteNRCState = async (nrcStateId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ nrcStateId, config)

  return response.data
}

const updateNRCState = async(nrcStateId, nrcStateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.put(API_URL +'/'+nrcStateId, nrcStateData, config)

  return response.data;

}

// Create 
const createNRCState = async (nrcStateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL, nrcStateData, config)

  return response.data
}


const batchDeleteNRCStates = async (nrcStatesIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL+'/batch-delete', nrcStatesIds, config)

  return response.data
}

const nrcStateService = {
  getNRCStates,
  createNRCState,
  updateNRCState,
  deleteNRCState,
  batchDeleteNRCStates
}

export default nrcStateService
