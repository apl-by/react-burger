import {
  MENU_REQUEST,
  MENU_SUCCESS,
  MENU_ERROR,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLEAR_CONSTRUCTOR,
} from "../actions/main";
import { apiRequests } from "../../utils/api-requests";
import { setOrderRequestBody } from "../../utils/utils";
import { batch } from "react-redux";

export const getMenu = () => (dispatch) => {
  dispatch({ type: MENU_REQUEST });
  return apiRequests
    .getMenu()
    .then((res) => {
      if (res.success) {
        dispatch({ type: MENU_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: MENU_ERROR });
        throw new Error("Произошла ошибка");
      }
    })
    .catch((err) => {
      dispatch({ type: MENU_ERROR });
      console.log(`Error ${err.status ?? ""}: ${err.message}`);
    });
};

export const postOrder = (order) => (dispatch) => {
  dispatch({ type: ORDER_REQUEST, payload: order });
  return apiRequests
    .postOrder(setOrderRequestBody(order))
    .then((res) => {
      if (res.success) {
        batch(() => {
          dispatch({ type: ORDER_SUCCESS, payload: res });
          dispatch({ type: CLEAR_CONSTRUCTOR });
        });
      } else {
        dispatch({ type: ORDER_ERROR });
        throw new Error("Произошла ошибка");
      }
    })
    .catch((err) => {
      dispatch({ type: ORDER_ERROR });
      alert(`Error ${err.status ?? ""}: ${err.message}`);
    });
};
