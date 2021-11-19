import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT,
} from "../actions/auth";

const initialUser = {
  user: undefined,
  isAuthorized: false,
  userRequest: false,
  userFailed: false,
  wasInitialRequest: false,
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
        wasInitialRequest: true,
      };
    case USER_ERROR:
      return {
        ...initialUser,
        isAuthorized: false,
        userFailed: true,
        wasInitialRequest: true,
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
    case LOGOUT:
      return {
        ...initialUser,
        wasInitialRequest: true,
      };
    default:
      return state;
  }
};
