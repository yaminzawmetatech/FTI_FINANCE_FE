import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}address-districts`

// Get address districts
const getAddressDistricts = async (params, access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params
  }

  const response = await axiosInstance.get(API_URL, config);

  return response.data
}


const getDistrictByStateAndTownship = async (addressStateId, addressTownshipId, access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const formData = new FormData();
  formData.append('address_state_id', addressStateId);
  formData.append('address_township_id', addressTownshipId);
  const response = await axiosInstance.post(`${base_url}address-districts-by-state-township`, formData,config);
  return response.data
}

const getPermanentDistrictByStateAndTownship = async (addressStateId, addressTownshipId, access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const formData = new FormData();
  formData.append('address_state_id', addressStateId);
  formData.append('address_township_id', addressTownshipId);
  const response = await axiosInstance.post(`${base_url}address-districts-by-state-township`, formData,config);
  return response.data
}

const getParkingDistrictByStateAndTownship = async (addressStateId, addressTownshipId, access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const formData = new FormData();
  formData.append('address_state_id', addressStateId);
  formData.append('address_township_id', addressTownshipId);
  const response = await axiosInstance.post(`${base_url}address-districts-by-state-township`, formData,config);
  return response.data
}


// Delete 
const deleteAddressDistrict = async (addressDistrictId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ addressDistrictId, config)

  return response.data
}

// update
const updateAddressDistrict = async(addressDistrictId, addressDistrictData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.put(API_URL +'/'+addressDistrictId, addressDistrictData, config)

  return response.data;

}

// Create 
const createAddressDistrict = async (addressDistrictData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL, addressDistrictData, config)

  return response.data
}

// batch delete
const batchDeleteAddressDistricts = async (addressDistrictsIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL+'/batch-delete', addressDistrictsIds, config)

  return response.data
}

const addressDistrictService = {
  getAddressDistricts,
  createAddressDistrict,
  updateAddressDistrict,
  deleteAddressDistrict,
  batchDeleteAddressDistricts,
  getDistrictByStateAndTownship,
  getPermanentDistrictByStateAndTownship,
  getParkingDistrictByStateAndTownship
}

export default addressDistrictService
