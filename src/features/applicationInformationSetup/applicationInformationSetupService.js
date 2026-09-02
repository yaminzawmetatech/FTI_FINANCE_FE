// import {ApplicationInformationSetupPropertyData} from "./applicationInformationSetupPropertyData";
import axiosInstance from "features/api/axiosInstance"

// Get application information setup
// const getApplicationInformationSetupProperties = async () => {
//   return await new Promise((resolve) =>
//     setTimeout(
//       () => resolve({ data: ApplicationInformationSetupPropertyData }),
//       0
//     )
//   );
// };

const base_url = process.env.REACT_APP_API_URL

const API_URL = `${base_url}application-fields`
const APPLICATIONSETUP_URL = `${base_url}application-setups`

const getApplicationSetupList = async () => {
  const response = await axiosInstance.get(APPLICATIONSETUP_URL)
  return response.data
}

const createApplicationInformationSetup = async (applicationSetupData) => {
  const response = await axiosInstance.post(APPLICATIONSETUP_URL, applicationSetupData)
  return response.data
}

const updateApplicationInformationSetup = async (uuid, applicationSetupData) => {

  const response = await axiosInstance.put(APPLICATIONSETUP_URL + `/${uuid}`, applicationSetupData)
  return response.data;
}

const getApplicationInformationSetupProperties = async () => {
  const response = await axiosInstance.get(API_URL)
  return response.data
}

const applicationInformationSetupService = {
  getApplicationSetupList,
  createApplicationInformationSetup,
  getApplicationInformationSetupProperties,
  updateApplicationInformationSetup
};

export default applicationInformationSetupService;
