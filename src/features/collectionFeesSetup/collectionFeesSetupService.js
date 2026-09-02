import axiosInstance from "features/api/axiosInstance"
const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}collection-fee-setups`

// Get Data
const getCollectionFees = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  const response = await axiosInstance.get(API_URL, config)

  return response.data
}

// Create 
const createCollectionFees = async (approvalWorkflowData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axiosInstance.post(API_URL, approvalWorkflowData, config)
  
    return response.data
}

// update
const updateCollectionFees = async(id, newData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axiosInstance.put(API_URL +'/'+id, newData, config)
  
    return response.data;  
}

// Delete 
const deleteCollectionFees = async (approvalWorkflowId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(API_URL +'/'+ approvalWorkflowId, config)

  return response.data
}

const getCollectionFeesPercentageTypes = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get("collection-fee-percentage-types", config);

  return response.data;
};

const collectionFeesService = {
  getCollectionFees,
  createCollectionFees,
  updateCollectionFees,
  deleteCollectionFees,
  getCollectionFeesPercentageTypes
}

export default collectionFeesService
