// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import auth from "../../features/auth/authSlice";
import userGroups from "../../features/userGroup/userGroupSlice";
import departments from "../../features/department/departmentSlice";
import positions from "../../features/position/positionSlice";
import banks from "../../features/bank/bankSlice";
import projectCategories from "../../features/projectcategory/projectcategorySlice";
import subCategories from "../../features/subcategory/subcategorySlice";
import nrcStates from "../../features/nrc/NRCState/nrcStateSlice";
import nrcTownships from "../../features/nrc/NRCTownship/nrcTownshipSlice";
import permissions from "../../features/persmissionsets/permissionsetsSlice";
import applicationInformationSetup from "../../features/applicationInformationSetup/applicationInformationSetupSlice";
import addressStates from "../../features/address/State/addressStateSlice";
import addressDistricts from "../../features/address/District/addressDistrictSlice";
import addressTownships from "../../features/address/Township/addressTownshipSlice";
import addressCities from "../../features/address/City/addressCitySlice";
import table from "../../features/table/tableSlice";
import addressWards from "../../features/address/Ward/addressWardSlice";
import addressVillageTracts from "../../features/address/VillageTract/addressVillageTractSlice";
import addressVillages from "../../features/address/Village/addressVillageSlice";
import contactTypes from "../../features/contactType/contactTypeSlice";
import surveyTypes from "../../features/surveyType/surveyTypeSlice";
import surveyHeaders from "../../features/surveyNameSetup/surveyNameSetupSlice";
import surveyQAs from "../../features/surveyQASetup/surveyQASetupSlice";
import surveyQAsByHeader from "../../features/surveyNameSetup/surveyNameSetupSlice";
import surveyHeader from "../../features/surveyNameSetup/surveyNameSetupSlice";
import surveyQuestions from "../../features/surveyQASetup/surveyQASetupSlice";
import typeofBusinesses from "../../features/typeofbusiness/typeofbusinessSlice";
import mainBusinessCategories from "../../features/mainbusinesscategory/mainbusinesscategorySlice";
import subBusinessCategories from "../../features/subbusinesscategory/subbusinesscategorySlice";
import documentTypes from "../../features/documentType/documentTypeSlice";
import downPaymentSetups from "../../features/downPaymentSchemeSetup/downPaymentSchemeSetupSlice";
import blacklistCustomers from "../../features/blacklistCustomer/blacklistCustomerSlice";
import nrcRemarks from "../../features/blacklistCustomer/NRCRemarkSlice";
import application from "../../features/application/applicationSlice";
import applicationDetail from "../../features/application/applicationDetailSlice";
import menuApplicationSetup from "../../features/menuApplicationSetup/menuApplicationSetupSlice";
import surveyResult from "../../features/surveryResult/surveyResultSlice";
import numberSeries from "../../features/numberSeries/numberSeriesSlice";
import users from "../../features/users/usersSlice";
import user from "../../features/users/usersSlice";
import surveyTransactions from "../../features/surveyTransaction/surveyTransactionSlice";
import workflows from "../../features/workflow/workflowSlice";
import approvalWorkflows from "../../features/approvalWorkflow/approvalWorkflowSlice";
import fileAttaches from "../../features/fileAttach/fileAttachSlice";
import assessments from "../../features/assessment/assessmentSlice";
import documentAccesses from "../../features/documentAccess/documentAccessSlice";
import applicationInformationSetupList from "../../features/ApplicationInformationSetupList/ApplicationInformationSetupSlice";
import data from "../../features/surveyTransaction/surveyTransactionSlice";
import guarantors from "../../features/guarantor/guarantorSlice";
import guarantorDetail from "../../features/guarantor/guarantorSlice";
import guarantor from "../../features/guarantor/guarantorSlice";
import customers from "../../features/customerList/customerListSlice";
import customerDetail from "../../features/customerList/customerListSlice";
import applicationsCount from "../../features/application/applicationSlice";
import loanOperationApplicationCount from "../../features/application/applicationSlice";
import getInHouseSurveyCount from "../../features/surveryResult/surveyResultSlice";
import getFieldSurveyCount from "../../features/surveryResult/surveyResultSlice";
import signers from "../../features/signer/signerSlice";
import disbursements from "../../features/disbursement/disbursementSlice";
import billingDates from "../../features/billingDateRegistration/billingDateSlice";
import contracts from "../../features/contract/contractSlice";
import generateLedgers from "../../features/generateLedger/generateLedgerSlice";
import contractDetail from "../../features/contract/contractDetailSlice";
import contractAgreementSetup from "../../features/contractAggrementSetup/contractAggrementSetupSlice";
import stampDutyPayments from "../../features/stampDutyPayment/stampDutyPaymentSlice";
import disbursementPayments from "../../features/disbursementPayment/disbursementPaymentSlice";
import insurancePayments from "../../features/insurancePayment/insurancePaymentSlice";
import bookings from "../../features/bookingProcess/bookingProcessSlice";
import cashDeposits from "../../features/cashDepositProcess/cashDepositSlice";
import generalLedgerEntries from "../../features/generalLedgerEntry/generalLedgerEntrySlice";
import accountCodes from "../../features/cashDepositSetup/AccountCode/accountCodeSlice";
import actualPaymentLines from "../../features/actualPaymentLines/actualPaymentLinesSlice";
import cashDepositBalance from "../../features/cashDepositProcess/cashDepositSlice";
import cashDepositHistory from "../../features/cashDepositProcess/cashDepositSlice";
import earlyTerminationFees from "../../features/earlyTerminationFeesSetup/earlyTerminationFeesSetupSlice";
import earlyTerminationProcesses from "../../features/earlyTerminationProcess/earlyTerminationProcessSlice";
import repayments from "../../features/repayment/repaymentSlice";
import reminders from "../../features/reminderSetup/reminderSetupSlice";
import sms from "../../features/smsSetup/smsSetupSlice";
import values from "../../features/smsSetup/smsSetupSlice";
import customerInfo from "../../features/application/applicationDetailSlice";
import relatedApplications from "../../features/application/applicationDetailSlice";
import provisionSetup from "../../features/provisionSetup/provisionSetupSlice";
import priorities from "../../features/prioritySetup/prioritySlice";
import priorityProperties from "../../features/prioritySetup/prioritySlice";
import collectionFees from "../../features/collectionFeesSetup/collectionFeesSetupSlice";
import collectionFeesPercentageTypes from "../../features/collectionFeesSetup/collectionFeesSetupSlice";
import calculatedValues from "../../features/application/applicationDetailSlice";
import appliedSettlementData from "../../features/appliedSettlementData/appliedSettlementSlice";
import EOM from "../../features/EOM/EOMSlice";
import applicationHistories from "../../features/application/applicationDetailSlice";
import incompleteFields from "../../features/incompleteFields/incompleteFieldsSlice";
import kpayFields from "../../features/incompleteFields/incompleteFieldsSlice";
import dueDates from "../../features/dueDateSetup/dueDateSlice";
import paymentHistory from "../../features/actualPaymentLines/actualPaymentLinesSlice";
import jointApplicants from "../../features/jointApplicant/jointApplicantSlice";
import jointApplicantDetail from "../../features/jointApplicant/jointApplicantSlice";
import jointApplicant from "../../features/guarantor/guarantorSlice";
import createJointApplicant from "../../features/guarantor/guarantorSlice";
import references from "../../features/reference/referenceSlice";
import referenceDetail from "../../features/reference/referenceSlice";
import reference from "../../features/reference/referenceSlice";
import createReferences from "../../features/reference/referenceSlice";
import partnerApplicationList from "../../features/PartnerApplicationList/PartnerApplicationSetupSlice";
import prepareForContracts from "../../features/prepareForContract/prepareForContractSlice";
import updatePrepareForContractByUuid from "../../features/prepareForContract/prepareForContractSlice";
import penaltyLogs from '../../features/penaltyLogs/penaltyLogSlice';
import log from '../../features/penaltyLogs/penaltyLogSlice';
import kpayRepaymentHistories from "../../features/kpayRepaymentHistory/kpayRepaymentHistorySlice";
import demandLetterSetup from "../../features/demandLetterSetup/demandLetterSetupSlice";
import syncEOM from "../../features/eomSync/eomSyncSlice";
import demandLetters from "../../features/demandLetter/demandLetterSlice";
import writeOffs from "../../features/writeOff/writeOffSlice";
import writeOffBatchs from "../../features/writeOffBatch/writeOffBatchSlice";
import emailSetups from "../../features/emailSetup/emailSetupSlice";
import followUpResults from "../../features/FollowUpResult/followUpResultSlice";
import allocateActivities from "../../features/AllocateActivities/allocateActivitiesSlice";
import reminderAllocations from "../../features/reminderAllocation/reminderAllocationSlice";
import reminderAllocationByUuid from "../../features/reminderAllocation/reminderAllocationSlice";
import collectionResponses from "../../features/collectionResponse/collectionResponseSlice";
import reminderAllocationsByContractId from "../../features/reminderAllocation/reminderAllocationHistorySlice";
import contractsReminderAllocation from "../../features/contract/contractReminderAllocationSlice";
import NRCTownshipVariations from "../../features/nrc/NRCVariationTownship/nrcTownshipVarationSlice";
import smsHistories from "../../features/smsHistory/smsHistorySlice";
import smsGenerate from "../../features/smsGenerate/smsGenerateSlice";
import reminderAllocationCounts from "../../features/contract/contractReminderAllocationSlice";
import allocatedReminderCounts from "../../features/reminderAllocation/reminderAllocationSlice";
import applicationResponses from "../../features/applicationResponseSetup/applicationResponseSlice";
import assessmentResponses from "../../features/assessmentResponseSetup/assessmentResponseSlice";
import externalResponses from "../../features/applicationResponseSetup/applicationResponseSlice";
import externalAssessmentResponses from "../../features/assessmentResponseSetup/assessmentResponseSlice";
import internalResponses from "../../features/applicationResponseSetup/applicationResponseSlice";
import applicationCardResponses from "../../features/applicationResponseSetup/applicationResponseSlice";
import applicationReasons from "../../features/applicationReason/applicationReasonSlice";
import applicationReasonsByStatus from "../../features/applicationReason/applicationReasonSlice";
import kpaySyncAccounts from "../../features/kpaySynAccount/kpaySyncAccountSlice";
import kpayNotifications from "../../features/kpayNotification/kpayNotificationSlice";
import creditCriteria from "../../features/creditCriteria/creditCriteriaSlice";
import creditCriteriaTypes from "../../features/creditCriteria/creditCriteriaTypeSlice";
import creditCriteriaData from "../../features/creditCriteria/creditCriteriaSlice";
import creditCriteriaParentData from "../../features/creditCriteria/creditCriteriaSlice";
import creditCriteriaKeys from "../../features/creditCriteria/creditCriteriaKeySlice";
import allCreditCriteria from "../../features/creditCriteria/creditCriteriaSlice";
import latestCreditCriteria from "../../features/creditCriteria/creditCriteriaSlice";
import creditCriteriaVersions from "../../features/creditCriteria/creditCriteriaVersionSlice";
import allCreditCriteriaHistory from "../../features/creditCriteria/allCreditCriteriaSlice";
import addressVillageData from "../../features/address/Village/addressVillageSlice";
import addressVillageTractData from "../../features/address/VillageTract/addressVillageTractSlice";
import addressWardData from "../../features/address/Ward/addressWardSlice";
import dealerGroups from "../../features/dealerGroup/dealerGroupSlice";
import dealerPackages from "../../features/dealerPackage/dealerPackageSlice";
import dealers from "../../features/dealer/dealerSlice";
import dealerContactPeople from "../../features/dealerContactPerson/dealerContactPersonSlice";
import dealerBanks from "../../features/dealerBank/dealerBankSlice";
import customerInquiries from "../../features/customerInquiriesForm/customerInquiriesFormSlice";
import refinanceCustomers from "../../features/refinanceCustomer/refinanceCustomerSlice";
import guaranteeData from "../../features/dealer/dealerGuaranteeSlice";
import guaranteeCount from "../../features/dealer/dealerGuaranteeSlice";
import mobApplicationsCount from "../../features/mobCounts/mobCountSlice";
import mobSurveysCount from "../../features/mobCounts/mobCountSlice";
import mobDownPaymentsCount from "../../features/mobCounts/mobCountSlice";
import mobContractsCount from "../../features/mobCounts/mobCountSlice";
import mobSaleInvoicesCount from "../../features/mobCounts/mobCountSlice";
import mobRemindersCount from "../../features/mobCounts/mobCountSlice";
import vehicles from "../../features/vehicleSetup/vehicleSlice";
import vehicleInformation from "features/vehicleInformation/vehicleInformationSlice";
import brands from "../../features/brandSetup/BrandSlice";
import models from "../../features/modelSetup/ModelSlice";
import cmcoUsers from "../../features/users/usersSlice";
import refinanceCustomer from "../../features/application/applicationDetailSlice";
import creditSchemes from "../../features/creditSchemeSetup/creditSchemeSlice";
import lockApplication from "../../features/application/applicationSlice";
import agents from "../../features/users/usersSlice";
import surveyInformation from "../../features/surveyInformation/surveyInformationSlice";
import insuranceCompanies from "../../features/insuranceCompany/insuranceCompanySlice";
import insurancePremiumFees from "../../features/insurancePremiumFee/insurancePremiumFeeSlice";
import initialPaymentCalculations from "../../features/initialPaymentCalculation/initialPaymentCalSlice";
import insuranceInspections from "../../features/insuranceInspection/insuranceInspectionSlice";
import inspectionEmail from "../../features/insuranceInspection/insuranceInspectionSlice";
import COR from "../../features/COR/CORSlice";
import applicationDownPayments from "../../features/applicationDownPayment/applicationDownPaymentSlice";
import applicationCountBeforeContract from "../../features/application/applicationSlice";
import firstDueDateSetups from "../../features/firstDueDateSetup/firstDueDateSetupSlice";
import applicationSignatures from "../../features/application/applicationSignatureSlice";
import guarantorInfo from "../../features/guarantor/guarantorCheckNrcSlice";
import generalLedgerEntrySetups from "../../features/generalLedgerEntrySetup/generalLedgerEntrySetupSlice";
import collateralTypes from "../../features/collateralTypesSetup/collateralTypesSetupSlice";
import collaterals from "../../features/collateral/collateralSlice";
import collateralSignature from "../../features/collateralSignature/collateralSignatureSlice";
import lockCollateral from "../../features/collateral/collateralSlice";
import invoiceFlag from "../../features/application/applicationSlice";
import actualPaymentLinesByContractId from "../../features/contract/contractDetailSlice";
import writeOffSignature from "../../features/writeOffSignature/writeOffSignatureSlice";
import generalLedgerEnteriesSyncPost from "../../features/stampDutyPayment/stampDutyPaymentSlice";
import writeOffContract from "features/writeOffContract/writeOffContractSlice";
import writeOffRecoveryIncomes from "features/writeOffRecoveryIncome/writeOffRecoveryIncomeSlice";
import earlyTerminationInfo from "features/earlyTerminationFeesSetup/earlyTerminationFeesSetupSlice";
import lastPayments from "features/lastPaymentSetup/lastPaymentSlice";
import insufficientContracts from "features/insufficientPayment/insufficientPaymentSlice";
import insufficientPaymentBatchs from "features/insufficientPaymentBatch/insufficientPaymentBatchSlice";
import lastPaymentHistory from "features/lastPaymentSetup/lastPaymentSlice";
import blackListArea from "features/address/BlackListArea/blackListAreaSlice";
import excludeBlackListArea from "features/address/ExcludeBlackListArea/excludeBlackListAreaSlice";
import customerBanks from "../../features/customerBank/customerBankSlice";
import contractGeneralLedgers from "../../features/contract/contractGLSlice";
import nameOfBusinesses from "../../features/nameOfBusiness/nameOfBusinessSlice";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
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
  applicationInformationSetup,
  addressStates,
  addressDistricts,
  addressTownships,
  addressCities,
  addressWards,
  addressVillageTracts,
  addressVillages,
  nrcStates,
  nrcTownships,
  contactTypes,
  surveyTypes,
  surveyHeaders,
  surveyQAs,
  surveyQAsByHeader,
  surveyHeader,
  surveyQuestions,
  typeofBusinesses,
  mainBusinessCategories,
  subBusinessCategories,
  documentTypes,
  downPaymentSetups,
  blacklistCustomers,
  nrcRemarks,
  table,
  application,
  applicationDetail,
  menuApplicationSetup,
  surveyResult,
  numberSeries,
  users,
  workflows,
  approvalWorkflows,
  fileAttaches,
  assessments,
  documentAccesses,
  surveyTransactions,
  applicationInformationSetupList,
  data,
  guarantors,
  guarantorDetail,
  guarantor,
  customers,
  customerDetail,
  applicationsCount,
  getInHouseSurveyCount,
  getFieldSurveyCount,
  signers,
  disbursements,
  billingDates,
  contractAgreementSetup,
  contracts,
  generateLedgers,
  contractDetail,
  stampDutyPayments,
  disbursementPayments,
  insurancePayments,
  bookings,
  user,
  cashDeposits,
  generalLedgerEntries,
  accountCodes,
  actualPaymentLines,
  cashDepositBalance,
  cashDepositHistory,
  earlyTerminationFees,
  earlyTerminationProcesses,
  repayments,
  reminders,
  sms,
  values,
  loanOperationApplicationCount,
  provisionSetup,
  customerInfo,
  relatedApplications,
  priorities,
  priorityProperties,
  collectionFees,
  collectionFeesPercentageTypes,
  calculatedValues,
  appliedSettlementData,
  EOM,
  applicationHistories,
  incompleteFields,
  kpayFields,
  dueDates,
  paymentHistory,
  jointApplicants,
  jointApplicantDetail,
  jointApplicant,
  createJointApplicant,
  references,
  referenceDetail,
  reference,
  createReferences,
  partnerApplicationList,
  prepareForContracts,
  updatePrepareForContractByUuid,
  penaltyLogs,
  log,
  kpayRepaymentHistories,
  demandLetterSetup,
  syncEOM,
  demandLetters,
  writeOffs,
  writeOffBatchs,
  emailSetups,
  followUpResults,
  allocateActivities,
  reminderAllocations,
  reminderAllocationByUuid,
  collectionResponses,
  reminderAllocationsByContractId,
  contractsReminderAllocation,
  NRCTownshipVariations,
  smsGenerate,
  smsHistories,
  reminderAllocationCounts,
  allocatedReminderCounts,
  applicationResponses,
  assessmentResponses,
  externalResponses,
  externalAssessmentResponses,
  internalResponses,
  applicationCardResponses,
  applicationReasons,
  applicationReasonsByStatus,
  kpaySyncAccounts,
  kpayNotifications,
  creditCriteria,
  creditCriteriaTypes,
  creditCriteriaData,
  creditCriteriaParentData,
  creditCriteriaKeys,
  allCreditCriteria,
  latestCreditCriteria,
  creditCriteriaVersions,
  allCreditCriteriaHistory,
  addressVillageData,
  addressVillageTractData,
  addressWardData,
  dealerGroups,
  dealerPackages,
  dealers,
  dealerContactPeople,
  dealerBanks,
  customerInquiries,
  refinanceCustomers,
  vehicleInformation,
  vehicles,
  brands,
  models,
  guaranteeData,
  guaranteeCount,
  mobApplicationsCount,
  mobDownPaymentsCount,
  mobSurveysCount,
  mobContractsCount,
  mobSaleInvoicesCount,
  mobRemindersCount,
  cmcoUsers,
  refinanceCustomer,
  creditSchemes,
  lockApplication,
  lockCollateral,
  agents,
  surveyInformation,
  insuranceCompanies,
  insurancePremiumFees,
  initialPaymentCalculations,
  insuranceInspections,
  inspectionEmail,
  COR,
  applicationDownPayments,
  applicationCountBeforeContract,
  firstDueDateSetups,
  applicationSignatures,
  guarantorInfo,
  generalLedgerEntrySetups,
  collateralTypes,
  collaterals,
  collateralSignature,
  invoiceFlag,
  actualPaymentLinesByContractId,
  writeOffSignature,
  generalLedgerEnteriesSyncPost,
  writeOffContract,
  writeOffRecoveryIncomes,
  earlyTerminationInfo,
  lastPayments,
  insufficientContracts,
  insufficientPaymentBatchs,
  lastPaymentHistory,
  blackListArea,
  excludeBlackListArea,
  contractGeneralLedgers,
  nameOfBusinesses
});

export default reducers;
