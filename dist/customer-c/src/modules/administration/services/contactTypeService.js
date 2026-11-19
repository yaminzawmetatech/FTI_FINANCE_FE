import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}survey-header-contact-types`

// Get user contact types
const getContactTypes = async () => {
  const response = await axiosInstance.get(API_URL)
  return response.data
}

const contactTypeService = {
  getContactTypes,
}


export default contactTypeService
