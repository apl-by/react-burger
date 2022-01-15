import { combineReducers } from "redux";
import {
  menuReducer,
  burgConstructorReducer,
  orderDetailsReducer,
} from "./main";
import { userDataReducer } from "./user";
import { requestReducer } from "./requests";
import {
  errorAlertReducer,
  confirmationReducer,
  alertReducer,
} from "./interaction";
import { ordersReducer } from "./ws";

const rootReducer = combineReducers({
  menu: menuReducer,
  burgConstructor: burgConstructorReducer,
  orderDetails: orderDetailsReducer,
  userData: userDataReducer,
  request: requestReducer,
  errorAlert: errorAlertReducer,
  confirmation: confirmationReducer,
  alert: alertReducer,
  orders: ordersReducer,
});

export default rootReducer;
