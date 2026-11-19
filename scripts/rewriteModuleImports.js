const fs = require("fs");
const path = require("path");

const moduleForFeature = {
  application: "credit-management",
  applicationDownPayment: "loan-operation",
  applicationInformationSetup: "credit-management",
  ApplicationInformationSetupList: "credit-management",
  applicationReason: "credit-management",
  applicationResponseSetup: "credit-management",
  assessment: "credit-management",
  assessmentResponseSetup: "credit-management",
  creditCriteria: "credit-management",
  customerInquiriesForm: "credit-management",
  customerList: "credit-management",
  guarantor: "credit-management",
  jointApplicant: "credit-management",
  reference: "credit-management",
  surveryResult: "credit-management",
  surveyCount: "credit-management",
  surveyInformation: "credit-management",
  surveyNameSetup: "credit-management",
  surveyQASetup: "credit-management",
  surveyResultList: "credit-management",
  surveyTransaction: "credit-management",
  surveyType: "credit-management",
  PartnerApplicationList: "credit-management",
  mobCounts: "credit-management",
  refinanceCustomer: "credit-management",
  brandSetup: "loan-operation",
  modelSetup: "loan-operation",
  creditSchemeSetup: "loan-operation",
  vehicleSetup: "loan-operation",
  vehicleInformation: "loan-operation",
  nameOfBusiness: "loan-operation",
  dealer: "loan-operation",
  dealerBank: "loan-operation",
  dealerContactPerson: "loan-operation",
  dealerGroup: "loan-operation",
  dealerPackage: "loan-operation",
  contract: "loan-operation",
  disbursement: "loan-operation",
  disbursementPayment: "loan-operation",
  bookingProcess: "loan-operation",
  cashDepositProcess: "loan-operation",
  cashDepositSetup: "finance",
  collateral: "loan-operation",
  collateralSignature: "loan-operation",
  collateralTypesSetup: "loan-operation",
  contractAggrementSetup: "loan-operation",
  generateLedger: "loan-operation",
  generalLedgerEntry: "finance",
  generalLedgerEntrySetup: "finance",
  initialPaymentCalculation: "loan-operation",
  insuranceInspection: "loan-operation",
  insuranceCompany: "loan-operation",
  insurancePremiumFee: "loan-operation",
  insurancePayment: "loan-operation",
  prepareForContract: "loan-operation",
  stampDutyPayment: "loan-operation",
  billingDateRegistration: "loan-operation",
  downPaymentSchemeSetup: "loan-operation",
  COR: "finance",
  kpaySynAccount: "loan-operation",
  kpayNotification: "loan-operation",
  signer: "administration",
  actualPaymentLines: "collection",
  appliedSettlementData: "collection",
  collectionFeesSetup: "collection",
  collectionResponse: "collection",
  demandLetter: "collection",
  demandLetterSetup: "collection",
  earlyTerminationFeesSetup: "collection",
  earlyTerminationProcess: "collection",
  insufficientPayment: "collection",
  insufficientPaymentBatch: "collection",
  kpayRepaymentHistory: "collection",
  penaltyLogs: "collection",
  reminderAllocation: "collection",
  reminderSetup: "collection",
  reminderSetup: "collection",
  repayment: "collection",
  smsGenerate: "collection",
  smsHistory: "collection",
  smsSetup: "collection",
  writeOff: "collection",
  writeOffBatch: "collection",
  writeOffContract: "collection",
  writeOffRecoveryIncome: "collection",
  writeOffSignature: "collection",
  FollowUpResult: "collection",
  AllocateActivities: "collection",
  lastPaymentSetup: "collection",
  dueDateSetup: "collection",
  provisionSetup: "finance",
  prioritySetup: "finance",
  EOM: "finance",
  eomSync: "finance",
  address: "administration",
  approvalWorkflow: "administration",
  auth: "administration",
  blacklistCustomer: "administration",
  category: "administration",
  contactType: "administration",
  documentAccess: "administration",
  documentType: "administration",
  emailSetup: "administration",
  mainbusinesscategory: "administration",
  menuApplicationSetup: "administration",
  nrc: "administration",
  numberSeries: "administration",
  persmissionsets: "administration",
  position: "administration",
  projectcategory: "administration",
  subcategory: "administration",
  subbusinesscategory: "administration",
  table: "administration",
  typeofbusiness: "administration",
  userGroup: "administration",
  users: "administration",
  workflow: "administration",
  department: "administration",
  bank: "administration",
  customerBank: "administration",
};

const rewriteFile = (file) => {
  let text = fs.readFileSync(file, "utf8");

  text = text.replace(
    /(["'])(?:[^"']*\/)?features\/([^/"']+)\/([^"']+)\1/g,
    (match, quote, feature, remainder) => {
      const moduleName = moduleForFeature[feature];
      if (!moduleName) return match;
      const kind = /service/i.test(remainder) ? "services" : "slices";
      return `${quote}modules/${moduleName}/${kind}/${remainder}${quote}`;
    }
  );

  text = text
    .replace(/pages\/Administration\//g, "modules/administration/pages/Administration/")
    .replace(/pages\/CreditManagement\//g, "modules/credit-management/pages/CreditManagement/")
    .replace(/pages\/LoanOperationModule\//g, "modules/loan-operation/pages/LoanOperationModule/")
    .replace(/pages\/CollectionModule\//g, "modules/collection/pages/CollectionModule/")
    .replace(/pages\/Finance\//g, "modules/finance/pages/Finance/")
    .replace(/pages\/MOB\/CustomerWebApplication\//g, "modules/credit-management/pages/MOB-CustomerWebApplication/")
    .replace(/pages\/MOB\/PDSD\//g, "modules/credit-management/setup/PDSD/")
    .replace(/pages\/MOB\/MOBSetup\//g, "modules/loan-operation/setup/MOBSetup/");

  fs.writeFileSync(file, text);
};

const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) rewriteFile(current);
  }
};

walk("src");
