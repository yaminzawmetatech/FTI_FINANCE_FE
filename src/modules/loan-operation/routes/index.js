import { lazy } from "react";
import Loadable from "components/Loadable";
import VehicleInfoIndex from "modules/loan-operation/pages/LoanOperationModule/VehicleInfo/VehicleInfoIndex";

// render - dashboard

const LoanOperationApplicationListDashboard = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/Dashboard/LoanApplicationListDashboard")));
const LoanOperationApplicationListIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/LoanOperationApplicationInformationList/LoanOperationApplicationInformationListIndex")));
const SMSGenerateForLoanSkipTableIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/SMSGenerateForLoanSkip/SMSGenerateForLoanSkipTableIndex")));
const ApprovedApplicationListIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/SetDisbursement/SetDisbursedTableIndex")));
const PrepareForContractTableIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/PrepareForContract/PrepareForContractList/PrepareForContractTableIndex")));
const KPaySyncAccountsIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/KpaySyncAccounts/KpaySyncAccounts")));
const SignatureCorrectionIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/SignatureCorrection/SignatureCorrectionIndex")));

// ==============================|| MAIN ROUTING ||============================== //
const GenerateLedgerListIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/GenerateLedger/GenerateLedgerTableIndex")));
const ContractListIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/Contract/ContractInformationList/ContractTableIndex")));
const UpdateVehicleInformationIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/UpdateVehicleInformaton/UpdateVehicleInformationIndex")));
const RequestForBookingIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/RequestForBooking/RequestForBookingList/RequestForBookingTableIndex")));
const BookingProcessesIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/BookingProcess/BookingProcessList/BookingProcessTableIndex")));
const BookingProcessesHistoryIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/BookingProcess/BookingProcessHistoryList/BookingProcessHistoryTableIndex")));
const RequestForDisbursementTableIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/RequestForDisursementList/RequestForDisursementTableIndex")));
const DisbursementPaymentList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/DisbursementPayment/DisbursementPaymentsListIndex")));
const DisbursementBatchList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/DisbursementPaymentBatch/DisbursementBatchListIndex")));
const StampDutyPaymentList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/StampDutyPayment/StampDutyPaymentListIndex")));
const CollateralList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/CollateralList/CollateralListIndex")));
const CollateralLicenseList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/CollateralLicenseList/CollateralLicenseListIndex")));
const CollateralInsuranceList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/CollateralInsuranceList/CollateralInsuranceListIndex")));
const CollateralRepaymentList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/RepaymentCollateralList/RepaymentCollateralListIndex")));
const InsurancePaymentList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/InsurancePayment/InsurancePaymentListIndex")));
const DisbursementPaymentHistoryList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/DisbursementPaymentHistory/DisbursementPaymentHistoryListIndex")));
const InsuranceBatchList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/InsurancePaymentBatch/InsuranceBatchListIndex")));
const StampDutyBatchList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/StampDutyPaymentBatch/StampDutyBatchListIndex")));
const StampDutySettlementList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/StampDutySettlement/StampDutySettlementListIndex")));
const CashDepositProcessList = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/CashDepositProcessAndAccount/CashDepositProcessList/CashDepositProcessListIndex")));
const GeneralLedgerEntry = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/GeneralLedgerEntry/GeneralLedgerEntryListIndex")));
const ActualPaymentLines = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/ActualPaymentLines/ActualPaymentLinesTable")));
const SmsHistoryListIndex = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/SMSList/SMSListIndex")));
const WaveMoneyReport = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/WaveMoneyReport/WaveMoneyReportTable")));
const InsuranceInspectionIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/InsuranceInspection/InsuranceInspectionIndex")));
const CORIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/CORCard/CORIndex")));
const CollateralSignatureIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/CollateralSignature/CollateralSignatureIndex")));
const ApplicationDownPayment = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/ApplicationDownPayment/ApplicationDownPaymentList/ApplicationDownPaymentListIndex")));
const EditApplicationDownPayment = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/ApplicationDownPayment/EditApplicationDownPayment/EditApplicationDownPayment")));
const ApplicationAttachment = Loadable(lazy(() => import("modules/credit-management/pages/CreditManagement/ApplicationInformation/ApplicationAttachment/ApplicationAttachmentIndex")));
const EditPrepareForContractIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/PrepareForContract/PrepareForContractDetail/EditPrepareForContractIndex")));
const StampDutyPaymentByBatchIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/StampDutyPaymentByBatch/StampDutyPaymentIndex")));
const InsurancePaymentByBatchIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/insurancePaymentByBatch/InsurancePaymentIndex")));
const BookingProcessIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/BookingProcess/BookingProcess/BookingProcessIndex")));
const RequestForDisbursement = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/RequestForDisursement/RequestForDisbursementIndex")));
const DisbursementPaymentByBatchIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/DisbursementPayment/DisbursementPaymentByBatch/DisbursementPaymentIndex")));
const CreateCashDeposit = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/CashDepositProcessAndAccount/CreateCashDeposit/CashDepositProcessIndex")));

