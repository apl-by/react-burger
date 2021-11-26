import { START_REQUEST, END_REQUEST } from "../actions/requests";
import { ALERT_ERROR } from "../actions/interaction";
import { apiRequests } from "../../utils/api-requests";
import { cookiesSettings } from "../../utils/data";
import { setCookie } from "../../utils/utils";
import { getUser } from "./user";

export const register = (data, confirm) => (dispatch) => {
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
          setCookie(refreshToken.name, res.refreshToken, refreshToken.options);
          dispatch(getUser());
        } else {
          return;
        }
      } else {
        throw new Error("Произошла ошибка");
      }
    })
    .catch((err) => dispatch({ type: ALERT_ERROR, payload: err }))
    .finally(() => dispatch({ type: END_REQUEST }));
};

export const login = (data) => (dispatch) => {
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
    .catch((err) => dispatch({ type: ALERT_ERROR, payload: err }))
    .finally(() => dispatch({ type: END_REQUEST }));
};

export const confirmEmail = (data, navigate) => (dispatch) => {
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
    .catch((err) => {
      dispatch({ type: ALERT_ERROR, payload: err });
    })
    .finally(() => dispatch({ type: END_REQUEST }));
};

export const resetPassword = (data) => (dispatch) => {
  dispatch({ type: START_REQUEST });
  return apiRequests
    .resetPassword(data)
    .then((res) => {
      if (res.success) {
        alert("Пароль успешно изменён");
      } else {
        throw new Error("Произошла ошибка");
      }
    })
    .catch((err) => dispatch({ type: ALERT_ERROR, payload: err }))
    .finally(() => dispatch({ type: END_REQUEST }));
};
