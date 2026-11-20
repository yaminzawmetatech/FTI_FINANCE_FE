import administrationSearchProvider from "./administration";
import creditManagementSearchProvider from "./creditManagement";
import loanOperationSearchProvider from "./loanOperation";
import collectionSearchProvider from "./collection";
import financeSearchProvider from "./finance";
import { buildAdvancedSearchProviderRegistry } from "./createRegistry";

const searchProviders = {
  administration: administrationSearchProvider,
  "credit-management": creditManagementSearchProvider,
  "loan-operation": loanOperationSearchProvider,
  collection: collectionSearchProvider,
  finance: financeSearchProvider,
};

export const createAdvancedSearchProviderRegistry = () =>
  buildAdvancedSearchProviderRegistry(searchProviders);