const MainLayoutRoutes = [
{
  path: "LoanOperationModule",
  children: [{
    path: "loan-operation-application-information/dashboard",
    element: <LoanOperationApplicationListDashboard />
  }, {
    path: "loan-operation-application-information/:title",
    element: <LoanOperationApplicationListIndex />
  }, {
    path: "sms-generation",
    element: <SMSGenerateForLoanSkipTableIndex />
  }, {
    path: "SetDisbursementDate",
    element: <ApprovedApplicationListIndex />
  }, {
    path: "SetDisbursementDate/:categoryId",
    element: <ApprovedApplicationListIndex />
  }, {
    path: "preparation-for-contract",
    element: <PrepareForContractTableIndex />
  }, {
    path: "preparation-for-contract/:ids",
    element: <PrepareForContractTableIndex />
  }, {
    path: "kpay-sync-accounts",
    element: <KPaySyncAccountsIndex />
  }, {
    path: "signature-corretion",
    element: <SignatureCorrectionIndex />
  }, {
    path: "GLListing",
    element: <GenerateLedgerListIndex />
  }, {
    path: "GLListing/:categoryId",
    element: <GenerateLedgerListIndex />
  }, {
    path: "Contract",
    element: <ContractListIndex />
  }, {
    path: "UpdateVehicleInformation",
    element: <UpdateVehicleInformationIndex />
  }, {
    path: "UpdateVehicleInformation/:id",
    element: <UpdateVehicleInformationIndex />
  }, {
    path: "RequestForBooking",
    element: <RequestForBookingIndex />
  }, {
    path: "BookingProcesses",
    element: <BookingProcessesIndex />
  }, {
    path: "BookingProcessesHistory",
    element: <BookingProcessesHistoryIndex />
  }, {
    path: "RequestForDisbursement",
    element: <RequestForDisbursementTableIndex />
  }, {
    path: "DisbursementPayment",
    element: <DisbursementPaymentList />
  }, {
    path: "DisbursementPaymentBatch",
    element: <DisbursementBatchList />
  }, {
    path: "Contract/:categoryId",
    element: <ContractListIndex />
  }, {
    path: "Contract/mode/:mode",
    element: <ContractListIndex />
  }, {
    path: "StampDutyPayment",
    element: <StampDutyPaymentList />
  }, {
    path: "StampDutyPayment/:categoryId",
    element: <StampDutyPaymentList />
  }, {
    path: "Collateral",
    element: <CollateralList />
  }, {
    path: "Collateral/:categoryId",
    element: <CollateralList />
  }, {
    path: "CollateralLicense",
    element: <CollateralLicenseList />
  }, {
    path: "CollateralLicense/:categoryId",
    element: <CollateralLicenseList />
  }, {
    path: "CollateralInsurance",
    element: <CollateralInsuranceList />
  }, {
    path: "CollateralInsurance/:categoryId",
    element: <CollateralInsuranceList />
  }, {
    path: "RepaymentCollateral",
    element: <CollateralRepaymentList />
  }, {
    path: "RepaymentCollateral/:categoryId",
    element: <CollateralRepaymentList />
  }, {
    path: "InsurancePayment",
    element: <InsurancePaymentList />
  }, {
    path: "DisbursementPaymentHistory",
    element: <DisbursementPaymentHistoryList />
  }, {
    path: "InsurancePayment/:categoryId",
    element: <InsurancePaymentList />
  }, {
    path: "InsurancePaymentBatch",
    element: <InsuranceBatchList />
  }, {
    path: "StampDutyPaymentBatch",
    element: <StampDutyBatchList />
  }, {
    path: "StampDutySettlement",
    element: <StampDutySettlementList />
  }, {
    path: "CashDepositProcess",
    element: <CashDepositProcessList />
  }, {
    path: "GeneralLedgerEntry",
    element: <GeneralLedgerEntry />
  }, {
    path: "ActualPaymentLines",
    element: <ActualPaymentLines />
  }, {
    path: "sms-history",
    element: <SmsHistoryListIndex />
  }, {
    path: "wave-money-report",
    element: <WaveMoneyReport />
  }]
}
];

