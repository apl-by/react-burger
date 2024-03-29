import {
  START_REQUEST,
  END_REQUEST,
  ALERT_ERROR,
  SHOW_ALERT,
} from "../actions";
import { apiRequests } from "../../utils/api-requests";
import { cookiesSettings } from "../../utils/data";
import { setCookie } from "../../utils/utils";
import { getUser } from "./user";
import {
  TAppThunk,
  TAppDispatch,
  TErrorAlertPayload,
} from "../../types/services";
import { IAllInputs } from "../../types/common";
import { NavigateFunction } from "react-router-dom";

export const register: TAppThunk =
  (data: IAllInputs<string>, confirm: (text: string) => Promise<boolean>) =>
  (dispatch: TAppDispatch | TAppThunk<void>) => {
    dispatch({ type: START_REQUEST });
    return apiRequests
      .register(data)
      .then(async (res) => {
        if (res.success) {
          const isConfirmed = await confirm(
            "Вы успешно зарегистрировались! \n Желаете войти?"
          );
          if (isConfirmed) {
            const { accessToken, refreshToken } = cookiesSettings;
            setCookie(
              accessToken.name,
              res.accessToken.replace("Bearer ", ""),
              accessToken.options
            );
            setCookie(
              refreshToken.name,
              res.refreshToken,
              refreshToken.options
            );
            dispatch(getUser());
          } else {
            return;
          }
        } else {
          throw new Error("Произошла ошибка");
        }
      })
      .catch((err: TErrorAlertPayload) =>
        dispatch({ type: ALERT_ERROR, payload: err })
      )
      .finally(() => dispatch({ type: END_REQUEST }));
  };

export const login: TAppThunk =
  (data: IAllInputs<string>) => (dispatch: TAppDispatch | TAppThunk<void>) => {
    dispatch({ type: START_REQUEST });
    return apiRequests
      .login(data)
      .then((res) => {
        if (res.success) {
          const { accessToken, refreshToken } = cookiesSettings;
          setCookie(
            accessToken.name,
            res.accessToken.replace("Bearer ", ""),
            accessToken.options
          );
          setCookie(refreshToken.name, res.refreshToken, refreshToken.options);
          dispatch(getUser());
        } else {
          throw new Error("Произошла ошибка");
        }
      })
      .catch((err: TErrorAlertPayload) =>
        dispatch({ type: ALERT_ERROR, payload: err })
      )
      .finally(() => dispatch({ type: END_REQUEST }));
  };

export const confirmEmail: TAppThunk =
  (data: IAllInputs<string>, navigate: NavigateFunction) =>
  (dispatch: TAppDispatch) => {
    dispatch({ type: START_REQUEST });
    return apiRequests
      .confirmEmail(data)
      .then((res) => {
        if (res.success) {
          navigate("/reset-password", { state: { from: "/reset-password" } });
        } else {
          throw new Error("Произошла Ошибка");
        }
      })
      .catch((err: TErrorAlertPayload) => {
        dispatch({ type: ALERT_ERROR, payload: err });
      })
      .finally(() => dispatch({ type: END_REQUEST }));
  };

export const resetPassword: TAppThunk =
  (data: IAllInputs<string>) => (dispatch: TAppDispatch) => {
    dispatch({ type: START_REQUEST });
    return apiRequests
      .resetPassword(data)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SHOW_ALERT,
            payload: "Пароль успешно изменён",
          });
        } else {
          throw new Error("Произошла ошибка");
        }
      })
      .catch((err: TErrorAlertPayload) =>
        dispatch({ type: ALERT_ERROR, payload: err })
      )
      .finally(() => dispatch({ type: END_REQUEST }));
  };
