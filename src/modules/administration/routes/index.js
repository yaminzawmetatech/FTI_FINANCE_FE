import { lazy } from "react";
import Loadable from "components/Loadable";
import DocumentTypeSetupIndex from "modules/administration/setup/core/DocumentTypeSetup/DocumentTypeSetupIndex";
import ProjectCategoryIndex from "modules/administration/pages/Administration/ProjectCategory/ProductCategoryList";
import BlackListCustomerSetupIndex from "modules/collection/setup/BlackListCustomerSetup/BlackListCustomerSetupIndex";
import CreateBlackListCustomerSetup from "modules/collection/setup/BlackListCustomerSetup/CreateBlackListCustomerSetup";
import EditBlackListCustomerSetup from "modules/collection/setup/BlackListCustomerSetup/EditBlackListCustomerSetup";
import PermissionSetsList from "modules/administration/setup/core/PermissionSets/PermissionSetsList";
import UserGroupListing from "modules/administration/setup/core/UserGroup/UserGroupListing";
import TypeofBusinessList from "modules/administration/pages/Administration/TypeofBusiness/TypeofBusinessList";
import SubBusinessCategoryList from "modules/administration/pages/Administration/SubBusinessCategory/SubBusinessCategoryList";
import ApplicationInfrmationSetupList from "modules/credit-management/setup/ApplicationInformationSetupList/ApplicationInformationSetupList";

