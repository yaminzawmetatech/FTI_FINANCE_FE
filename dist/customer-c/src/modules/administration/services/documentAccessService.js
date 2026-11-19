import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}document-accesses`

// Get documentAccesses
const getDocumentAccesses = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Delete user documentAccess
const deleteDocumentAccess = async (documentAccessId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ documentAccessId, config)

  return response.data
}

const updateDocumentAccess = async(documentAccessId, documentAccessData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.put(API_URL +'/'+documentAccessId, documentAccessData, config)

  return response.data;

}

// Create new documentAccess
const createDocumentAccess = async (documentAccessData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL, documentAccessData, config)

  return response.data
}


const documentAccessService = {
  createDocumentAccess,
  getDocumentAccesses,
  deleteDocumentAccess,
  updateDocumentAccess,
}


export default documentAccessService
