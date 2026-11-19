import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import DocumentTypeSetupIndex from "../modules/administration/pages/Administration/DocumentTypeSetup/DocumentTypeSetupIndex";
import ProjectCategoryIndex from "../modules/administration/pages/Administration/ProjectCategory/ProductCategoryList";
import BlackListCustomerSetupIndex from "../modules/collection/setup/BlackListCustomerSetup/BlackListCustomerSetupIndex";
import CreateBlackListCustomerSetup from "../modules/collection/setup/BlackListCustomerSetup/CreateBlackListCustomerSetup";
import EditBlackListCustomerSetup from "../modules/collection/setup/BlackListCustomerSetup/EditBlackListCustomerSetup";
import PermissionSetsList from "../modules/administration/pages/Administration/PermissionSets/PermissionSetsList";
import UserGroupListing from "../modules/administration/pages/Administration/UserGroup/UserGroupListing";
import TypeofBusinessList from "modules/administration/pages/Administration/TypeofBusiness/TypeofBusinessList";
import SubBusinessCategoryList from "modules/administration/pages/Administration/SubBusinessCategory/SubBusinessCategoryList";
import MainLayout from "../layout/MainLayout";
import SurveyResultList from "modules/credit-management/pages/CreditManagement/SurveyResultList/SurveyResultList";
import AssementList from "modules/credit-management/pages/CreditManagement/AssementList/AssementListIndex";
import ApplicationInfrmationSetupList from "modules/credit-management/setup/ApplicationInformationSetupList/ApplicationInformationSetupList";
import CustomerList from "modules/credit-management/pages/CreditManagement/CustomerList/CustomerListIndex";
import ProjectFDashboardIndex from "modules/credit-management/pages/CreditManagement/Dashboard/ProjectFDashboardIndex";
import { element } from "prop-types";
import InitialPaymentCalIndex from "modules/loan-operation/pages/LoanOperationModule/InitialPaymentCalculation/InitialPaymentCalIndex";
import VehicleInfoIndex from "modules/loan-operation/pages/LoanOperationModule/VehicleInfo/VehicleInfoIndex";

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("pages/dashboard")));

// render - sample page
const SamplePage = Loadable(lazy(() => import("pages/extra-pages/SamplePage")));

// render - test page
const Usersetup = Loadable(lazy(() => import("pages/admin/Usersetup")));

// render - utilities
const Typography = Loadable(
  lazy(() => import("pages/components-overview/Typography"))
);
const Color = Loadable(lazy(() => import("pages/components-overview/Color")));
const Shadow = Loadable(lazy(() => import("pages/components-overview/Shadow")));
const AntIcons = Loadable(
  lazy(() => import("pages/components-overview/AntIcons"))
);

const Department = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Department/DepartmentList"))
);
const Position = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Position/PositionList"))
);
const Bank = Loadable(lazy(() => import("modules/administration/pages/Administration/Bank/BankList")));


const CustomerBank = Loadable(lazy(() => import("modules/administration/pages/Administration/CustomerBankSetUp/CustomerBankIndex")));


const SubCategory = Loadable(
  lazy(() => import("modules/administration/pages/Administration/SubCategory/SubCategoryList"))
);
const FirstDueDateSetup = Loadable(
  lazy(() => import("modules/loan-operation/setup/FirstDueDateSetup/FirstDueDateSetupList"))
);
const NumberSeries = Loadable(
  lazy(() => import("modules/administration/pages/Administration/NumberSeries/NumberSeriesList"))
);
const NRCStateIndex = Loadable(
  lazy(() => import("modules/administration/pages/Administration/NRC/NRCState/NRCStateIndex"))
);
const NRCTownshipIndex = Loadable(
  lazy(() => import("modules/administration/pages/Administration/NRC/NRCTownship/NRCTownshipIndex"))
);
const TableSetup = Loadable(
  lazy(() => import("modules/administration/pages/Administration/TableSetup/TableSetupIndex"))
);
const DocumentAttachIndex = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/DocumentAttachTable/DocumentAttachIndex")
  )
);

const SignerList = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Signer/SignerList"))
);

const DueDateList = Loadable(
  lazy(() => import("modules/administration/pages/Administration/DueDateSetup/DueDateList"))
);

const BillingDateList = Loadable(
  lazy(() =>
    import("modules/loan-operation/setup/BillingDateRegistration/BillingDateList")
  )
);

const DisbursementList = Loadable(
  lazy(() => import("modules/loan-operation/setup/Disbursement/DisbursementList"))
);

const MainBusinessCategoryList = Loadable(
  lazy(() =>
    import(
      "modules/administration/pages/Administration/MainBusinessCategory/MainBusinessCategoryIndex"
    )
  )
);

const ApplicationInformation = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationInformationList/ApplicationInformationListIndex"
    )
  )
);
//const PermissionSets = Loadable(lazy(() => import("modules/administration/pages/Administration/PermissionSets/PermissionSetsList")))
const CreateApplicationInformationIndex = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/CreateApplicationInformation/CreateApplicationInformationIndex"
    )
  )
);
const ApplicationAttachment = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationAttachment/ApplicationAttachmentIndex"
    )
  )
);

const ContractAttachment = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/Contract/ContractAttachment/ContractAttachmentIndex"
    )
  )
);

const CreateApplicationInformationSetup = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/setup/ApplicationInformationSetup/CreateApplicationInformationSetup"
    )
  )
);

const CreateContractFormSetup = Loadable(
  lazy(() =>
    import("modules/loan-operation/setup/ContractForm/CreateContractFormSetup")
  )
);

const AddressStateIndex = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Address/State/AddressStateIndex"))
);
const AddressDistrictIndex = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/Address/District/AddressDistrictIndex")
  )
);
const AddressTownshipIndex = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/Address/Township/AddressTownshipIndex")
  )
);
const AddressCityIndex = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Address/City/AddressCityIndex"))
);
const AddressWardIndex = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Address/Ward/AddressWardIndex"))
);
const AddressVillageTractIndex = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/Address/VillageTract/AddressVillageTractIndex")
  )
);
const AddressVillageIndex = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Address/Village/AddressVillageIndex"))
);
const InHouseSurveyIndex = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/InHouseSurvey/InHouseSurveyIndex"
    )
  )
);

const SurveyListInHouseSurvey = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/SurveyResultList/InHouseSurvey/InHouseSurveyIndex"
    )
  )
);

const SurveyNameSetup = Loadable(
  lazy(() =>
    import("modules/credit-management/setup/SurveySetup/SurveyNameSetup/SurveyNameSetup")
  )
);
const SurveyQuestionSetup = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/setup/SurveySetup/SurveyQuestionSetup/SurveyQuestionSetup"
    )
  )
);
const DownPaymentSchemeSetup = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/setup/DownPaymentSchemeSetup/DownPaymentSchemeSetupList"
    )
  )
);

