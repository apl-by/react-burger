import { combineReducers } from "redux";
import { menu, burgConstructor, ingrDetails, orderDetails } from "./reducers";

const rootReducer = combineReducers({
  menu,
  burgConstructor,
  ingrDetails,
  orderDetails,
});

export default rootReducer;
