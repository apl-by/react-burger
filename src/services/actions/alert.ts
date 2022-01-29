import { TActionTemplate } from "../../types/services";

export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";

// для alertReducer
type TShowAlertAction = Required<TActionTemplate<typeof SHOW_ALERT, string>>;

type THideAlertAction = TActionTemplate<typeof HIDE_ALERT>;

export type TAlertActions = TShowAlertAction | THideAlertAction;
