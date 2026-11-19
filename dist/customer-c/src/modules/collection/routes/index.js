import { lazy } from "react";
import Loadable from "components/Loadable";

const CalculatePenalties = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/CalculatePenalties/CalculatePenaltiesIndex")));
const EarlyTerminationProcessListIndex = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/EarlyTerminationProcess/EarlyTerminationProcessList/EarlyTerminationProcessListIndex")));
const RepaymentList = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/Repayment/RepaymentList/RepaymentListIndex")));
const PenaltyLogList = Loadable(lazy(() => import('modules/collection/pages/CollectionModule/PenaltyLog/PenaltyLogTableIndex')));
const KPayRepaymentList = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/KPayRepayment/KPayRepaymentHistory/KPayRepaymentListIndex")));
const ReminderAllocation = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/ReminderAllocation/ReminderAllocationTableIndex")));
const AllocatedReminder = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/AllocatedReminder/AllocatedReminderTableIndex")));
const AllocatedReminderHistory = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/AllocatedReminderHistory/AllocatedReminderHistoryTableIndex")));
const WriteOffPreparation = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/WriteOffPreparationList/WriteOffPreparationTableIndex")));
const WriteOffBatch = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/WriteOffBatchList/WriteOffBatchListIndex")));
const WriteOffList = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/WriteOffList/WriteOffListTableIndex")));
const ExceedPaymetIndex = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/ExceedPayment/ExceedPaymentIndex")));
const SmsHistoryListIndex = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/SMSList/SMSListIndex")));
const CollectionReportListIndex = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/CollectionReport/CollectionReportTable")));
const InsufficientPaymentList = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/InsufficientPayment/InsufficientPaymentList/InsufficientPaymentTableIndex")));
const InsufficientPaymentBatchList = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/InsufficientPayment/InsufficientPaymentBatchList/InsufficientBatchListIndex")));
const EditContractIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/Contract/ContractDetail/EditContractIndex")));
const EditWriteOffRepaymentContractIndex = Loadable(lazy(() => import("modules/loan-operation/pages/LoanOperationModule/Contract/WriteOffRepaymentContractDetail/EditWriteOffRepaymentContractIndex")));
const CreateEarlyTerminationProcess = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/EarlyTerminationProcess/CreateEarlyTerminationProcess/CreateEarlyTerminationProcessIndex")));
const RepaymentCreate = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/Repayment/RepaymentIndex/RepaymentIndex")));
const RepaymentIndex = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/Repayment/RepaymentIndex/RepaymentIndex")));
const KPayRepaymentIndex = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/KPayRepayment/KPayRepayment/RepaymentIndex")));
const AppliedSettlementDataIndex = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/Repayment/AppliedSettlementData/AppliedSettlementDataIndex")));
const CreateWriteOffBatch = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/CreateWriteOffBatch/CreateWriteOffBatchIndex")));
const WriteOffSignatureIndex = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/CreateWriteOffBatch/writeOffSignature/writeOffSignatureIndex")));
const CreateInsufficientPaymentBatch = Loadable(lazy(() => import("modules/collection/pages/CollectionModule/InsufficientPayment/CreateInsufficientPaymentBatch/CreateInsufficientPaymentBatchIndex")));

const MainLayoutRoutes = [
{
  path: "collection-module",
  children: [{
    path: "calculate-penalties",
    element: <CalculatePenalties />
  }, {
    path: "early-termination-process-list",
    element: <EarlyTerminationProcessListIndex />
  }, {
    path: "repayment-list",
    element: <RepaymentList />
  }, {
    path: "penalty-log-list",
    element: <PenaltyLogList />
  }, {
    path: "kpay-repayment-history-list",
    element: <KPayRepaymentList />
  }, {
    path: "reminder-allocation",
    element: <ReminderAllocation />
  }, {
    path: "allocated-reminder",
    element: <AllocatedReminder />
  }, {
    path: "allocated-reminder-history",
    element: <AllocatedReminderHistory />
  }, {
    path: "write-off-preparation",
    element: <WriteOffPreparation />
  }, {
    path: "write-off-batch",
    element: <WriteOffBatch />
  }, {
    path: "write-off-repayment-list",
    element: <WriteOffList />
  }, {
    path: "exceed-payment",
    element: <ExceedPaymetIndex />
  },
  // {
  //   path: "sms-history",
  //   element: <SmsHistoryListIndex />,
  // },
  {
    path: "collection-report",
    element: <CollectionReportListIndex />
  }, {
    path: "insufficient-payment",
    element: <InsufficientPaymentList />
  }, {
    path: "insufficient-contracts-batch",
    element: <InsufficientPaymentBatchList />
  }]
}
];

const StandaloneRoutes = [
{
  path: "write-off-repayment-detail",
  children: [
  // {
  //   path: ":uuid/:mode?",
  //   element: <EditContractIndex />,
  // },
  {
    path: ":uuid/:mode/:route?",
    element: <EditWriteOffRepaymentContractIndex />
  }]
},
{
  path: "/collection-module/early-termination-process/:mode",
  element: <CreateEarlyTerminationProcess />
},
{
  path: "/collection-module/early-termination-process/:uuid/:mode",
  element: <CreateEarlyTerminationProcess />
},
{
  path: "/collection-module/repayment-list-create/",
  element: <RepaymentCreate />
},
{
  path: "/collection-module/repayment/:uuid/:mode",
  element: <RepaymentCreate />
},
{
  path: "/collection-module/:route/:uuid/:mode",
  element: <RepaymentIndex />
},
{
  path: "/collection-module/kpay-repayment/:uuid/:mode",
  element: <KPayRepaymentIndex />
},
{
  path: "/collection-module/repayment/:uuid/applied-settlement-data",
  element: <AppliedSettlementDataIndex />
},
{
  path: "/collection-module/repayment/:uuid/applied-settlement-data/:mode",
  element: <AppliedSettlementDataIndex />
},
{
  path: "/write-off-preparation",
  element: <CreateWriteOffBatch />
},
{
  path: "/write-off-preparation/:uuid/:mode",
  element: <CreateWriteOffBatch />
},
{
  path: "write-off-preparation/write-off-signature/:uuid/:id",
  element: <WriteOffSignatureIndex />
},
{
  path: "/insufficient-payment-preparation",
  element: <CreateInsufficientPaymentBatch />
},
{
  path: "/insufficient-payment-preparation/:uuid/:mode",
  element: <CreateInsufficientPaymentBatch />
}
];

export { MainLayoutRoutes, StandaloneRoutes };