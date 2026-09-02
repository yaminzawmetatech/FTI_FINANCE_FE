import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}application-setups`

// Get user groups
const getApplicationSetupList = async () => {

  const response = await axiosInstance.get(API_URL)
  return response.data
}

const applicationInfrmationSetupListService = {
  getApplicationSetupList,
}


export default applicationInfrmationSetupListService
