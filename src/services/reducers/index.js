import { combineReducers } from "redux";
import { menu, burgConstructor, orderDetails } from "./main";
import { userData } from "./user";
import { request } from "./requests";
import { errorAlert } from "./interaction";

const rootReducer = combineReducers({
  menu,
  burgConstructor,
  orderDetails,
  userData,
  request,
  errorAlert,
});

export default rootReducer;
