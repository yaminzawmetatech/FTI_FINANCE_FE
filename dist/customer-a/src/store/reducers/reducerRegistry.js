import { combineReducers } from "redux";
import administrationReducers from "modules/administration/reducerMap";
import credit_managementReducers from "modules/credit-management/reducerMap";

export const getEnabledReducerMap = () => {
  const reducerMap = {};
  Object.assign(reducerMap, administrationReducers);
  Object.assign(reducerMap, credit_managementReducers);
  return combineReducers(reducerMap);
};
