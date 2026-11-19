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

const moveFiles = (source, destination) => {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const target = path.join(destination, entry.name);
    fs.renameSync(path.join(source, entry.name), target);
  }
};

for (const [feature, moduleName] of Object.entries(moduleForFeature)) {
  const source = path.join("src", "features", feature);
  const moduleRoot = path.join("src", "modules", moduleName);
  if (!fs.existsSync(source)) continue;

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const service = /Service/i.test(entry.name);
    const destination = path.join(
      moduleRoot,
      service ? "services" : "slices",
      entry.name
    );
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.renameSync(path.join(source, entry.name), destination);
  }

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const directory = path.join(source, entry.name);
    for (const file of fs.readdirSync(directory, { withFileTypes: true })) {
      if (!file.isFile()) continue;
      const service = /Service/i.test(file.name);
      const destination = path.join(
        moduleRoot,
        service ? "services" : "slices",
        file.name
      );
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.renameSync(path.join(directory, file.name), destination);
    }
  }
}
