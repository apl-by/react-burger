import { combineReducers } from "redux";
import { menuReducer } from "./menu";
import { burgConstructorReducer } from "./burgConstructor";
import { orderDetailsReducer } from "./orderDetails";
import { userDataReducer } from "./user";
import { requestReducer } from "./requests";
import { errorAlertReducer } from "./errorAlert";
import { confirmationReducer } from "./сonfirmation";
import { alertReducer } from "./alert";
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