const ApplicationAssessmentListIndex = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationAssessment/ApplicationAssessmentList/ApplicationAssessmentListIndex"
    )
  )
);

const ApplicationGuarantorListIndex = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationGuarantor/ApplicationGuarantorList/ApplicationGuarantorListIndex"
    )
  )
);

const ApplicationCollateralListIndex = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationCollateral/ApplicationCollateralList/ApplicationCollateralListIndex"
    )
  )
);

const ApplicationReferenceListIndex = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationReference/ApplicationReferenceList/ApplicationReferenceListIndex"
    )
  )
);

const ApplicationJointApplicantListIndex = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationJointApplicant/ApplicationJointApplicantList/JointApplicantListIndex"
    )
  )
);

const EditApplicationAssessment = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationAssessment/EditApplicationAssessment/EditApplicationAssessment"
    )
  )
);

const CreateApplicationGuarantor = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationGuarantor/CreateEditViewGuarantor/ApplicationGuarantorIndex"
    )
  )
);

const CreateApplicationCollateral = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationCollateral/CreateEditViewCollateral/ApplicationCollateralIndex"
    )
  )
);

const CreateApplicationReference = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationReference/CreateEditViewReference/ApplicationReferenceIndex"
    )
  )
);

const CreateApplicationJointApplicant = Loadable(
  lazy(() =>
    import(
      "modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationJointApplicant/CreateEditViewJointApplicant/ApplicationJointApplicantIndex"
    )
  )
);

const DetailApplicationAssementList = Loadable(
  lazy(() =>
    import("modules/credit-management/pages/CreditManagement/AssementList/DetailApplicationAssessment")
  )
);

const CustomerDetail = Loadable(
  lazy(() => import("modules/credit-management/pages/CreditManagement/CustomerList/CustomerDetailIndex"))
);

const Workflow = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Workflow/WorkflowList"))
);
const ApprovalWorkflow = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/ApprovalWorkflow/ApprovalWorkflowList")
  )
);

const CreateNewUserGroup = Loadable(
  lazy(() => import("modules/administration/pages/Administration/UserGroup/CreateEditUserGroup"))
);

const UsersList = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Users/UsersList"))
);

const CreateContractAgreementSetup = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/setup/ContractAggrementSetup/CreateContractAggrementSetup/CreateContractAgreementSetup"
    )
  )
);

const ContractAgreementSetupList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/setup/ContractAggrementSetup/ContractAggrementSetupList/ContractAgreementSetupListIndex"
    )
  )
);

const CreateDemandLetterSetup = Loadable(
  lazy(() =>
    import(
      "modules/collection/setup/DemandLetterSetup/CreateDemandLetterSetup/CreateDemandLetterSetup"
    )
  )
);

const DemandLetterSetupList = Loadable(
  lazy(() =>
    import(
      "modules/collection/setup/DemandLetterSetup/DemandLetterSetupList/DemandLetterSetupListIndex"
    )
  )
);

const ApprovedApplicationListIndex = Loadable(
  lazy(() =>
    import("modules/loan-operation/pages/LoanOperationModule/SetDisbursement/SetDisbursedTableIndex")
  )
);

const SMSGenerateForLoanSkipTableIndex = Loadable(
  lazy(() =>
    import("modules/loan-operation/pages/LoanOperationModule/SMSGenerateForLoanSkip/SMSGenerateForLoanSkipTableIndex")
  )
);

const PrepareForContractTableIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/PrepareForContract/PrepareForContractList/PrepareForContractTableIndex"
    )
  )
);

const LoanOperationApplicationListDashboard = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/Dashboard/LoanApplicationListDashboard"
    )
  )
);

const LoanOperationApplicationListIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/LoanOperationApplicationInformationList/LoanOperationApplicationInformationListIndex"
    )
  )
);

const GenerateLedgerListIndex = Loadable(
  lazy(() =>
    import("modules/loan-operation/pages/LoanOperationModule/GenerateLedger/GenerateLedgerTableIndex")
  )
);

const UserProfileIndex = Loadable(
  lazy(() => import("modules/administration/pages/Administration/Users/UserProfileIndex"))
);

const ContractListIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/Contract/ContractInformationList/ContractTableIndex"
    )
  )
);

const ExceedPaymetIndex = Loadable(
  lazy(() =>
    import(
      "modules/collection/pages/CollectionModule/ExceedPayment/ExceedPaymentIndex"
    )
  )
);

const UpdateVehicleInformationIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/UpdateVehicleInformaton/UpdateVehicleInformationIndex"
    )
  )
);

const RequestForBookingIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/RequestForBooking/RequestForBookingList/RequestForBookingTableIndex"
    )
  )
);

const BookingProcessesIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/BookingProcess/BookingProcessList/BookingProcessTableIndex"
    )
  )
);

const BookingProcessesHistoryIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/BookingProcess/BookingProcessHistoryList/BookingProcessHistoryTableIndex"
    )
  )
);

const RequestForDisbursementTableIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/RequestForDisursementList/RequestForDisursementTableIndex"
    )
  )
);

const DisbursementPaymentList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/DisbursementPayment/DisbursementPaymentsListIndex"
    )
  )
);

const EditContractIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/Contract/ContractDetail/EditContractIndex"
    )
  )
);

const EditWriteOffRepaymentContractIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/Contract/WriteOffRepaymentContractDetail/EditWriteOffRepaymentContractIndex"
    )
  )
);

const EditPrepareForContractIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/PrepareForContract/PrepareForContractDetail/EditPrepareForContractIndex"
    )
  )
);

const StampDutyPaymentList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/StampDutyPayment/StampDutyPaymentListIndex"
    )
  )
);

const CollateralList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/CollateralList/CollateralListIndex"
    )
  )
);

const CollateralLicenseList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/CollateralLicenseList/CollateralLicenseListIndex"
    )
  )
);

const CollateralInsuranceList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/CollateralInsuranceList/CollateralInsuranceListIndex"
    )
  )
);

const CollateralRepaymentList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/RepaymentCollateralList/RepaymentCollateralListIndex"
    )
  )
);

const InsurancePaymentList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/InsurancePayment/InsurancePaymentListIndex"
    )
  )
);

const DisbursementPaymentHistoryList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/DisbursementPaymentHistory/DisbursementPaymentHistoryListIndex"
    )
  )
);

const StampDutySettlementList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/StampDutySettlement/StampDutySettlementListIndex"
    )
  )
);

const StampDutyPaymentByBatchIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/StampDutyPaymentByBatch/StampDutyPaymentIndex"
    )
  )
);

const InsurancePaymentByBatchIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/insurancePaymentByBatch/InsurancePaymentIndex"
    )
  )
);

const DisbursementPaymentByBatchIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/DisbursementPaymentByBatch/DisbursementPaymentIndex"
    )
  )
);

const BookingProcessIndex = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/BookingProcess/BookingProcess/BookingProcessIndex"
    )
  )
);

const RequestForDisbursement = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/RequestForDisursement/RequestForDisbursementIndex"
    )
  )
);

const AccountCodeIndex = Loadable(
  lazy(() =>
    import("modules/finance/setup/CashDepositSetup/AccountCode/AccountCodeIndex")
  )
);
const StampDutyBatchList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/StampDutyPaymentBatch/StampDutyBatchListIndex"
    )
  )
);

const InsuranceBatchList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/InsurancePaymentBatch/InsuranceBatchListIndex"
    )
  )
);

const DisbursementBatchList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/DisbursementPaymentBatch/DisbursementBatchListIndex"
    )
  )
);

const CashDepositProcessList = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/CashDepositProcessAndAccount/CashDepositProcessList/CashDepositProcessListIndex"
    )
  )
);

const CreateCashDeposit = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/CashDepositProcessAndAccount/CreateCashDeposit/CashDepositProcessIndex"
    )
  )
);

const GeneralLedgerEntry = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/GeneralLedgerEntry/GeneralLedgerEntryListIndex"
    )
  )
);


const CollateralTypeSetup = Loadable(
  lazy(() =>
    import(
      "modules/administration/pages/Administration/CollateralTypeSetup/CollateralTypeIndex"
    )
  )
);


const ActualPaymentLines = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/ActualPaymentLines/ActualPaymentLinesTable"
    )
  )
);

const WaveMoneyReport = Loadable(
  lazy(() =>
    import(
      "modules/loan-operation/pages/LoanOperationModule/WaveMoneyReport/WaveMoneyReportTable"
    )
  )
);


const EarlyTerminationFeesSetupListIndex = Loadable(
  lazy(() =>
    import(
      "modules/collection/setup/EarlyTerminationFeesSetup/EarlyTerminationFeesSetupList"
    )
  )
);

const CollectionFeesSetupListIndex = Loadable(
  lazy(() =>
    import("modules/collection/setup/CollectionFeesSetup/CollectionFeesSetupList")
  )
);

const EarlyTerminationProcessListIndex = Loadable(
  lazy(() =>
    import(
      "modules/collection/pages/CollectionModule/EarlyTerminationProcess/EarlyTerminationProcessList/EarlyTerminationProcessListIndex"
    )
  )
);

const CreateEarlyTerminationProcess = Loadable(
  lazy(() =>
    import(
      "modules/collection/pages/CollectionModule/EarlyTerminationProcess/CreateEarlyTerminationProcess/CreateEarlyTerminationProcessIndex"
    )
  )
);

const RepaymentList = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/Repayment/RepaymentList/RepaymentListIndex")
  )
);

const RepaymentCreate = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/Repayment/RepaymentIndex/RepaymentIndex")
  )
);

const RepaymentIndex = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/Repayment/RepaymentIndex/RepaymentIndex")
  )
);

const AppliedSettlementDataIndex = Loadable(
  lazy(() =>
    import(
      "modules/collection/pages/CollectionModule/Repayment/AppliedSettlementData/AppliedSettlementDataIndex"
    )
  )
);

const ProvisionListIndex = Loadable(
  lazy(() =>
    import("modules/finance/pages/Finance/ProvisionSetup/ProvisionList/ProvisionListIndex")
  )
);

const PriorityIndex = Loadable(
  lazy(() => import("modules/finance/setup/PrioritySetup/index"))
);
const JobQueueLogEntryListIndex = Loadable(
  lazy(() => import("modules/finance/pages/Finance/EOM/EOMLogEntryList/EOMLogEntryListIndex"))
);

const JobQueueLogEntryIndex = Loadable(
  lazy(() => import("modules/finance/pages/Finance/EOM/EOMLogEntry/EOMLogEntryIndex"))
);

const EomSyncIndex = Loadable(
  lazy(() => import("modules/finance/pages/Finance/EOM/EOMSync/EOMSyncListIndex"))
);

const ReminderSetupListIndex = Loadable(
  lazy(() => import("modules/collection/setup/ReminderSetup/ReminderSetupList"))
);

const SMSSetupListIndex = Loadable(
  lazy(() =>
    import("modules/collection/setup/SMSSetup/SMSSetupList/SMSSetupListIndex")
  )
);
const CreateEditSMSSetupIndex = Loadable(
  lazy(() =>
    import("modules/collection/setup/SMSSetup/CreateSMSSetup/CreateEditSMSSetupIndex")
  )
);
const GeneralLedgerEntrySetupListIndex = Loadable(
  lazy(() =>
    import("modules/finance/setup/GeneralLedgerEntrySetup/GeneralLedgerEntrySetupList/GeneralLedgerEntrySetupListIndex")
  )
);
const CreateEditGeneralLedgerEntrySetupIndex = Loadable(
  lazy(() =>
    import("modules/finance/setup/GeneralLedgerEntrySetup/CreateGeneralLedgerEntrySetup/CreateEditGeneralLedgerEntrySetupIndex")
  )
);

const PartnerApplicationList = Loadable(
  lazy(() => import("modules/administration/pages/Administration/PartnerApplicationList/PartnerApplicationList"))
);

const Reportist = Loadable(
  lazy(() => import("modules/credit-management/pages/CreditManagement/Reports/ReportTable"))
);

const PenaltyLogList = Loadable(
  lazy(() => import('modules/collection/pages/CollectionModule/PenaltyLog/PenaltyLogTableIndex'))
);

const KPayRepaymentList = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/KPayRepayment/KPayRepaymentHistory/KPayRepaymentListIndex")
  )
);

const WriteOffPreparation = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/WriteOffPreparationList/WriteOffPreparationTableIndex")
  )
);

const WriteOffList = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/WriteOffList/WriteOffListTableIndex")
  )
);

const WriteOffBatch = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/WriteOffBatchList/WriteOffBatchListIndex")
  )
);

const CreateWriteOffBatch = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/CreateWriteOffBatch/CreateWriteOffBatchIndex")
  )
);

const EmailSetupList = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/EmailSetup/EmailSetupList")
  )
);

const FollowUpResultList = Loadable(
  lazy(() =>
    import("modules/collection/setup/FollowUpResultSetup/FollowUpResultIndex")
  )
);

const AllocateActivitiesList = Loadable(
  lazy(() =>
    import("modules/collection/setup/AllocateActivitiesSetup/AllocateActivitiesIndex")
  )
);

const ReminderAllocation = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/ReminderAllocation/ReminderAllocationTableIndex")
  )
);

const AllocatedReminder = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/AllocatedReminder/AllocatedReminderTableIndex")
  )
);

const SmsHistoryListIndex = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/SMSList/SMSListIndex")
  )
);

