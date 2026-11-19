import repayments from "./slices/repaymentSlice";
import earlyTerminationProcesses from "./slices/earlyTerminationProcessSlice";
import earlyTerminationFees from "./slices/earlyTerminationFeesSetupSlice";
import collectionFees from "./slices/collectionFeesSetupSlice";
import reminders from "./slices/reminderSetupSlice";
import reminderAllocations from "./slices/reminderAllocationSlice";
import reminderAllocationByUuid from "./slices/reminderAllocationSlice";
import reminderAllocationsByContractId from "./slices/reminderAllocationHistorySlice";
import allocatedReminderCounts from "./slices/reminderAllocationSlice";
import collectionResponses from "./slices/collectionResponseSlice";
import penaltyLogs from "./slices/penaltyLogSlice";
import kpayRepaymentHistories from "./slices/kpayRepaymentHistorySlice";
import writeOffs from "./slices/writeOffSlice";
import writeOffBatchs from "./slices/writeOffBatchSlice";
import writeOffSignature from "./slices/writeOffSignatureSlice";
import demandLetters from "./slices/demandLetterSlice";
import insufficientContracts from "./slices/insufficientPaymentSlice";
import insufficientPaymentBatchs from "./slices/insufficientPaymentBatchSlice";
import sms from "./slices/smsSetupSlice";
import smsGenerate from "./slices/smsGenerateSlice";
import smsHistories from "./slices/smsHistorySlice";
import actualPaymentLines from "./slices/actualPaymentLinesSlice";
import appliedSettlementData from "./slices/appliedSettlementSlice";
import dueDates from "./slices/dueDateSlice";
import followUpResults from "./slices/followUpResultSlice";
import allocateActivities from "./slices/allocateActivitiesSlice";
import lastPayments from "./slices/lastPaymentSlice";
import lastPaymentHistory from "./slices/lastPaymentSlice";

export default {
  repayments,
  earlyTerminationProcesses,
  earlyTerminationFees,
  collectionFees,
  reminders,
  reminderAllocations,
  reminderAllocationByUuid,
  reminderAllocationsByContractId,
  allocatedReminderCounts,
  collectionResponses,
  penaltyLogs,
  kpayRepaymentHistories,
  writeOffs,
  writeOffBatchs,
  writeOffSignature,
  demandLetters,
  insufficientContracts,
  insufficientPaymentBatchs,
  sms,
  smsGenerate,
  smsHistories,
  actualPaymentLines,
  appliedSettlementData,
  dueDates,
  followUpResults,
  allocateActivities,
  lastPayments,
  lastPaymentHistory,
};
