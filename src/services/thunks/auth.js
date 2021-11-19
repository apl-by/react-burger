import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "../actions/auth";
import { apiRequests } from "../../utils/api-requests";
import { getCookie, setCookie } from "../../utils/utils";
import { cookiesSettings } from "../../utils/data";

// Thunk для получения user
const _reuseGetUser = (dispatch) => {
  return apiRequests.getUser(getCookie("accessToken")).then((res) => {
    if (res.success) {
      dispatch({ type: USER_SUCCESS, payload: res.user });
    } else {
      throw new Error("Ошибка получения данных");
    }
  });
};

const _reuseUserError = (dispatch, err) => {
  dispatch({ type: USER_ERROR });
  console.log(`Error ${err.status ?? ""}: ${err.message}`);
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: USER_REQUEST });
  try {
    await _reuseGetUser(dispatch);
  } catch (err) {
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
      } catch (err) {
        _reuseUserError(dispatch, err);
      }
    } else {
      _reuseUserError(dispatch, err);
    }
  }
};

// Thunk для обновления user
const _reusePatchUser = (dispatch, data) => {
  return apiRequests.patchUser(getCookie("accessToken"), data).then((res) => {
    if (res.success) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.user });
    } else {
      throw new Error("Ошибка получения данных");
    }
  });
};

const _reusePatchUserError = (dispatch, err) => {
  dispatch({ type: UPDATE_USER_ERROR });
  console.log(`Error ${err.status ?? ""}: ${err.message}`);
};

export const patchUser = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    await _reusePatchUser(dispatch, data);
  } catch (err) {
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
      } catch (err) {
        _reusePatchUserError(dispatch, err);
      }
    } else {
      _reusePatchUserError(dispatch, err);
    }
  }
};
