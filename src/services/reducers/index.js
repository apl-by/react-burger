import { combineReducers } from "redux";
import { menu, burgConstructor, ingrDetails, orderDetails } from "./main";
import { userData } from "./auth";

const rootReducer = combineReducers({
  menu,
  burgConstructor,
  ingrDetails,
  orderDetails,
  userData,
});

export default rootReducer;
