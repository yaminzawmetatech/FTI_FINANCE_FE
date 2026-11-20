import administrationReducers from "modules/administration/reducerMap";
import creditManagementReducers from "modules/credit-management/reducerMap";
import loanOperationReducers from "modules/loan-operation/reducerMap";
import collectionReducers from "modules/collection/reducerMap";
import financeReducers from "modules/finance/reducerMap";
import { getSourceModuleIds } from "app/config/moduleRegistry";

const moduleReducers = {
  administration: administrationReducers,
  "credit-management": creditManagementReducers,
  "loan-operation": loanOperationReducers,
  collection: collectionReducers,
  finance: financeReducers,
};

export const getEnabledReducerMap = () => {
  const reducerMap = {};
  for (const moduleId of getSourceModuleIds()) {
    const reducers = moduleReducers[moduleId];
    if (!reducers) {
      throw new Error(`No reducer map is registered for module "${moduleId}".`);
    }
    Object.assign(reducerMap, reducers);
  }

  return reducerMap;
};
