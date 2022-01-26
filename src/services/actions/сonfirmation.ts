import { TActionTemplate } from "../../types/services";

export const SHOW_CONFIRM = "SHOW_CONFIRM";
export const HIDE_CONFIRM = "HIDE_CONFIRM";

// для сonfirmationReducer
type TShowConfirmAction = Required<
  TActionTemplate<typeof SHOW_CONFIRM, string>
>;

type THideConfirmAction = TActionTemplate<typeof HIDE_CONFIRM>;

export type TConfirmationActions = TShowConfirmAction | THideConfirmAction;
