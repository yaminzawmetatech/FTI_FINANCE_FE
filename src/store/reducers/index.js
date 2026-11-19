import { combineReducers } from "redux";
import { getEnabledReducerMap } from "./reducerRegistry";

const reducers = combineReducers(getEnabledReducerMap());

export default reducers;
