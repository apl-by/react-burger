import { TActionTemplate, TErrorAlertPayload } from "../../types/services";

export const ALERT_ERROR = "ALERT_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

// для errorAlertReducer
type TAlertErrorAction = Required<
  TActionTemplate<typeof ALERT_ERROR, TErrorAlertPayload>
>;

type TClearErrorAction = TActionTemplate<typeof CLEAR_ERROR>;

export type TErrorAlertActions = TAlertErrorAction | TClearErrorAction;