const StandaloneRoutes = [
{
  path: "loan-module",
  children: [{
    path: "insurance-inspection/:uuid/:id",
    element: <InsuranceInspectionIndex />
  }, {
    path: "sign-loan-agreement/:uuid/:id/:route",
    element: <CORIndex />
  }, {
    path: "sign-collateral/:uuid/:id/:type",
    element: <CollateralSignatureIndex />
  }, {
    path: "down-payment-list/:id/:uuid",
    element: <ApplicationDownPayment />
  }, {
    path: "application-downpayment/edit/:uuid",
    element: <EditApplicationDownPayment />
  }, {
    path: "attachment/:applicationUUId/:tableName/:primaryKey",
    element: <ApplicationAttachment />
  }, {
    path: ":category/vehicle-info/:uuid/:id",
    element: <VehicleInfoIndex />
  }]
},
{
  path: "preparation-for-contracts",
  children: [{
    path: ":uuid/:mode?",
    element: <EditPrepareForContractIndex />
  }]
},
{
  path: ":category/StampDuty",
  element: <StampDutyPaymentByBatchIndex />
},
{
  path: "StampDuty/:uuid/:mode",
  element: <StampDutyPaymentByBatchIndex />
},
{
  path: "StampDuty/:route/:uuid/:mode",
  element: <StampDutyPaymentByBatchIndex />
},
{
  path: "Insurance/:uuid/:mode",
  element: <InsurancePaymentByBatchIndex />
},
{
  path: "Insurance/:route/:uuid/:mode",
  element: <InsurancePaymentByBatchIndex />
},
{
  path: "BookingProcess/:category/:route/:uuid/:mode",
  element: <BookingProcessIndex />
},
{
  path: "RequestForDisbursement/:route/:uuid/:mode/:contract",
  element: <RequestForDisbursement />
},
{
  path: ":category/Disbursement-Payment",
  element: <DisbursementPaymentByBatchIndex />
},
{
  path: "Disbursement-Payment/:uuid/:mode",
  element: <DisbursementPaymentByBatchIndex />
},
{
  path: "Disbursement-Payment/:route/:uuid/:mode",
  element: <DisbursementPaymentByBatchIndex />
},
{
  path: "CashDepositProcess/:mode",
  element: <CreateCashDeposit />
},
{
  path: "CashDepositProcess/:uuid/:mode",
  element: <CreateCashDeposit />
}
];

export { MainLayoutRoutes, StandaloneRoutes };