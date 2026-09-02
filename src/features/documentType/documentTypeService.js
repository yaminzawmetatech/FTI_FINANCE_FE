import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}document-types`

// Get user document-types
const getDocumentTypes = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Delete user DocumentType
const deleteDocumentType = async (documentTypeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ documentTypeId, config)

  return response.data
}

const updateDocumentType = async(documentTypeId, documentTypeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.put(API_URL +'/'+documentTypeId, documentTypeData, config)

  return response.data;

}

// Create new DocumentType
const createDocumentType = async (documentTypeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL, documentTypeData, config)

  return response.data
}


const documentTypeService = {
  createDocumentType,
  getDocumentTypes,
  deleteDocumentType,
  updateDocumentType,
}


export default documentTypeService
