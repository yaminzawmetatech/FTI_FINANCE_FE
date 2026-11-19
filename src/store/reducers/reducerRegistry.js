import administrationReducers from "modules/administration/reducerMap";
import creditManagementReducers from "modules/credit-management/reducerMap";
import loanOperationReducers from "modules/loan-operation/reducerMap";
import collectionReducers from "modules/collection/reducerMap";
import financeReducers from "modules/finance/reducerMap";

const moduleReducers = {
  administration: administrationReducers,
  "credit-management": creditManagementReducers,
  "loan-operation": loanOperationReducers,
  collection: collectionReducers,
  finance: financeReducers,
};

export const getEnabledReducerMap = () => {
  const configured = process.env.REACT_APP_ENABLED_MODULES
    ?.split(",")
    .map((moduleId) => moduleId.trim())
    .filter(Boolean);
  const enabled = new Set(configured || Object.keys(moduleReducers));

  if (!enabled.has("administration")) enabled.add("administration");
  if (enabled.has("loan-operation") || enabled.has("collection")) {
    enabled.add("administration");
    enabled.add("credit-management");
  }
  if (enabled.has("collection")) enabled.add("loan-operation");
  if (enabled.has("finance")) enabled.add("administration");

  const reducerMap = {};
  for (const moduleId of [...enabled]) {
    Object.assign(reducerMap, moduleReducers[moduleId] || {});
  }

  return reducerMap;
};
