import axiosInstance from "core/services/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}partner-applications/list`

// Get user groups
const getPartnerApplicationList = async () => {

  const response = await axiosInstance.get(API_URL)
  return response.data
}

const partnerApplicationListService = {
  getPartnerApplicationList,
}


export default partnerApplicationListService
