import axiosInstance from "core/services/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}dealer-contact-person`;

const getDealerContactPeople = async (params, allFlag) => {
  let response;
  if (!allFlag) {
    response = await axiosInstance.get(API_URL, {
      params: {
        ...params,
        limit: +params?.limit || 50,
      },
    });
  } else {
    response = await axiosInstance.get(API_URL, {
      params: {
        ...params,
      },
    });
  }
 
  return response.data;
};

const getDealerContactPeopleByStatus = async (status) => {
  const response = await axiosInstance.get(API_URL + "/" + status);
  return response.data;
};

const deleteDealerContactPerson = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateDealerContactPerson = async (id, data) => {
  const response = await axiosInstance.put(API_URL + "/" + id, data);
  return response.data;
};

const createDealerContactPerson = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

const dealerContactPersonService = {
  createDealerContactPerson,
  getDealerContactPeople,
  deleteDealerContactPerson,
  updateDealerContactPerson,
  getDealerContactPeopleByStatus,
};

export default dealerContactPersonService;
