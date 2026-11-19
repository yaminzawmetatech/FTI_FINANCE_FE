import { combineReducers } from "redux";
import administrationReducers from "modules/administration/reducerMap";
import collectionReducers from "modules/collection/reducerMap";
import financeReducers from "modules/finance/reducerMap";
import credit_managementReducers from "modules/credit-management/reducerMap";
import loan_operationReducers from "modules/loan-operation/reducerMap";

export const getEnabledReducerMap = () => {
  const reducerMap = {};
  Object.assign(reducerMap, administrationReducers);
  Object.assign(reducerMap, collectionReducers);
  Object.assign(reducerMap, financeReducers);
  Object.assign(reducerMap, credit_managementReducers);
  Object.assign(reducerMap, loan_operationReducers);
  return combineReducers(reducerMap);
};