const EmailSetupList = Loadable(lazy(() => import("modules/administration/setup/core/EmailSetup/EmailSetupList")));
const SubCategory = Loadable(lazy(() => import("modules/administration/pages/Administration/SubCategory/SubCategoryList")));
const FirstDueDateSetup = Loadable(lazy(() => import("modules/loan-operation/setup/FirstDueDateSetup/FirstDueDateSetupList")));
const GeneralLedgerEntrySetupListIndex = Loadable(lazy(() => import("modules/finance/setup/GeneralLedgerEntrySetup/GeneralLedgerEntrySetupList/GeneralLedgerEntrySetupListIndex")));
const CollateralTypeSetup = Loadable(lazy(() => import("modules/administration/pages/Administration/CollateralTypeSetup/CollateralTypeIndex")));
const NumberSeries = Loadable(lazy(() => import("modules/administration/pages/Administration/NumberSeries/NumberSeriesList")));
const ApplicationResponseSetupIndex = Loadable(lazy(() => import("modules/credit-management/setup/ApplicationResponseSetup/ApplicationResponseList")));
const AssessmentResponseSetupIndex = Loadable(lazy(() => import("modules/credit-management/setup/AssessmentResponseSetup/AssessmentResponseList")));
const StatusCategoryListIndex = Loadable(lazy(() => import("modules/administration/pages/Administration/StatusCategory/StatusCategoryList")));
const Department = Loadable(lazy(() => import("modules/administration/setup/core/Department/DepartmentList")));
const Position = Loadable(lazy(() => import("modules/administration/setup/core/Position/PositionList")));
const Bank = Loadable(lazy(() => import("modules/administration/setup/core/Bank/BankList")));
const CustomerBank = Loadable(lazy(() => import("modules/administration/setup/core/CustomerBankSetUp/CustomerBankIndex")));
const NRCStateIndex = Loadable(lazy(() => import("modules/administration/setup/core/NRC/NRCState/NRCStateIndex")));
const NRCTownshipIndex = Loadable(lazy(() => import("modules/administration/setup/core/NRC/NRCTownship/NRCTownshipIndex")));
const Workflow = Loadable(lazy(() => import("modules/administration/pages/Administration/Workflow/WorkflowList")));
const ApprovalWorkflow = Loadable(lazy(() => import("modules/administration/pages/Administration/ApprovalWorkflow/ApprovalWorkflowList")));
const AddressStateIndex = Loadable(lazy(() => import("modules/administration/setup/core/Address/State/AddressStateIndex")));
const AddressDistrictIndex = Loadable(lazy(() => import("modules/administration/setup/core/Address/District/AddressDistrictIndex")));
const AddressTownshipIndex = Loadable(lazy(() => import("modules/administration/setup/core/Address/Township/AddressTownshipIndex")));
const AddressCityIndex = Loadable(lazy(() => import("modules/administration/setup/core/Address/City/AddressCityIndex")));
const AddressWardIndex = Loadable(lazy(() => import("modules/administration/setup/core/Address/Ward/AddressWardIndex")));
const AddressVillageTractIndex = Loadable(lazy(() => import("modules/administration/setup/core/Address/VillageTract/AddressVillageTractIndex")));
const AddressVillageIndex = Loadable(lazy(() => import("modules/administration/setup/core/Address/Village/AddressVillageIndex")));
const BlackListAreaIndex = Loadable(lazy(() => import("modules/administration/setup/core/Address/BlackListArea/BlackListAreaIndex")));
const ExcludeBlackListAreaIndex = Loadable(lazy(() => import("modules/administration/setup/core/Address/ExcludeBlackListArea/ExcludeBlackListAreaIndex")));
const TableSetup = Loadable(lazy(() => import("modules/administration/pages/Administration/TableSetup/TableSetupIndex")));
const DocumentAttachIndex = Loadable(lazy(() => import("modules/administration/setup/core/DocumentAttachTable/DocumentAttachIndex")));
const UsersList = Loadable(lazy(() => import("modules/administration/setup/core/Users/UsersList")));
const CreateNewUserGroup = Loadable(lazy(() => import("modules/administration/setup/core/UserGroup/CreateEditUserGroup")));
const MainBusinessCategoryList = Loadable(lazy(() => import("modules/administration/pages/Administration/MainBusinessCategory/MainBusinessCategoryIndex")));
const CreateApplicationInformationSetup = Loadable(lazy(() => import("modules/credit-management/setup/ApplicationInformationSetup/CreateApplicationInformationSetup")));
const CreateContractFormSetup = Loadable(lazy(() => import("modules/loan-operation/setup/ContractForm/CreateContractFormSetup")));
const SignerList = Loadable(lazy(() => import("modules/administration/pages/Administration/Signer/SignerList")));
const DueDateList = Loadable(lazy(() => import("modules/administration/pages/Administration/DueDateSetup/DueDateList")));
const BillingDateList = Loadable(lazy(() => import("modules/loan-operation/setup/BillingDateRegistration/BillingDateList")));
const DisbursementList = Loadable(lazy(() => import("modules/loan-operation/setup/Disbursement/DisbursementList")));
const SurveyNameSetup = Loadable(lazy(() => import("modules/credit-management/setup/SurveySetup/SurveyNameSetup/SurveyNameSetup")));
const SurveyQuestionSetup = Loadable(lazy(() => import("modules/credit-management/setup/SurveySetup/SurveyQuestionSetup/SurveyQuestionSetup")));
const DownPaymentSchemeSetup = Loadable(lazy(() => import("modules/loan-operation/setup/DownPaymentSchemeSetup/DownPaymentSchemeSetupList")));
const InsuranceCompanySetup = Loadable(lazy(() => import("modules/loan-operation/setup/InsuranceCompanySetup/InsuranceCompanyIndex")));
const InsurancePremiumFeeSetup = Loadable(lazy(() => import("modules/loan-operation/setup/InsuranceFeesSetup/InsurancePremiumFeeIndex")));
const CreateContractAgreementSetup = Loadable(lazy(() => import("modules/loan-operation/setup/ContractAggrementSetup/CreateContractAggrementSetup/CreateContractAgreementSetup")));
const ContractAgreementSetupList = Loadable(lazy(() => import("modules/loan-operation/setup/ContractAggrementSetup/ContractAggrementSetupList/ContractAgreementSetupListIndex")));
const CreateDemandLetterSetup = Loadable(lazy(() => import("modules/collection/setup/DemandLetterSetup/CreateDemandLetterSetup/CreateDemandLetterSetup")));
const DemandLetterSetupList = Loadable(lazy(() => import("modules/collection/setup/DemandLetterSetup/DemandLetterSetupList/DemandLetterSetupListIndex")));
const UserProfileIndex = Loadable(lazy(() => import("modules/administration/setup/core/Users/UserProfileIndex")));
const AccountCodeIndex = Loadable(lazy(() => import("modules/finance/setup/CashDepositSetup/AccountCode/AccountCodeIndex")));
const EarlyTerminationFeesSetupListIndex = Loadable(lazy(() => import("modules/collection/setup/EarlyTerminationFeesSetup/EarlyTerminationFeesSetupList")));
const CollectionFeesSetupListIndex = Loadable(lazy(() => import("modules/collection/setup/CollectionFeesSetup/CollectionFeesSetupList")));
const PriorityIndex = Loadable(lazy(() => import("modules/finance/setup/PrioritySetup/index")));
const KPayNotificationIndex = Loadable(lazy(() => import("modules/administration/pages/Administration/KpayNotification/KpayNotificationListIndex")));
const ReminderSetupListIndex = Loadable(lazy(() => import("modules/collection/setup/ReminderSetup/ReminderSetupList")));
const SMSSetupListIndex = Loadable(lazy(() => import("modules/collection/setup/SMSSetup/SMSSetupList/SMSSetupListIndex")));
const FollowUpResultList = Loadable(lazy(() => import("modules/collection/setup/FollowUpResultSetup/FollowUpResultIndex")));
const AllocateActivitiesList = Loadable(lazy(() => import("modules/collection/setup/AllocateActivitiesSetup/AllocateActivitiesIndex")));
const LastPaymentSetupList = Loadable(lazy(() => import("modules/finance/setup/LastPaymentSetup/LastPaymentSetupIndex")));

