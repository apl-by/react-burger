import { TActionTemplate } from "../../types/services";
import { IMenuItem } from "../../types/common";

export const MENU_REQUEST = "MENU_REQUEST";
export const MENU_SUCCESS = "MENU_SUCCESS";
export const MENU_ERROR = "MENU_ERROR";

// для menuReducer
type TMenuRequestAction = TActionTemplate<typeof MENU_REQUEST>;

type TMenuSuccessAction = Required<
  TActionTemplate<typeof MENU_SUCCESS, IMenuItem[]>
>;

type TMenuErrorAction = TActionTemplate<typeof MENU_ERROR>;

export type TMenuActions =
  | TMenuRequestAction
  | TMenuSuccessAction
  | TMenuErrorAction;
