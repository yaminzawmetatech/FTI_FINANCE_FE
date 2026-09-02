import axiosInstance from "features/api/axiosInstance";
const base_url = process.env.REACT_APP_API_URL;

const API_URL = `${base_url}nrc-variations`;

// Get NRC Township Variations
const getNRCTownshipVariationsByTownshipId = async (id) => {

  const response = await axiosInstance.get("nrc-township-variations"+"/"+id);

  return response.data;
};

// Delete
const deleteNRCTownshipVariation = async (nrcTownshipId) => {

  const response = await axiosInstance.delete(API_URL + "/" + nrcTownshipId);

  return response.data;
};

const updateNRCTownshipVariation = async (nrcTownshipId, nrcTownshipData) => {

  const response = await axiosInstance.put(
    API_URL + "/" + nrcTownshipId,
    nrcTownshipData,
  );

  return response.data;
};

// Create
const createNRCTownshipVariation = async (nrcTownshipData) => {

  const response = await axiosInstance.post(API_URL, nrcTownshipData);

  return response.data;
};

const NRCTownshipVariationService = {
  getNRCTownshipVariationsByTownshipId,
  createNRCTownshipVariation,
  updateNRCTownshipVariation,
  deleteNRCTownshipVariation,
};

export default NRCTownshipVariationService;
