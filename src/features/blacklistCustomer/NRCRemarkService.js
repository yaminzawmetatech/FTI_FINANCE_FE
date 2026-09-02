import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}blacklist-customer-nrc-remarks`

// Get NRC Remark(N/E/P)
const getNRCRemarks = async () => {
  const response = await axiosInstance.get(API_URL)

  return response.data
}

const nrcRemarkService = {
  getNRCRemarks,
}

export default nrcRemarkService
