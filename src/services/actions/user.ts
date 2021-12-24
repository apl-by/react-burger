import { TActionTemplate, TUserSuccessPayload } from "../../types/services";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT = "LOGOUT";

// типы экшенов:

// для userDataReducer
type TUserRequestAction = TActionTemplate<typeof USER_REQUEST>;

type TUserSuccessAction = Required<
  TActionTemplate<typeof USER_SUCCESS, TUserSuccessPayload>
>;

type TUserErrorAction = TActionTemplate<typeof USER_ERROR>;

type TUpdateUserRequestAction = TActionTemplate<typeof UPDATE_USER_REQUEST>;

type TUpdateUserSuccessAction = Required<
  TActionTemplate<typeof UPDATE_USER_SUCCESS, TUserSuccessPayload>
>;

type TUpdateUserErrorAction = TActionTemplate<typeof UPDATE_USER_ERROR>;

type TLogoutRequestAction = TActionTemplate<typeof LOGOUT_REQUEST>;

type TLogoutAction = TActionTemplate<typeof LOGOUT>;

export type TUserDataActions =
  | TUserRequestAction
  | TUserSuccessAction
  | TUserErrorAction
  | TUpdateUserRequestAction
  | TUpdateUserSuccessAction
  | TUpdateUserErrorAction
  | TLogoutRequestAction
  | TLogoutAction;
