import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_REQUEST,
  LOGOUT,
} from "../actions/user";
import { apiRequests } from "../../utils/api-requests";
import { getCookie, setCookie, deleteCookie } from "../../utils/utils";
import { cookiesSettings } from "../../utils/data";
import {
  AppThunk,
  AppDispatch,
  TErrorAlertPayload,
} from "../../types/services";
import { IAllInputs } from "../../types/common";

// Thunk для получения user
const _reuseGetUser = (dispatch: AppDispatch) => {
  return apiRequests.getUser(getCookie("accessToken")).then((res) => {
    if (res.success) {
      dispatch({ type: USER_SUCCESS, payload: res.user });
    } else {
      throw new Error("Ошибка получения данных");
    }
  });
};

const _reuseUserError = (dispatch: AppDispatch, err: TErrorAlertPayload) => {
  dispatch({ type: USER_ERROR });
  console.log(`Error ${err.status ?? ""}: ${err.message}`);
};

export const getUser: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch({ type: USER_REQUEST });
  try {
    await _reuseGetUser(dispatch);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      try {
        const newToken = await apiRequests.refreshToken(
          getCookie("refreshToken")
        );
        const { accessToken, refreshToken } = cookiesSettings;
        setCookie(
          accessToken.name,
          newToken.accessToken.replace("Bearer ", ""),
          accessToken.options
        );
        setCookie(
          refreshToken.name,
          newToken.refreshToken,
          refreshToken.options
        );
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
const _reusePatchUser = (dispatch: AppDispatch, data: IAllInputs<string>) => {
  return apiRequests.patchUser(getCookie("accessToken"), data).then((res) => {
    if (res.success) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.user });
    } else {
      throw new Error("Ошибка получения данных");
    }
  });
};

const _reusePatchUserError = (
  dispatch: AppDispatch,
  err: TErrorAlertPayload
) => {
  dispatch({ type: UPDATE_USER_ERROR });
  console.log(`Error ${err.status ?? ""}: ${err.message}`);
};

export const patchUser: AppThunk =
  (data: IAllInputs<string>) => async (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      await _reusePatchUser(dispatch, data);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        try {
          const newToken = await apiRequests.refreshToken(
            getCookie("refreshToken")
          );
          const { accessToken, refreshToken } = cookiesSettings;
          setCookie(
            accessToken.name,
            newToken.accessToken.replace("Bearer ", ""),
            accessToken.options
          );
          setCookie(
            refreshToken.name,
            newToken.refreshToken,
            refreshToken.options
          );
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
export const logout: AppThunk = () => (dispatch: AppDispatch) => {
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
