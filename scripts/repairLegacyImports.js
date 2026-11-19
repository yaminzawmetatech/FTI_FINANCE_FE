const fs = require("fs");
const path = require("path");

const moduleFiles = new Map();
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      const existing = moduleFiles.get(entry.name) || [];
      existing.push(current);
      moduleFiles.set(entry.name, existing);
    }
  }
};

walk("src/modules");

const replacements = [
  ["modules/administration/pages/Administration/ApplicationInformationSetup/", "modules/credit-management/setup/ApplicationInformationSetup/"],
  ["modules/administration/pages/Administration/ApplicationInformationSetupList/", "modules/credit-management/setup/ApplicationInformationSetupList/"],
  ["modules/administration/pages/Administration/ApplicationResponseSetup/", "modules/credit-management/setup/ApplicationResponseSetup/"],
  ["modules/administration/pages/Administration/AssessmentResponseSetup/", "modules/credit-management/setup/AssessmentResponseSetup/"],
  ["modules/administration/pages/Administration/SurveySetup/", "modules/credit-management/setup/SurveySetup/"],
  ["modules/administration/pages/Administration/DownPaymentSchemeSetup/", "modules/loan-operation/setup/DownPaymentSchemeSetup/"],
  ["modules/administration/pages/Administration/BillingDateRegistration/", "modules/loan-operation/setup/BillingDateRegistration/"],
  ["modules/administration/pages/Administration/Disbursement/", "modules/loan-operation/setup/Disbursement/"],
  ["modules/administration/pages/Administration/InsuranceCompanySetup/", "modules/loan-operation/setup/InsuranceCompanySetup/"],
  ["modules/administration/pages/Administration/InsuranceFeesSetup/", "modules/loan-operation/setup/InsuranceFeesSetup/"],
  ["modules/administration/pages/Administration/ContractAggrementSetup/", "modules/loan-operation/setup/ContractAggrementSetup/"],
  ["modules/administration/pages/Administration/ContractForm/", "modules/loan-operation/setup/ContractForm/"],
  ["modules/administration/pages/Administration/FirstDueDateSetup/", "modules/loan-operation/setup/FirstDueDateSetup/"],
  ["modules/administration/pages/Administration/CollectionFeesSetup/", "modules/collection/setup/CollectionFeesSetup/"],
  ["modules/administration/pages/Administration/ReminderSetup/", "modules/collection/setup/ReminderSetup/"],
  ["modules/administration/pages/Administration/SMSSetup/", "modules/collection/setup/SMSSetup/"],
  ["modules/administration/pages/Administration/FollowUpResultSetup/", "modules/collection/setup/FollowUpResultSetup/"],
  ["modules/administration/pages/Administration/AllocateActivitiesSetup/", "modules/collection/setup/AllocateActivitiesSetup/"],
  ["modules/administration/pages/Administration/EarlyTerminationFeesSetup/", "modules/collection/setup/EarlyTerminationFeesSetup/"],
  ["modules/administration/pages/Administration/DemandLetterSetup/", "modules/collection/setup/DemandLetterSetup/"],
  ["modules/administration/pages/Administration/BlackListCustomerSetup/", "modules/collection/setup/BlackListCustomerSetup/"],
  ["modules/administration/pages/Administration/CashDepositSetup/", "modules/finance/setup/CashDepositSetup/"],
  ["modules/administration/pages/Administration/GeneralLedgerEntrySetup/", "modules/finance/setup/GeneralLedgerEntrySetup/"],
  ["modules/administration/pages/Administration/PrioritySetup/", "modules/finance/setup/PrioritySetup/"],
  ["modules/administration/pages/Administration/LastPaymentSetup/", "modules/finance/setup/LastPaymentSetup/"],
];

const walkSource = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const current = path.join(directory, entry.name);
    if (entry.isDirectory()) walkSource(current);
    else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      let text = fs.readFileSync(current, "utf8");
      for (const [oldPath, newPath] of replacements) text = text.replaceAll(oldPath, newPath);

      text = text.replace(
        /(["'])[^"']*features\/[^/"']+\/([^/"']+)["']/g,
        (match, quote, fileName) => {
          const matches = (moduleFiles.get(fileName) || []).filter((file) => /[\\/](services|slices)[\\/]/.test(file));
          if (matches.length !== 1) return match;
          const resolved = matches[0].replace(/\\/g, "/").replace(/^src\//, "");
          return `${quote}${resolved}${quote}`;
        }
      );

      fs.writeFileSync(current, text);
    }
  }
};

walkSource("src");
