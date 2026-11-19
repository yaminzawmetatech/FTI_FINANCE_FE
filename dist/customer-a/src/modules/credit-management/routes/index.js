import { lazy } from "react";
import Loadable from "components/Loadable";
import SurveyResultList from "modules/credit-management/pages/CreditManagement/SurveyResultList/SurveyResultList";
import AssementList from "modules/credit-management/pages/CreditManagement/AssementList/AssementListIndex";
import CustomerList from "modules/credit-management/pages/CreditManagement/CustomerList/CustomerListIndex";
import ProjectFDashboardIndex from "modules/credit-management/pages/CreditManagement/Dashboard/ProjectFDashboardIndex";
const ApplicationInformation = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationInformationList/ApplicationInformationListIndex")));
//const PermissionSets = Loadable(lazy(() => import("modules/administration/setup/core/PermissionSets/PermissionSetsList")))
const SurveyInformationIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/SurveyInformationList/SurveyInformationTableIndex")));
const Reportist = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/Reports/ReportTable")));
const CreditCriteriaKeyIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/CreditCriteriaKeySetup/CreditCriteriaKeyListIndex")));
const CreditCriteriaListIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/CreditCriteriaSetup/CreditCriteriaListIndex")));
const CreditCriteriaHistoryIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/AllCreditCriteria/CreditCriteriaListIndex")));
const CustomerInqueriesFormIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/CustomerInquiriesForm/CustomerInquiriesIndex")));
const CustomerWebApplicationTableIndex = Loadable(lazy(() => import("modules/credit-management/pages/MOB-CustomerWebApplication/ApplicationInformationList/ApplicationInformationListIndex")));
//const PermissionSets = Loadable(lazy(() => import("modules/administration/setup/core/PermissionSets/PermissionSetsList")))
const CreateApplicationInformationIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/CreateApplicationInformation/CreateApplicationInformationIndex")));
const ApplicationAttachment = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationAttachment/ApplicationAttachmentIndex")));
const InHouseSurveyIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/InHouseSurvey/InHouseSurveyIndex")));
const SurveyListInHouseSurvey = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/SurveyResultList/InHouseSurvey/InHouseSurveyIndex")));
const DetailApplicationAssementList = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/AssementList/DetailApplicationAssessment")));
const CustomerDetail = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/CustomerList/CustomerDetailIndex")));
const ApplicationGuarantorListIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationGuarantor/ApplicationGuarantorList/ApplicationGuarantorListIndex")));
const ApplicationCollateralListIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationCollateral/ApplicationCollateralList/ApplicationCollateralListIndex")));
const CreateApplicationGuarantor = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationGuarantor/CreateEditViewGuarantor/ApplicationGuarantorIndex")));
const CreateApplicationCollateral = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationCollateral/CreateEditViewCollateral/ApplicationCollateralIndex")));
const ApplicationReferenceListIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationReference/ApplicationReferenceList/ApplicationReferenceListIndex")));
const CreateApplicationReference = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationReference/CreateEditViewReference/ApplicationReferenceIndex")));
const ApplicationJointApplicantListIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationJointApplicant/ApplicationJointApplicantList/JointApplicantListIndex")));
const CreateApplicationJointApplicant = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationJointApplicant/CreateEditViewJointApplicant/ApplicationJointApplicantIndex")));
const ApplicationAssessmentListIndex = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationAssessment/ApplicationAssessmentList/ApplicationAssessmentListIndex")));
const EditApplicationAssessment = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationAssessment/EditApplicationAssessment/EditApplicationAssessment")));
const CustomerWebApplication = Loadable(lazy(() => import("modules/credit-management/pages/MOB-CustomerWebApplication/CreateApplicationInformation/CreateApplicationInformationIndex")));
const SurveyQuestionSetup = Loadable(lazy(() => import("modules/credit-management/setup/SurveySetup/SurveyQuestionSetup/SurveyQuestionSetup")));
const MainLayoutRoutes = [
//Credit Management
{
  path: "CreditManagement",
  children: [{
    path: "Application/:categoryName/:categoryId/dashboard",
    element: <ProjectFDashboardIndex />
  }, {
    path: "Application/:categoryName/:categoryId",
    element: <ApplicationInformation />
  }, {
    path: "Application/:categoryName/:categoryId/:surveyType/:surveyResult",
    element: <SurveyInformationIndex />
  }, {
    path: "SurveyResultList",
    element: <SurveyResultList />
  }, {
    path: "AssementList",
    element: <AssementList />
  }, {
    path: "customer-list",
    element: <CustomerList />
  }, {
    path: "Reports",
    element: <Reportist />
  }, {
    path: "credit-criteria-key-setup",
    element: <CreditCriteriaKeyIndex />
  }, {
    path: "credit-criteria-value-setup",
    element: <CreditCriteriaListIndex />
  }, {
    path: "credit-criteria-history",
    element: <CreditCriteriaHistoryIndex />
  }, {
    path: "customer-inquiries-form",
    element: <CustomerInqueriesFormIndex />
  }, {
    path: "customer-web-application",
    element: <CustomerWebApplicationTableIndex />
  }]
}];
const StandaloneRoutes = [
//Credit Management
{
  path: "CreditManagement",
  children: [{
    path: "CreateApplicationInformation/:categoryName/:categoryId/:uuid/:id/:mode?",
    element: <CreateApplicationInformationIndex />
  }, {
    path: "ApplicationInformation/:path/:categoryName/:categoryId/:uuid/:id/:mode?",
    element: <CreateApplicationInformationIndex />
  }, {
    path: "ApplicationAttachment/:applicationUUId/:tableName/:primaryKey",
    element: <ApplicationAttachment />
  }, {
    path: "Survey/:categoryName/:categoryId/:surveyType/:applicationId/:applicationUUId",
    element: <InHouseSurveyIndex />
  }, {
    path: "SurveyResultList/:surveyType/:applicationId",
    element: <SurveyListInHouseSurvey />
  }, {
    path: "AssementList/:id",
    element: <DetailApplicationAssementList />
  }, {
    path: "CustomerList/:id",
    element: <CustomerDetail />
  }, {
    path: "Applications",
    children: [{
      path: ":applicationUUId/:applicationId/ApplicationGuarantorList",
      element: <ApplicationGuarantorListIndex />
    }, {
      path: ":applicationUUId/:applicationId/Collaterals",
      element: <ApplicationCollateralListIndex />
    }, {
      path: ":applicationUUId/:applicationId/Collaterals/:contractId/:path",
      element: <ApplicationCollateralListIndex />
    }, {
      path: ":applicationUUId/:applicationId/:mode",
      element: <CreateApplicationGuarantor />
    }, {
      path: ":applicationUUId/:applicationId/:mode/:id",
      element: <CreateApplicationGuarantor />
    }, {
      path: ":applicationUUId/:applicationId/:mode/:id",
      element: <CreateApplicationGuarantor />
    }, {
      path: ":uuid/:applicationId/:mode/collateral",
      element: <CreateApplicationCollateral />
    }, {
      path: ":uuid/:applicationId/:mode/:id/collateral",
      element: <CreateApplicationCollateral />
    }, {
      path: ":uuid/:applicationId/:mode/collateral/:path/:contractId",
      element: <CreateApplicationCollateral />
    }, {
      path: ":uuid/:applicationId/:mode/:id/collateral/:path/:contractId",
      element: <CreateApplicationCollateral />
    }, {
      path: ":uuid/:applicationId/ApplicationReferenceList",
      element: <ApplicationReferenceListIndex />
    }, {
      path: "Reference/:applicationUUId/:applicationId/:mode",
      element: <CreateApplicationReference />
    }, {
      path: "Reference/:applicationUUId/:applicationId/:mode/:id",
      element: <CreateApplicationReference />
    }, {
      path: "Reference/:applicationUUId/:applicationId/:mode/:id",
      element: <CreateApplicationReference />
    }, {
      path: ":applicationUUId/:applicationId/ApplicationJointApplicantList",
      element: <ApplicationJointApplicantListIndex />
    }, {
      path: "JointApplicant/:applicationUUId/:applicationId/:mode",
      element: <CreateApplicationJointApplicant />
    }, {
      path: "JointApplicant/:applicationUUId/:applicationId/:mode/:id",
      element: <CreateApplicationJointApplicant />
    }, {
      path: "JointApplicant/:applicationUUId/:applicationId/:mode/:id",
      element: <CreateApplicationJointApplicant />
    }]
  }, {
    path: "ApplicationAssessment",
    children: [{
      path: "ApplicationAssessmentList/:applicationId/:applicationUUId",
      element: <ApplicationAssessmentListIndex />
    }, {
      path: "EditApplicationAssessment/:id",
      element: <EditApplicationAssessment />
    }]
  }, {
    path: "CustomerWebApplicationInformation/:uuid/:id/:mode?",
    element: <CustomerWebApplication />
  }]
}, {
  path: "SurveyNameSetup/:uuid",
  element: <SurveyQuestionSetup />
}];
export { MainLayoutRoutes, StandaloneRoutes };