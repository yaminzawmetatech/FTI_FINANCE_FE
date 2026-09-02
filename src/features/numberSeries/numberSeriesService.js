import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}number-series`

// Get number series
const getNumberSeries = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Delete number series
const deleteNumberSeries = async (numberSeriesCode, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ numberSeriesCode, config)

  return response.data
}

const updateNumberSeries = async(numberSeriesCode, numberSeriesData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.put(API_URL +'/'+numberSeriesCode, numberSeriesData, config)

  return response.data;

}

// Create new survery header
const createNumberSeries = async (numberSeriesData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL, numberSeriesData, config)

  return response.data
}

const numberSeriesService = {
  createNumberSeries,
  getNumberSeries,
  deleteNumberSeries,
  updateNumberSeries,
}


export default numberSeriesService
