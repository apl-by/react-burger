import { combineReducers } from "redux";
import { menu, burgConstructor, ingrDetails, orderDetails } from "./main";
import { user } from "./auth";

const rootReducer = combineReducers({
  menu,
  burgConstructor,
  ingrDetails,
  orderDetails,
  user,
});

export default rootReducer;
