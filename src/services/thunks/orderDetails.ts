import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLEAR_CONSTRUCTOR,
  ALERT_ERROR,
} from "../actions";
import { apiRequests } from "../../utils/api-requests";
import { setOrderRequestBody } from "../../utils/utils";
import { batch } from "react-redux";
import { TAppThunk, TAppDispatch } from "../../types/services";
import { IMenuItem } from "../../types/common";
import { TErrorAlertPayload } from "../../types/services";
import { getCookie } from "../../utils/utils";

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
