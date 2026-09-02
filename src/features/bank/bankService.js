import axiosInstance from "../api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}banks`

// Get banks
const getBanks = async () => {
  const response = await axiosInstance.get(API_URL)

  return response.data
}

// Delete bank
const deleteBank = async (bankId) => {
  const response = await axiosInstance.delete(API_URL +'/'+ bankId)
  return response.data
}

const updateBank = async(bankId, bankData) => {
  const response = await axiosInstance.put(API_URL +'/'+bankId, bankData)

  return response.data;

}

// Create new bank
const createBank = async (bankData) => {
  const response = await axiosInstance.post(API_URL, bankData)

  return response.data
}

const bankService = {
  createBank,
  getBanks,
  deleteBank,
  updateBank,
}


export default bankService