const MainLayoutRoutes = [
{
  path: "administration",
  children: [{
    path: "email-setup",
    element: <EmailSetupList />
  }, {
    path: "document-type-setup",
    element: <DocumentTypeSetupIndex />
  }, {
    path: "product-category",
    element: <ProjectCategoryIndex />
  }, {
    path: "SubCategory",
    element: <SubCategory />
  }, {
    path: "FirstDueDateSetup",
    element: <FirstDueDateSetup />
  }, {
    path: "GeneralLedgerEntrySetup",
    element: <GeneralLedgerEntrySetupListIndex />
  }, {
    path: "CollateralTypeSetup",
    element: <CollateralTypeSetup />
  }, {
    path: "number-series",
    element: <NumberSeries />
  }, {
    path: "ApplicationInfrmationSetupList",
    element: <ApplicationInfrmationSetupList />
  }, {
    path: "application-assessment-response",
    element: <ApplicationResponseSetupIndex />
  }, {
    path: "assessment-response",
    element: <AssessmentResponseSetupIndex />
  }, {
    path: "application-reason",
    element: <StatusCategoryListIndex />
  }, {
    path: "black-list-customer-setup",
    element: <BlackListCustomerSetupIndex />
  }, {
    path: "create-black-list-customer/:mode",
    element: <CreateBlackListCustomerSetup />
  }, {
    path: "edit-black-list-customer/:uuid/:mode",
    element: <CreateBlackListCustomerSetup />
  }, {
    path: "DetailBlackListCustomerSetup",
    element: <EditBlackListCustomerSetup isEdit={false} />
  }, {
    path: "department",
    element: <Department />
  }, {
    path: "position",
    element: <Position />
  }, {
    path: "bank",
    element: <Bank />
  }, {
    path: "customerBank",
    element: <CustomerBank />
  }, {
    path: "nrc",
    //element: <NRCIndex />,
    children: [{
      path: "state",
      element: <NRCStateIndex />
    }, {
      path: "township",
      element: <NRCTownshipIndex />
    }]
  }, {
    path: "Workflow",
    element: <Workflow />
  }, {
    path: "approval-workflow",
    element: <ApprovalWorkflow />
  }, {
    path: "address",
    children: [{
      path: "state",
      element: <AddressStateIndex />
    }, {
      path: "district",
      element: <AddressDistrictIndex />
    }, {
      path: "township",
      element: <AddressTownshipIndex />
    }, {
      path: "city",
      element: <AddressCityIndex />
    }, {
      path: "ward",
      element: <AddressWardIndex />
    }, {
      path: "village-tract",
      element: <AddressVillageTractIndex />
    }, {
      path: "village",
      element: <AddressVillageIndex />
    }, {
      path: "black-list-area-listing",
      element: <BlackListAreaIndex />
    }, {
      path: "exclude-black-list-area-listing",
      element: <ExcludeBlackListAreaIndex />
    }]
  }, {
    path: "TableSetup",
    element: <TableSetup />
  }, {
    path: "document-access-table",
    element: <DocumentAttachIndex />
  }, {
    path: "PermissionSets",
    element: <PermissionSetsList />
  }, {
    path: "Users",
    element: <UsersList />
  }, {
    path: "user-group",
    element: <UserGroupListing />
  }, {
    path: "user-group/:mode",
    element: <CreateNewUserGroup />
  }, {
    path: "user-group/:uuid/:mode",
    element: <CreateNewUserGroup />
  }, {
    path: "TypeofBusiness",
    element: <TypeofBusinessList />
  }, {
    path: "main-business-category",
    element: <MainBusinessCategoryList />
  }, {
    path: "SubBusinessCategory",
    element: <SubBusinessCategoryList />
  }, {
    path: "ApplicationInformationSetup",
    element: <CreateApplicationInformationSetup />
  }, {
    path: "ApplicationInformationSetup/:uuid",
    element: <CreateApplicationInformationSetup />
  }, {
    path: "ApplicationInformationSetup/:id/:mode",
    element: <CreateApplicationInformationSetup />
  }, {
    path: "ContractFormSetup",
    element: <CreateContractFormSetup />
  }, {
    path: "signer-setup",
    element: <SignerList />
  }, {
    path: "due-date-setup",
    element: <DueDateList />
  }, {
    path: "billing-date-registration",
    element: <BillingDateList />
  }, {
    path: "disbursement-setup",
    element: <DisbursementList />
  }, {
    path: "SurveyNameSetup",
    element: <SurveyNameSetup />
  },
  // {
  //   path: "SurveyQuestionSetup",
  //   element: <SurveyQuestionSetup />,
  // },
  {
    path: "DownPaymentSchemeSetup",
    element: <DownPaymentSchemeSetup />
  }, {
    path: "insurance-company-setup",
    element: <InsuranceCompanySetup />
  }, {
    path: "insurance-premium-fee-setup",
    element: <InsurancePremiumFeeSetup />
  }, {
    path: "CreateContractAgreementTemplateSetup/:mode/",
    element: <CreateContractAgreementSetup />
  }, {
    path: "CreateContractAgreementTemplateSetup/:mode/:uuid",
    element: <CreateContractAgreementSetup />
  }, {
    path: "ContractAgreementTemplateSetups",
    element: <ContractAgreementSetupList />
  }, {
    path: "demand-letter-setup/:mode/",
    element: <CreateDemandLetterSetup />
  }, {
    path: "demand-letter-setup/:mode/:uuid",
    element: <CreateDemandLetterSetup />
  }, {
    path: "demand-letter-setup-list",
    element: <DemandLetterSetupList />
  }, {
    path: "AdminUserProfile",
    element: <UserProfileIndex />
  }, {
    path: "cash-deposit-setup",
    children: [{
      path: "account-code",
      element: <AccountCodeIndex />
    }]
  }, {
    path: "early-termination-fees-setup",
    element: <EarlyTerminationFeesSetupListIndex />
  }, {
    path: "collection-fees-setup",
    element: <CollectionFeesSetupListIndex />
  }, {
    path: "Priority",
    element: <PriorityIndex />
  }, {
    path: "kpay-notification",
    element: <KPayNotificationIndex />
  }, {
    path: "reminder-setup",
    element: <ReminderSetupListIndex />
  }, {
    path: "sms-setup",
    element: <SMSSetupListIndex />
  }, {
    path: "follow-up-result-setup",
    element: <FollowUpResultList />
  }, {
    path: "allocate-activity-setup",
    element: <AllocateActivitiesList />
  }, {
    path: "last-payment-setup",
    element: <LastPaymentSetupList />
  }]
}
];

const StandaloneRoutes = [

];

export { MainLayoutRoutes, StandaloneRoutes };