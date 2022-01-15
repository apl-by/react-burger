import {
  MENU_REQUEST,
  MENU_SUCCESS,
  MENU_ERROR,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLEAR_CONSTRUCTOR,
} from "../actions/main";
import { ALERT_ERROR } from "../actions/interaction";
import { apiRequests } from "../../utils/api-requests";
import { setOrderRequestBody } from "../../utils/utils";
import { batch } from "react-redux";
import { TAppThunk, TAppDispatch } from "../../types/services";
import { IMenuItem } from "../../types/common";
import { TErrorAlertPayload } from "../../types/services";
import { getCookie } from "../../utils/utils";

export const getMenu: TAppThunk = () => (dispatch: TAppDispatch) => {
  dispatch({ type: MENU_REQUEST });
  return apiRequests
    .getMenu()
    .then((res) => {
      if (res.success) {
        dispatch({ type: MENU_SUCCESS, payload: res.data });
      } else {
        throw new Error("Произошла ошибка");
      }
    })
    .catch((err: TErrorAlertPayload) => {
      dispatch({ type: MENU_ERROR });
      console.log(`Error ${err.status ?? ""}: ${err.message}`);
    });
};

// Thunk для отправки заказа

const _reusePostOrder = (dispatch: TAppDispatch, order: IMenuItem[]) => {
  return apiRequests
    .postOrder(setOrderRequestBody(order), getCookie("accessToken"))
    .then((res) => {
      if (res.success) {
        batch(() => {
          dispatch({ type: ORDER_SUCCESS, payload: res });
          dispatch({ type: CLEAR_CONSTRUCTOR });
        });
      } else {
        throw new Error("Ошибка получения данных");
      }
    });
};

const _reusePostOrderError = (
  dispatch: TAppDispatch,
  err: TErrorAlertPayload
) => {
  batch(() => {
    dispatch({ type: ORDER_ERROR });
    dispatch({ type: ALERT_ERROR, payload: err });
  });
};

export const postOrder: TAppThunk =
  (order: IMenuItem[]) => async (dispatch: TAppDispatch) => {
    dispatch({ type: ORDER_REQUEST, payload: order });

    try {
      await _reusePostOrder(dispatch, order);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        try {
          await apiRequests.refreshToken(getCookie("refreshToken"));
          await _reusePostOrder(dispatch, order);
        } catch (err: any) {
          _reusePostOrderError(dispatch, err);
        }
      } else {
        _reusePostOrderError(dispatch, err);
      }
    }
  };