const ApplicationResponseSetupIndex = Loadable(
  lazy(() =>
    import("modules/credit-management/setup/ApplicationResponseSetup/ApplicationResponseList")
  )
);

const AssessmentResponseSetupIndex = Loadable(
  lazy(() =>
    import("modules/credit-management/setup/AssessmentResponseSetup/AssessmentResponseList")
  )
);

const CollectionReportListIndex = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/CollectionReport/CollectionReportTable")
  )
);

const AllocatedReminderHistory = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/AllocatedReminderHistory/AllocatedReminderHistoryTableIndex")
  )
);

const StatusCategoryListIndex = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/StatusCategory/StatusCategoryList")
  )
);

const KPayRepaymentIndex = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/KPayRepayment/KPayRepayment/RepaymentIndex")
  )
);

const KPaySyncAccountsIndex = Loadable(
  lazy(() =>
    import("modules/loan-operation/pages/LoanOperationModule/KpaySyncAccounts/KpaySyncAccounts")
  )
);

const KPayNotificationIndex = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/KpayNotification/KpayNotificationListIndex")
  )
);

const CreditCriteriaListIndex = Loadable(
  lazy(() => import("modules/credit-management/pages/CreditManagement/CreditCriteriaSetup/CreditCriteriaListIndex"))
);

const CreditCriteriaKeyIndex = Loadable(
  lazy(() => import("modules/credit-management/pages/CreditManagement/CreditCriteriaKeySetup/CreditCriteriaKeyListIndex"))
);

const CreditCriteriaHistoryIndex = Loadable(
  lazy(() => import("modules/credit-management/pages/CreditManagement/AllCreditCriteria/CreditCriteriaListIndex"))
);

const DealerGroupIndex = Loadable(
  lazy(() => import("modules/loan-operation/setup/MOBSetup/DealerGroupSetup/DealerGroupIndex"))
);

const DealerPackageIndex = Loadable(
  lazy(() => import("modules/loan-operation/setup/MOBSetup/DealerPackageSetup/DealerPackageIndex"))
);

const DealerIndex = Loadable(
  lazy(() => import("modules/loan-operation/setup/MOBSetup/DealerSetup/DealerIndex"))
);

const VehicleIndex = Loadable(
  lazy(() => import("modules/loan-operation/setup/MOBSetup/VehicleSetup/VehicleIndex"))
);

const BrandIndex = Loadable(
  lazy(() => import("modules/loan-operation/setup/MOBSetup/BrandSetup/BrandIndex"))
);

const ModelIndex = Loadable(
  lazy(() => import("modules/loan-operation/setup/MOBSetup/ModelSetup/ModelIndex"))
);

const DealerContactPersonIndex = Loadable(
  lazy(() => import("modules/loan-operation/setup/MOBSetup/DealerContactPersonSetup/DealerContactPersonIndex"))
);

const DealerBankIndex = Loadable(
  lazy(() => import("modules/loan-operation/setup/MOBSetup/DealerBankSetup/DealerBankIndex"))
);

const CustomerInqueriesFormIndex = Loadable(
  lazy(() => import("modules/credit-management/pages/CreditManagement/CustomerInquiriesForm/CustomerInquiriesIndex"))
);

const RefinanceCustomerIndex = Loadable(
  lazy(() => import("modules/credit-management/setup/PDSD/RefinanceCustomerSetup/RefinanceCustomerIndex"))
);

const CreditSchemeIndex = Loadable(
  lazy(() => import("modules/loan-operation/setup/MOBSetup/CreditSchemeSetup/CreditSchemeIndex"))
)


const SurveyInformationIndex = Loadable(
  lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/SurveyInformationList/SurveyInformationTableIndex"))
)

const InsuranceCompanySetup = Loadable(
  lazy(() =>
    import("modules/loan-operation/setup/InsuranceCompanySetup/InsuranceCompanyIndex")
  )
);

const InsurancePremiumFeeSetup = Loadable(
  lazy(() =>
    import("modules/loan-operation/setup/InsuranceFeesSetup/InsurancePremiumFeeIndex")
  )
);

const InsuranceInspectionIndex = Loadable(
  lazy(() =>
    import("modules/loan-operation/pages/LoanOperationModule/InsuranceInspection/InsuranceInspectionIndex")
  )
);

const CORIndex = Loadable(
  lazy(() =>
    import("modules/loan-operation/pages/LoanOperationModule/CORCard/CORIndex")
  )
);

const CollateralSignatureIndex = Loadable(
  lazy(() =>
    import("modules/loan-operation/pages/LoanOperationModule/CollateralSignature/CollateralSignatureIndex")
  )
);

const WriteOffSignatureIndex = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/CreateWriteOffBatch/writeOffSignature/writeOffSignatureIndex")
  )
);

const ApplicationDownPayment = Loadable(
  lazy(() =>
    import("modules/loan-operation/pages/LoanOperationModule/ApplicationDownPayment/ApplicationDownPaymentList/ApplicationDownPaymentListIndex")
  )
);

const EditApplicationDownPayment = Loadable(
  lazy(() =>
    import("modules/loan-operation/pages/LoanOperationModule/ApplicationDownPayment/EditApplicationDownPayment/EditApplicationDownPayment")
  )
);

const LastPaymentSetupList = Loadable(
  lazy(() =>
    import("modules/finance/setup/LastPaymentSetup/LastPaymentSetupIndex")
  )
);

const InsufficientPaymentList = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/InsufficientPayment/InsufficientPaymentList/InsufficientPaymentTableIndex")
  )
);

const CreateInsufficientPaymentBatch = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/InsufficientPayment/CreateInsufficientPaymentBatch/CreateInsufficientPaymentBatchIndex")
  )
);

const InsufficientPaymentBatchList = Loadable(
  lazy(() =>
    import("modules/collection/pages/CollectionModule/InsufficientPayment/InsufficientPaymentBatchList/InsufficientBatchListIndex")
  )
);

const BlackListAreaIndex = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/Address/BlackListArea/BlackListAreaIndex")
  )
);

const ExcludeBlackListAreaIndex = Loadable(
  lazy(() =>
    import("modules/administration/pages/Administration/Address/ExcludeBlackListArea/ExcludeBlackListAreaIndex")
  )
);

const CalculatePenalties = Loadable(
  lazy(() =>
    import(
      "modules/collection/pages/CollectionModule/CalculatePenalties/CalculatePenaltiesIndex"
    )
  )
);

const CustomerWebApplicationTableIndex = Loadable(
  lazy(() =>
    import("modules/credit-management/pages/MOB-CustomerWebApplication/ApplicationInformationList/ApplicationInformationListIndex")
  )
);

const CustomerWebApplication = Loadable(
  lazy(() =>
    import("modules/credit-management/pages/MOB-CustomerWebApplication/CreateApplicationInformation/CreateApplicationInformationIndex")
  )
);

