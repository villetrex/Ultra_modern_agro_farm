import { combineReducers } from "redux";

import authReducer from "./authReducer";

// COMBINED REDUCERS
const reducers = {
  auth: authReducer,
};

export default combineReducers(reducers);
