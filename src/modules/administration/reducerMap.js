import menu from "store/reducers/menu";
import auth from "./slices/authSlice";
import userGroups from "./slices/userGroupSlice";
import departments from "./slices/departmentSlice";
import positions from "./slices/positionSlice";
import banks from "./slices/bankSlice";
import projectCategories from "./slices/projectcategorySlice";
import subCategories from "./slices/subcategorySlice";
import nrcStates from "./slices/nrcStateSlice";
import nrcTownships from "./slices/nrcTownshipSlice";
import permissions from "./slices/permissionsetsSlice";
import addressStates from "./slices/addressStateSlice";
import addressDistricts from "./slices/addressDistrictSlice";
import addressTownships from "./slices/addressTownshipSlice";
import addressCities from "./slices/addressCitySlice";
import table from "./slices/tableSlice";
import addressWards from "./slices/addressWardSlice";
import addressVillageTracts from "./slices/addressVillageTractSlice";
import addressVillages from "./slices/addressVillageSlice";
import contactTypes from "./slices/contactTypeSlice";
import typeofBusinesses from "./slices/typeofbusinessSlice";
import mainBusinessCategories from "./slices/mainbusinesscategorySlice";
import subBusinessCategories from "./slices/subbusinesscategorySlice";
import documentTypes from "./slices/documentTypeSlice";
import blacklistCustomers from "./slices/blacklistCustomerSlice";
import nrcRemarks from "./slices/NRCRemarkSlice";
import menuApplicationSetup from "./slices/menuApplicationSetupSlice";
import numberSeries from "./slices/numberSeriesSlice";
import users from "./slices/usersSlice";
import user from "./slices/usersSlice";
import workflows from "./slices/workflowSlice";
import approvalWorkflows from "./slices/approvalWorkflowSlice";
import fileAttaches from "./slices/fileAttachSlice";
import documentAccesses from "./slices/documentAccessSlice";
import signers from "./slices/signerSlice";
import cmcoUsers from "./slices/usersSlice";
import agents from "./slices/usersSlice";
import customerBanks from "./slices/customerBankSlice";
import NRCTownshipVariations from "./slices/nrcTownshipVarationSlice";
import addressVillageData from "./slices/addressVillageSlice";
import addressVillageTractData from "./slices/addressVillageTractSlice";
import addressWardData from "./slices/addressWardSlice";
import blackListArea from "./slices/blackListAreaSlice";
import excludeBlackListArea from "./slices/excludeBlackListAreaSlice";
import emailSetups from "./slices/emailSetupSlice";
import collateralTypes from "./slices/collateralTypesSetupSlice";

const reducerMap = {
  menu,
  auth,
  positions,
  projectCategories,
  subCategories,
  departments,
  permissions,
  banks,
  customerBanks,
  userGroups,
  addressStates,
  addressDistricts,
  addressTownships,
  addressCities,
  addressWards,
  addressVillageTracts,
  addressVillages,
  nrcStates,
  nrcTownships,
  NRCTownshipVariations,
  addressVillageData,
  addressVillageTractData,
  addressWardData,
  contactTypes,
  typeofBusinesses,
  mainBusinessCategories,
  subBusinessCategories,
  documentTypes,
  blacklistCustomers,
  nrcRemarks,
  table,
  menuApplicationSetup,
  numberSeries,
  users,
  user,
  workflows,
  approvalWorkflows,
  fileAttaches,
  documentAccesses,
  signers,
  cmcoUsers,
  agents,
  blackListArea,
  excludeBlackListArea,
  emailSetups,
  collateralTypes,
};

export default reducerMap;
