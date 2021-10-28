import {
  MENU_REQUEST,
  MENU_SUCCESS,
  MENU_ERROR,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
} from "../actions";
import { apiRequests } from "../../utils/api-requests";
import { setOrderRequestBody } from "../../utils/utils";

export const getMenu = () => (dispatch) => {
  dispatch({ type: MENU_REQUEST });
  apiRequests
    .getMenu()
    .then((res) => {
      if (res.success) {
        dispatch({ type: MENU_SUCCESS, payload: { menu: res.data } });
      } else {
        dispatch({ type: MENU_ERROR });
      }
    })
    .catch(() => dispatch({ type: MENU_ERROR }));
}

export const postOrder = (order) => (dispatch) => {
  dispatch({ type: ORDER_REQUEST, payload: { order } });
  apiRequests
    .postOrder(setOrderRequestBody(order))
    .then((res) => {
      if (res.success) {
        dispatch({ type: ORDER_SUCCESS, payload: { res } });
      } else {
        dispatch({ type: ORDER_ERROR });
      }
    })
    .catch(() => dispatch({ type: ORDER_ERROR }));
}; 
