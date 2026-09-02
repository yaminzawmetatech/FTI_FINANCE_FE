import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}permissions`

// Get permission sets data
const getPermissions = async () => {

  const response = await axiosInstance.get(API_URL)
  return response.data
}


const permissionsetsService = {
  getPermissions
}


export default permissionsetsService
