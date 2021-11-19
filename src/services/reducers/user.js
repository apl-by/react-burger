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

const initialUser = {
  user: undefined,
  isAuthorized: false,
  userRequest: false,
  userFailed: false,
  wasInitialAuth: false,
};

export const userData = (state = initialUser, action) => {
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
        wasInitialAuth: true,
      };
    case USER_ERROR:
      return {
        ...initialUser,
        isAuthorized: false,
        userFailed: true,
        wasInitialAuth: true,
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
        user: { ...state.user, ...action.payload },
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        userFailed: true,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    case LOGOUT:
      return {
        ...initialUser,
        wasInitialAuth: true,
      };
    default:
      return state;
  }
};
