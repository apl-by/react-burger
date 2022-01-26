import { TActionTemplate, TOrderSuccessPayload } from "../../types/services";
import { IMenuItem } from "../../types/common";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";
export const CLOSE_ORDER_DETAILS = "CLOSE_ORDER_DETAILS";

// для orderDetailsReducer
type TOrderRequestAction = Required<
  TActionTemplate<typeof ORDER_REQUEST, IMenuItem[]>
>;

type TOrderSuccessAction = Required<
  TActionTemplate<typeof ORDER_SUCCESS, TOrderSuccessPayload>
>;

type TOrderErrorAction = TActionTemplate<typeof ORDER_ERROR>;

type TCloseOrderDetailsAction = TActionTemplate<typeof CLOSE_ORDER_DETAILS>;

export type TOrderDetailsActions =
  | TOrderRequestAction
  | TOrderSuccessAction
  | TOrderErrorAction
  | TCloseOrderDetailsAction;
