import application from "./slices/applicationSlice";
import applicationDetail from "./slices/applicationDetailSlice";
import applicationSignatures from "./slices/applicationSignatureSlice";
import applicationInformationSetup from "./slices/applicationInformationSetupPropertySlice";
import applicationInformationSetupList from "./slices/applicationInformationSetupListSlice";
import applicationResponses from "./slices/applicationResponseSlice";
import assessmentResponses from "./slices/assessmentResponseSlice";
import applicationReasons from "./slices/applicationReasonSlice";
import assessments from "./slices/assessmentSlice";
import surveyResult from "./slices/surveyResultSlice";
import surveyTransactions from "./slices/surveyTransactionSlice";
import customers from "./slices/customerListSlice";
import customerDetail from "./slices/customerListSlice";
import guarantors from "./slices/guarantorSlice";
import guarantorDetail from "./slices/guarantorSlice";
import guarantor from "./slices/guarantorSlice";
import jointApplicants from "./slices/jointApplicantSlice";
import jointApplicantDetail from "./slices/jointApplicantSlice";
import references from "./slices/referenceSlice";
import referenceDetail from "./slices/referenceSlice";
import reference from "./slices/referenceSlice";
import creditCriteria from "./slices/creditCriteriaSlice";
import creditCriteriaTypes from "./slices/creditCriteriaTypeSlice";
import creditCriteriaKeys from "./slices/creditCriteriaKeySlice";
import creditCriteriaVersions from "./slices/creditCriteriaVersionSlice";
import allCreditCriteria from "./slices/creditCriteriaSlice";
import allCreditCriteriaHistory from "./slices/allCreditCriteriaSlice";
import customerInquiries from "./slices/customerInquiriesFormSlice";
import refinanceCustomers from "./slices/refinanceCustomerSlice";
import mobApplicationsCount from "./slices/mobCountSlice";
import mobSurveysCount from "./slices/mobCountSlice";
import mobDownPaymentsCount from "./slices/mobCountSlice";
import mobContractsCount from "./slices/mobCountSlice";
import mobSaleInvoicesCount from "./slices/mobCountSlice";
import mobRemindersCount from "./slices/mobCountSlice";
import surveyInformation from "./slices/surveyInformationSlice";

const reducerMap = {
  application,
  applicationDetail,
  applicationSignatures,
  applicationInformationSetup,
  applicationInformationSetupList,
  applicationResponses,
  assessmentResponses,
  applicationReasons,
  assessments,
  surveyResult,
  surveyTransactions,
  customers,
  customerDetail,
  guarantors,
  guarantorDetail,
  guarantor,
  jointApplicants,
  jointApplicantDetail,
  references,
  referenceDetail,
  reference,
  creditCriteria,
  creditCriteriaTypes,
  creditCriteriaKeys,
  creditCriteriaVersions,
  allCreditCriteria,
  allCreditCriteriaHistory,
  customerInquiries,
  refinanceCustomers,
  mobApplicationsCount,
  mobSurveysCount,
  mobDownPaymentsCount,
  mobContractsCount,
  mobSaleInvoicesCount,
  mobRemindersCount,
  surveyInformation,
};

export default reducerMap;
