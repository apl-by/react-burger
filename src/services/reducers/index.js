import { combineReducers } from "redux";
import { menu, burgConstructor, orderDetails } from "./main";
import { userData } from "./user";
import { request } from "./requests";
import { errorAlert, confirmation, alert } from "./interaction";

const rootReducer = combineReducers({
  menu,
  burgConstructor,
  orderDetails,
  userData,
  request,
  errorAlert,
  confirmation,
  alert,
});

export default rootReducer;
