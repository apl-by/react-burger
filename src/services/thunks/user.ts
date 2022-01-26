import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_REQUEST,
  LOGOUT,
} from "../actions";
import { apiRequests } from "../../utils/api-requests";
import { getCookie, deleteCookie } from "../../utils/utils";
import {
  TAppThunk,
  TAppDispatch,
  TErrorAlertPayload,
} from "../../types/services";
import { IAllInputs } from "../../types/common";

// Thunk для получения user
const _reuseGetUser = (dispatch: TAppDispatch) => {
  return apiRequests.getUser(getCookie("accessToken")).then((res) => {
    if (res.success) {
      dispatch({ type: USER_SUCCESS, payload: res.user });
    } else {
      throw new Error("Ошибка получения данных");
    }
  });
};

const _reuseUserError = (dispatch: TAppDispatch, err: TErrorAlertPayload) => {
  dispatch({ type: USER_ERROR });
  console.log(`Error ${err.status ?? ""}: ${err.message}`);
};

export const getUser: TAppThunk = () => async (dispatch: TAppDispatch) => {
  dispatch({ type: USER_REQUEST });
  try {
    await _reuseGetUser(dispatch);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      try {
        await apiRequests.refreshToken(getCookie("refreshToken"));
        await _reuseGetUser(dispatch);
      } catch (err: any) {
        _reuseUserError(dispatch, err);
      }
    } else {
      _reuseUserError(dispatch, err);
    }
  }
};

// Thunk для обновления user
const _reusePatchUser = (dispatch: TAppDispatch, data: IAllInputs<string>) => {
  return apiRequests.patchUser(getCookie("accessToken"), data).then((res) => {
    if (res.success) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.user });
    } else {
      throw new Error("Ошибка получения данных");
    }
  });
};

const _reusePatchUserError = (
  dispatch: TAppDispatch,
  err: TErrorAlertPayload
) => {
  dispatch({ type: UPDATE_USER_ERROR });
  console.log(`Error ${err.status ?? ""}: ${err.message}`);
};

export const patchUser: TAppThunk =
  (data: IAllInputs<string>) => async (dispatch: TAppDispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      await _reusePatchUser(dispatch, data);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        try {
          await apiRequests.refreshToken(getCookie("refreshToken"));
          await _reusePatchUser(dispatch, data);
        } catch (err: any) {
          _reusePatchUserError(dispatch, err);
        }
      } else {
        _reusePatchUserError(dispatch, err);
      }
    }
  };

// Выход из профиля
export const logout: TAppThunk = () => (dispatch: TAppDispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  return apiRequests
    .logout(getCookie("refreshToken"))
    .then((res) => {
      if (res.success) {
        console.log("Выход из аккаунта успешный");
      } else {
        throw new Error("Произошла ошибка");
      }
    })
    .catch((err: TErrorAlertPayload) => {
      console.log(`Error ${err.status ?? ""}: ${err.message}`);
    })
    .finally(() => {
      deleteCookie("refreshToken", "accessToken");
      dispatch({ type: LOGOUT });
    });
};
