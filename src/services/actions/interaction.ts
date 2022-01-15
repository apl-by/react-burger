import { TActionTemplate, TErrorAlertPayload } from "../../types/services";

export const ALERT_ERROR = "ALERT_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SHOW_CONFIRM = "SHOW_CONFIRM";
export const HIDE_CONFIRM = "HIDE_CONFIRM";
export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";

// типы экшенов:
 
// для errorAlertReducer
type TAlertErrorAction = Required<TActionTemplate<
  typeof ALERT_ERROR,
  TErrorAlertPayload
  >>;

type TClearErrorAction = TActionTemplate<typeof CLEAR_ERROR>;

export type TErrorAlertActions = TAlertErrorAction | TClearErrorAction;

// для сonfirmationReducer
type TShowConfirmAction = Required<TActionTemplate<typeof SHOW_CONFIRM, string>>;

type THideConfirmAction = TActionTemplate<typeof HIDE_CONFIRM>;

export type TConfirmationActions = TShowConfirmAction | THideConfirmAction;

// для alertReducer
type TShowAlertAction = Required<TActionTemplate<typeof SHOW_ALERT, string>>;

type THideAlertAction = TActionTemplate<typeof HIDE_ALERT>;

export type TAlertActions = TShowAlertAction | THideAlertAction;