const NameOfBusinessIndex = Loadable(
  lazy(() => import("modules/credit-management/setup/PDSD/NameOfBusinessSetup/NameOfBusinessIndex"))
);

const SignatureCorrectionIndex = Loadable(
  lazy(() => import("modules/loan-operation/pages/LoanOperationModule/SignatureCorrection/SignatureCorrectionIndex"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashboardDefault />,
      },
      {
        path: "color",
        element: <Color />,
      },
      {
        path: "dashboard",
        children: [
          {
            path: "default",
            element: <DashboardDefault />,
          },
        ],
      },
      {
        path: "Admin",
        element: <Usersetup />,
      },
      {
        path: "sample-page",
        element: <SamplePage />,
      },

      {
        path: "shadow",
        element: <Shadow />,
      },
      {
        path: "typography",
        element: <Typography />,
      },
      {
        path: "icons/ant",
        element: <AntIcons />,
      },
      {
        path: "administration",
        children: [
          {
            path: "email-setup",
            element: <EmailSetupList />,
          },
          {
            path: "document-type-setup",
            element: <DocumentTypeSetupIndex />,
          },
          {
            path: "product-category",
            element: <ProjectCategoryIndex />,
          },
          {
            path: "SubCategory",
            element: <SubCategory />,
          },
          {
            path: "FirstDueDateSetup",
            element: <FirstDueDateSetup />,
          },
          {
            path: "GeneralLedgerEntrySetup",
            element: <GeneralLedgerEntrySetupListIndex />,
          },
          {
            path: "CollateralTypeSetup",
            element: <CollateralTypeSetup />,
          },
          {
            path: "number-series",
            element: <NumberSeries />,
          },
          {
            path: "ApplicationInfrmationSetupList",
            element: <ApplicationInfrmationSetupList />,
          },
          {
            path: "application-assessment-response",
            element: <ApplicationResponseSetupIndex />,
          },
          {
            path: "assessment-response",
            element: <AssessmentResponseSetupIndex />,
          },
          {
            path: "application-reason",
            element: <StatusCategoryListIndex />,
          },
          {
            path: "black-list-customer-setup",
            element: <BlackListCustomerSetupIndex />,
          },
          {
            path: "create-black-list-customer/:mode",
            element: <CreateBlackListCustomerSetup />,
          },
          {
            path: "edit-black-list-customer/:uuid/:mode",
            element: <CreateBlackListCustomerSetup />,
          },
          {
            path: "DetailBlackListCustomerSetup",
            element: <EditBlackListCustomerSetup isEdit={false} />,
          },
          {
            path: "department",
            element: <Department />,
          },
          {
            path: "position",
            element: <Position />,
          },
          {
            path: "bank",
            element: <Bank />,
          },
          {
            path: "customerBank",
            element: <CustomerBank />,
          },
          {
            path: "nrc",
            //element: <NRCIndex />,
            children: [
              {
                path: "state",
                element: <NRCStateIndex />,
              },
              {
                path: "township",
                element: <NRCTownshipIndex />,
              },
            ],
          },
          {
            path: "Workflow",
            element: <Workflow />,
          },
          {
            path: "approval-workflow",
            element: <ApprovalWorkflow />,
          },
          {
            path: "address",
            children: [
              {
                path: "state",
                element: <AddressStateIndex />,
              },
              {
                path: "district",
                element: <AddressDistrictIndex />,
              },
              {
                path: "township",
                element: <AddressTownshipIndex />,
              },
              {
                path: "city",
                element: <AddressCityIndex />,
              },
              {
                path: "ward",
                element: <AddressWardIndex />,
              },
              {
                path: "village-tract",
                element: <AddressVillageTractIndex />,
              },
              {
                path: "village",
                element: <AddressVillageIndex />,
              },
              {
                path: "black-list-area-listing",
                element: <BlackListAreaIndex />,
              },
              {
                path: "exclude-black-list-area-listing",
                element: <ExcludeBlackListAreaIndex />,
              },
            ],
          },
          {
            path: "TableSetup",
            element: <TableSetup />,
          },
          {
            path: "document-access-table",
            element: <DocumentAttachIndex />,
          },
          {
            path: "PermissionSets",
            element: <PermissionSetsList />,
          },
          {
            path: "Users",
            element: <UsersList />,
          },
          {
            path: "user-group",
            element: <UserGroupListing />,
          },
          {
            path: "user-group/:mode",
            element: <CreateNewUserGroup />,
          },
          {
            path: "user-group/:uuid/:mode",
            element: <CreateNewUserGroup />,
          },
          {
            path: "TypeofBusiness",
            element: <TypeofBusinessList />,
          },
          {
            path: "main-business-category",
            element: <MainBusinessCategoryList />,
          },
          {
            path: "SubBusinessCategory",
            element: <SubBusinessCategoryList />,
          },
          {
            path: "ApplicationInformationSetup",
            element: <CreateApplicationInformationSetup />,
          },
          {
            path: "ApplicationInformationSetup/:uuid",
            element: <CreateApplicationInformationSetup />,
          },
          {
            path: "ApplicationInformationSetup/:id/:mode",
            element: <CreateApplicationInformationSetup />,
          },
          {
            path: "ContractFormSetup",
            element: <CreateContractFormSetup />,
          },
          {
            path: "signer-setup",
            element: <SignerList />,
          },
          {
            path: "due-date-setup",
            element: <DueDateList />,
          },
          {
            path: "billing-date-registration",
            element: <BillingDateList />,
          },
          {
            path: "disbursement-setup",
            element: <DisbursementList />,
          },
          {
            path: "SurveyNameSetup",
            element: <SurveyNameSetup />,
          },
          // {
          //   path: "SurveyQuestionSetup",
          //   element: <SurveyQuestionSetup />,
          // },
          {
            path: "DownPaymentSchemeSetup",
            element: <DownPaymentSchemeSetup />,
          },
          {
            path: "insurance-company-setup",
            element: <InsuranceCompanySetup />,
          },
          {
            path: "insurance-premium-fee-setup",
            element: <InsurancePremiumFeeSetup />,
          },
          {
            path: "CreateContractAgreementTemplateSetup/:mode/",
            element: <CreateContractAgreementSetup />,
          },
          {
            path: "CreateContractAgreementTemplateSetup/:mode/:uuid",
            element: <CreateContractAgreementSetup />,
          },
          {
            path: "ContractAgreementTemplateSetups",
            element: <ContractAgreementSetupList />,
          },
          {
            path: "demand-letter-setup/:mode/",
            element: <CreateDemandLetterSetup />,
          },
          {
            path: "demand-letter-setup/:mode/:uuid",
            element: <CreateDemandLetterSetup />,
          },
          {
            path: "demand-letter-setup-list",
            element: <DemandLetterSetupList />,
          },
          {
            path: "AdminUserProfile",
            element: <UserProfileIndex />,
          },
          {
            path: "cash-deposit-setup",
            children: [
              {
                path: "account-code",
                element: <AccountCodeIndex />,
              },
            ],
          },
          {
            path: "early-termination-fees-setup",
            element: <EarlyTerminationFeesSetupListIndex />,
          },
          {
            path: "collection-fees-setup",
            element: <CollectionFeesSetupListIndex />,
          },
          {
            path: "Priority",
            element: <PriorityIndex />,
          },
          {
            path: "kpay-notification",
            element: <KPayNotificationIndex />,
          },
          {
            path: "reminder-setup",
            element: <ReminderSetupListIndex />,
          },
          {
            path: "sms-setup",
            element: <SMSSetupListIndex />,
          },
          {
            path: "follow-up-result-setup",
            element: <FollowUpResultList />,
          },
          {
            path: "allocate-activity-setup",
            element: <AllocateActivitiesList />,
          },
          {
            path: "last-payment-setup",
            element: <LastPaymentSetupList />,
          },
        ],
      },
      //Credit Management
      {
        path: "CreditManagement",
        children: [
          {
            path: "Application/:categoryName/:categoryId/dashboard",
            element: <ProjectFDashboardIndex />,
          },
          {
            path: "Application/:categoryName/:categoryId",
            element: <ApplicationInformation />,
          },
          {
            path: "Application/:categoryName/:categoryId/:surveyType/:surveyResult",
            element: <SurveyInformationIndex />,
          },
          {
            path: "SurveyResultList",
            element: <SurveyResultList />,
          },
          {
            path: "AssementList",
            element: <AssementList />,
          },
          {
            path: "customer-list",
            element: <CustomerList />,
          },
          {
            path: "Reports",
            element: <Reportist />,
          },
          {
            path: "credit-criteria-key-setup",
            element: <CreditCriteriaKeyIndex />,
          },
          {
            path: "credit-criteria-value-setup",
            element: <CreditCriteriaListIndex />,
          },
          {
            path: "credit-criteria-history",
            element: <CreditCriteriaHistoryIndex />,
          },
          {
            path: "customer-inquiries-form",
            element: <CustomerInqueriesFormIndex />,
          },
          {
            path: "customer-web-application",
            element: <CustomerWebApplicationTableIndex />
          },
        ],
      },
      {
        path: "LoanOperationModule",
        children: [
          {
            path: "loan-operation-application-information/dashboard",
            element: <LoanOperationApplicationListDashboard />,
          },
          {
            path: "loan-operation-application-information/:title",
            element: <LoanOperationApplicationListIndex />,
          },
          {
            path: "sms-generation",
            element: <SMSGenerateForLoanSkipTableIndex />,
          },
          {
            path: "SetDisbursementDate",
            element: <ApprovedApplicationListIndex />,
          },
          {
            path: "SetDisbursementDate/:categoryId",
            element: <ApprovedApplicationListIndex />,
          },
          {
            path: "preparation-for-contract",
            element: <PrepareForContractTableIndex />,
          },
          {
            path: "preparation-for-contract/:ids",
            element: <PrepareForContractTableIndex />,
          },
          {
            path: "kpay-sync-accounts",
            element: <KPaySyncAccountsIndex />,
          },
          {
            path: "signature-corretion",
            element: <SignatureCorrectionIndex />,
          },
          {
            path: "GLListing",
            element: <GenerateLedgerListIndex />,
          },
          {
            path: "GLListing/:categoryId",
            element: <GenerateLedgerListIndex />,
          },
          {
            path: "Contract",
            element: <ContractListIndex />,
          },
          {
            path: "UpdateVehicleInformation",
            element: <UpdateVehicleInformationIndex />,
          },
          {
            path: "UpdateVehicleInformation/:id",
            element: <UpdateVehicleInformationIndex />,
          },
          {
            path: "RequestForBooking",
            element: <RequestForBookingIndex />,
          },
          {
            path: "BookingProcesses",
            element: <BookingProcessesIndex />,
          },
          {
            path: "BookingProcessesHistory",
            element: <BookingProcessesHistoryIndex />,
          },
          {
            path: "RequestForDisbursement",
            element: <RequestForDisbursementTableIndex />,
          },
          {
            path: "DisbursementPayment",
            element: <DisbursementPaymentList />,
          },
          {
            path: "DisbursementPaymentBatch",
            element: <DisbursementBatchList />,
          },
          {
            path: "Contract/:categoryId",
            element: <ContractListIndex />,
          },
          {
            path: "Contract/mode/:mode",
            element: <ContractListIndex />,
          },
          {
            path: "StampDutyPayment",
            element: <StampDutyPaymentList />,
          },
          {
            path: "StampDutyPayment/:categoryId",
            element: <StampDutyPaymentList />,
          },
          {
            path: "Collateral",
            element: <CollateralList />,
          },

          {
            path: "Collateral/:categoryId",
            element: <CollateralList />,
          },
          {
            path: "CollateralLicense",
            element: <CollateralLicenseList />,
          },
          {
            path: "CollateralLicense/:categoryId",
            element: <CollateralLicenseList />,
          },
          {
            path: "CollateralInsurance",
            element: <CollateralInsuranceList />,
          },
          {
            path: "CollateralInsurance/:categoryId",
            element: <CollateralInsuranceList />,
          },
          {
            path: "RepaymentCollateral",
            element: <CollateralRepaymentList />,
          },
          {
            path: "RepaymentCollateral/:categoryId",
            element: <CollateralRepaymentList />,
          },
          {
            path: "InsurancePayment",
            element: <InsurancePaymentList />,
          },
          {
            path: "DisbursementPaymentHistory",
            element: <DisbursementPaymentHistoryList />,
          },
          {
            path: "InsurancePayment/:categoryId",
            element: <InsurancePaymentList />,
          },
          {
            path: "InsurancePaymentBatch",
            element: <InsuranceBatchList />,
          },
          {
            path: "StampDutyPaymentBatch",
            element: <StampDutyBatchList />,
          },
          {
            path: "StampDutySettlement",
            element: <StampDutySettlementList />,
          },
          {
            path: "CashDepositProcess",
            element: <CashDepositProcessList />,
          },
          {
            path: "GeneralLedgerEntry",
            element: <GeneralLedgerEntry />,
          },
          {
            path: "ActualPaymentLines",
            element: <ActualPaymentLines />,
          },
          {
            path: "sms-history",
            element: <SmsHistoryListIndex />,
          },
          {
            path: "wave-money-report",
            element: <WaveMoneyReport />,
          },
        ],
      },
      {
        path: "collection-module",
        children: [
          {
            path: "calculate-penalties",
            element: <CalculatePenalties />,
          },
          {
            path: "early-termination-process-list",
            element: <EarlyTerminationProcessListIndex />,
          },
          {
            path: "repayment-list",
            element: <RepaymentList />,
          },
          {
            path: "penalty-log-list",
            element: <PenaltyLogList />,
          },
          {
            path: "kpay-repayment-history-list",
            element: <KPayRepaymentList />,
          },
          {
            path: "reminder-allocation",
            element: <ReminderAllocation />,
          },
          {
            path: "allocated-reminder",
            element: <AllocatedReminder />,
          },
          {
            path: "allocated-reminder-history",
            element: <AllocatedReminderHistory />,
          },
          {
            path: "write-off-preparation",
            element: <WriteOffPreparation />,
          },
          {
            path: "write-off-batch",
            element: <WriteOffBatch />,
          },
          {
            path: "write-off-repayment-list",
            element: <WriteOffList />,
          },
          {
            path: "exceed-payment",
            element: <ExceedPaymetIndex />,
          },
          // {
          //   path: "sms-history",
          //   element: <SmsHistoryListIndex />,
          // },
          {
            path: "collection-report",
            element: <CollectionReportListIndex />,
          },
          {
            path: "insufficient-payment",
            element: <InsufficientPaymentList />,
          },
          {
            path: "insufficient-contracts-batch",
            element: <InsufficientPaymentBatchList />,
          },
        ],
      },
      {
        path: "finance",
        children: [
          {
            path: "provision-setup",
            element: <ProvisionListIndex />,
          },
          {
            path: "eom-bom-log-entry-list/:mode",
            element: <JobQueueLogEntryListIndex />,
          },
        ],
      },
      {
        path: "pdsd",
        children: [
          {
            path: "mob/dealer-group-setup",
            element: <DealerGroupIndex />,
          },
          {
            path: "mob/dealer-package-setup",
            element: <DealerPackageIndex />,
          },
          {
            path: "mob/dealer-setup",
            element: <DealerIndex />,
          },
          {
            path: "mob/dealer-contact-person-setup",
            element: <DealerContactPersonIndex />,
          },
          {
            path: "mob/dealer-bank-setup",
            element: <DealerBankIndex />,
          },
          {
            path: "mob/vehicle-setup",
            element: <VehicleIndex />,
          },
          {
            path: "mob/brand-setup",
            element: <BrandIndex />,
          },
          {
            path: "mob/model-setup",
            element: <ModelIndex />,
          },
          {
            path: "customer-inquiry-form",
            element: <CustomerInqueriesFormIndex />,
          },
          {
            path: "refinance-customer-setup",
            element: <RefinanceCustomerIndex />,
          },
          {
            path: "credit-scheme-setup",
            element: <CreditSchemeIndex />,
          },
          {
            path: "name-of-business-setup",
            element: <NameOfBusinessIndex />,
          },

        ],
      },
    ],
  },
  {
    path: "/",
    children: [
      //Credit Management
      {
        path: "CreditManagement",
        children: [
          {
            path: "CreateApplicationInformation/:categoryName/:categoryId/:uuid/:id/:mode?",
            element: <CreateApplicationInformationIndex />,
          },
          {
            path: "ApplicationInformation/:path/:categoryName/:categoryId/:uuid/:id/:mode?",
            element: <CreateApplicationInformationIndex />,
          },
          {
            path: "ApplicationAttachment/:applicationUUId/:tableName/:primaryKey",
            element: <ApplicationAttachment />,
          },
          {
            path: "Survey/:categoryName/:categoryId/:surveyType/:applicationId/:applicationUUId",
            element: <InHouseSurveyIndex />,
          },
          {
            path: "SurveyResultList/:surveyType/:applicationId",
            element: <SurveyListInHouseSurvey />,
          },
          {
            path: "AssementList/:id",
            element: <DetailApplicationAssementList />,
          },
          {
            path: "CustomerList/:id",
            element: <CustomerDetail />,
          },
          {
            path: "Applications",
            children: [
              {
                path: ":applicationUUId/:applicationId/ApplicationGuarantorList",
                element: <ApplicationGuarantorListIndex />,
              },
              {
                path: ":applicationUUId/:applicationId/Collaterals",
                element: <ApplicationCollateralListIndex />,
              },
              {
                path: ":applicationUUId/:applicationId/Collaterals/:contractId/:path",
                element: <ApplicationCollateralListIndex />,
              },
              {
                path: ":applicationUUId/:applicationId/:mode",
                element: <CreateApplicationGuarantor />,
              },
              {
                path: ":applicationUUId/:applicationId/:mode/:id",
                element: <CreateApplicationGuarantor />,
              },
              {
                path: ":applicationUUId/:applicationId/:mode/:id",
                element: <CreateApplicationGuarantor />,
              },
              {
                path: ":uuid/:applicationId/:mode/collateral",
                element: <CreateApplicationCollateral />,
              },
              {
                path: ":uuid/:applicationId/:mode/:id/collateral",
                element: <CreateApplicationCollateral />,
              },
              {
                path: ":uuid/:applicationId/:mode/collateral/:path/:contractId",
                element: <CreateApplicationCollateral />,
              },
              {
                path: ":uuid/:applicationId/:mode/:id/collateral/:path/:contractId",
                element: <CreateApplicationCollateral />,
              },
              {
                path: ":uuid/:applicationId/ApplicationReferenceList",
                element: <ApplicationReferenceListIndex />,
              },
              {
                path: "Reference/:applicationUUId/:applicationId/:mode",
                element: <CreateApplicationReference />,
              },
              {
                path: "Reference/:applicationUUId/:applicationId/:mode/:id",
                element: <CreateApplicationReference />,
              },
              {
                path: "Reference/:applicationUUId/:applicationId/:mode/:id",
                element: <CreateApplicationReference />,
              },
              {
                path: ":applicationUUId/:applicationId/ApplicationJointApplicantList",
                element: <ApplicationJointApplicantListIndex />,
              },
              {
                path: "JointApplicant/:applicationUUId/:applicationId/:mode",
                element: <CreateApplicationJointApplicant />,
              },
              {
                path: "JointApplicant/:applicationUUId/:applicationId/:mode/:id",
                element: <CreateApplicationJointApplicant />,
              },
              {
                path: "JointApplicant/:applicationUUId/:applicationId/:mode/:id",
                element: <CreateApplicationJointApplicant />,
              },
            ],
          },
          {
            path: "ApplicationAssessment",
            children: [
              {
                path: "ApplicationAssessmentList/:applicationId/:applicationUUId",
                element: <ApplicationAssessmentListIndex />,
              },
              {
                path: "EditApplicationAssessment/:id",
                element: <EditApplicationAssessment />,
              },
            ],
          },
          {
            path: "CustomerWebApplicationInformation/:uuid/:id/:mode?",
            element: <CustomerWebApplication />,
          },
        ],
      },
      {
        path: "loan-module",
        children: [
          {
            path: "contract-preparation/:uuid/:id/:route",
            element: <InitialPaymentCalIndex />,
          },
        ]
      },
      {
        path: "loan-module",
        children: [
          {
            path: "insurance-inspection/:uuid/:id",
            element: <InsuranceInspectionIndex />,
          },
          {
            path: "sign-loan-agreement/:uuid/:id/:route",
            element: <CORIndex />,
          },
          {
            path: "sign-collateral/:uuid/:id/:type",
            element: <CollateralSignatureIndex />,
          },
          {
            path: "down-payment-list/:id/:uuid",
            element: <ApplicationDownPayment />,
          },
          {
            path: "application-downpayment/edit/:uuid",
            element: <EditApplicationDownPayment />,
          },
          {
            path: "attachment/:applicationUUId/:tableName/:primaryKey",
            element: <ApplicationAttachment />,
          },
          {
            path: ":category/vehicle-info/:uuid/:id",
            element: <VehicleInfoIndex />,
          },
        ]
      },
      {
        path: "contracts",
        children: [
          // {
          //   path: ":uuid/:mode?",
          //   element: <EditContractIndex />,
          // },
          {
            path: ":uuid/:mode/:route?",
            element: <EditContractIndex />,
          },
          {
            path: "ContractAttachment/:contractUUId/:tableName/:primaryKey",
            element: <ContractAttachment />,
          },
        ],
      },
      {
        path: "write-off-repayment-detail",
        children: [
          // {
          //   path: ":uuid/:mode?",
          //   element: <EditContractIndex />,
          // },
          {
            path: ":uuid/:mode/:route?",
            element: <EditWriteOffRepaymentContractIndex />,
          },
        ],
      },
      {
        path: "bookings",
        children: [
          // {
          //   path: ":uuid/:mode?",
          //   element: <EditContractIndex />,
          // },
          {
            path: ":uuid/:mode/:route?",
            element: <EditContractIndex />,
          },
        ],
      },
      {
        path: "disbursement",
        children: [
          // {
          //   path: ":uuid/:mode?",
          //   element: <EditContractIndex />,
          // },
          {
            path: ":uuid/:mode/:route?",
            element: <EditContractIndex />,
          },
        ],
      },
      {
        path: "preparation-for-contracts",
        children: [
          {
            path: ":uuid/:mode?",
            element: <EditPrepareForContractIndex />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "SurveyNameSetup/:uuid",
        element: <SurveyQuestionSetup />,
      },
      {
        path: ":category/StampDuty",
        element: <StampDutyPaymentByBatchIndex />,
      },
      {
        path: "StampDuty/:uuid/:mode",
        element: <StampDutyPaymentByBatchIndex />,
      },
      {
        path: "StampDuty/:route/:uuid/:mode",
        element: <StampDutyPaymentByBatchIndex />,
      },
      {
        path: ":category/Insurance",
        element: <InsurancePaymentByBatchIndex />,
      },
      {
        path: "Insurance/:uuid/:mode",
        element: <InsurancePaymentByBatchIndex />,
      },
      {
        path: "Insurance/:route/:uuid/:mode",
        element: <InsurancePaymentByBatchIndex />,
      },
      {
        path: "BookingProcess/:category/:route/:uuid/:mode",
        element: <BookingProcessIndex />,
      },
      {
        path: "RequestForDisbursement/:route/:uuid/:mode/:contract",
        element: <RequestForDisbursement />,
      },
      {
        path: ":category/Disbursement-Payment",
        element: <DisbursementPaymentByBatchIndex />,
      },
      {
        path: "Disbursement-Payment/:uuid/:mode",
        element: <DisbursementPaymentByBatchIndex />,
      },
      {
        path: "Disbursement-Payment/:route/:uuid/:mode",
        element: <DisbursementPaymentByBatchIndex />,
      },
      {
        path: "CashDepositProcess/:mode",
        element: <CreateCashDeposit />,
      },
      {
        path: "CashDepositProcess/:uuid/:mode",
        element: <CreateCashDeposit />,
      },
      {
        path: "/collection-module/early-termination-process/:mode",
        element: <CreateEarlyTerminationProcess />,
      },
      {
        path: "/collection-module/early-termination-process/:uuid/:mode",
        element: <CreateEarlyTerminationProcess />,
      },
      {
        path: "/collection-module/repayment-list-create/",
        element: <RepaymentCreate />,
      },
      {
        path: "/collection-module/repayment/:uuid/:mode",
        element: <RepaymentCreate />,
      },
      {
        path: "/collection-module/:route/:uuid/:mode",
        element: <RepaymentIndex />,
      },
      {
        path: "/collection-module/kpay-repayment/:uuid/:mode",
        element: <KPayRepaymentIndex />,
      },
      {
        path: "/collection-module/repayment/:uuid/applied-settlement-data",
        element: <AppliedSettlementDataIndex />,
      },
      {
        path: "/collection-module/repayment/:uuid/applied-settlement-data/:mode",
        element: <AppliedSettlementDataIndex />,
      },
      {
        path: "/finance/eom-bom-index/:route",
        element: <JobQueueLogEntryIndex />,
      },
      {
        path: "/finance/eom-bom/:uuid/:route/:mode",
        element: <JobQueueLogEntryIndex />,
      },
      {
        path: "/finance/eom-bom-sync/:id/:route",
        element: <EomSyncIndex />,
      },
      {
        path: "/sms-setup/:mode",
        element: <CreateEditSMSSetupIndex />,
      },
      {
        path: "/sms-setup/:uuid/:mode",
        element: <CreateEditSMSSetupIndex />,
      },
      {
        path: "/general-ledger-entry-setups/:mode",
        element: <CreateEditGeneralLedgerEntrySetupIndex />,
      },
      {
        path: "/general-ledger-entry-setups/:uuid/:mode",
        element: <CreateEditGeneralLedgerEntrySetupIndex />,
      },
      {
        path: "/write-off-preparation",
        element: <CreateWriteOffBatch />,
      },
      {
        path: "/write-off-preparation/:uuid/:mode",
        element: <CreateWriteOffBatch />,
      },
      {
        path: "write-off-preparation/write-off-signature/:uuid/:id",
        element: <WriteOffSignatureIndex />,
      },
      {
        path: "dealer/dealer-contact-person/create",
        element: <SurveyQuestionSetup />,
      },
      {
        path: "/insufficient-payment-preparation",
        element: <CreateInsufficientPaymentBatch />,
      },
      {
        path: "/insufficient-payment-preparation/:uuid/:mode",
        element: <CreateInsufficientPaymentBatch />,
      },



    ],
  },
];

export default MainRoutes;
