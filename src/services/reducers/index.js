import { combineReducers } from "redux";
import { menu, burgConstructor, orderDetails } from "./main";
import { userData } from "./auth";

const rootReducer = combineReducers({
  menu,
  burgConstructor,
  orderDetails,
  userData,
});

export default rootReducer;
