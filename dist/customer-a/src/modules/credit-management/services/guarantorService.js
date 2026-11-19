import axiosInstance from "core/services/api/axiosInstance";

const getGuarantorsApi = async (params, url = "guarantors") => {
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

const getGuarantorApi = async (id) => {
  const response = await axiosInstance.get(`guarantors/${id}`);
  return response.data;
};


const getAllGuarantorApi = async () => {
  const response = await axiosInstance.get(`guarantors`);
  return response.data;
};

const createGuarantorApi = async (body) => {
  const response = await axiosInstance.post(`guarantors`, body);
  return response.data;
};

const updateGuarantorApi = async (id, body) => {
  const response = await axiosInstance.put(`guarantors/${id}`, body);
  return response.data;
};

const updateguarantorstatusApi = async (id, status) => {
  const response = await axiosInstance.put(
    `guarantors/${id}/updateguarantorstatus`,
    { status }
  );
  return response.data;
};

const deleteGuarantorApi = async (id,applicationId) => {
  const response = await axiosInstance.delete(`guarantors/${id}/${applicationId}/delete`);
  return response.data;
};

const checkExistingGuarantor = async (body) => {
  const response = await axiosInstance.post(`check-guarantor-nrc`,body);
  return response.data;
};

const guarantorService = {
  getGuarantorsApi,
  getGuarantorApi,
  createGuarantorApi,
  updateGuarantorApi,
  deleteGuarantorApi,
  updateguarantorstatusApi,
  getAllGuarantorApi,
  checkExistingGuarantor
};

export default guarantorService;
