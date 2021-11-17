import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "../actions/auth";

const initialUser = {
  user: undefined,
  isAuthorized: false,
  wasLogout: false,
  userRequest: false,
  userFailed: false,
};

export const user = (state = initialUser, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    case USER_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        userRequest: false,
        user: action.payload,
      };
    case USER_ERROR:
      return {
        ...initialUser,
        isAuthorized: false,
        userFailed: true,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userRequest: false,
        user: action.payload,
      };
    case UPDATE_USER_ERROR:
      return {
        ...initialUser,
        userFailed: true,
      };
    default:
      return state;
  }
};