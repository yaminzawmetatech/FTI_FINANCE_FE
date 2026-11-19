import axiosInstance from "core/services/api/axiosInstance";

const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}departments`

// Get user departments
const getDepartments = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Delete user department
const deleteDepartment = async (departmentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ departmentId, config)

  return response.data
}

const updateDepartment = async(departmentId, departmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.put(API_URL +'/'+departmentId, departmentData, config)

  return response.data;

}

// Create new department
const createDepartment = async (departmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL, departmentData, config)

  return response.data
}


const batchDeleteDepartments = async (departmentIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(API_URL+'/batch-delete', departmentIds, config)

  return response.data
}


const departmentService = {
  createDepartment,
  getDepartments,
  deleteDepartment,
  updateDepartment,
  batchDeleteDepartments
}


export default departmentService
