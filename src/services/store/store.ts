import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { socketMiddleware } from "../middlewares/socket-middleware";
import { wsActionTypes } from "../actions";
import { BASE_URL_WS } from "../../utils/data";

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, socketMiddleware(BASE_URL_WS, wsActionTypes))
);

const store = createStore(rootReducer, enhancer);

export default store;
