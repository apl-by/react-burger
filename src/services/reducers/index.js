import { combineReducers } from "redux";
import { menu, burgConstructor, orderDetails } from "./main";
import { userData } from "./user";
import { request } from "./requests";
const rootReducer = combineReducers({
  menu,
  burgConstructor,
  orderDetails,
  userData,
  request
});

export default rootReducer;
