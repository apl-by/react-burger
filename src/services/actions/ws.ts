import { TActionTemplate, TWsOrdersSuccessPayload } from "../../types/services";

export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";

export interface IWsActionTypes {
  wsInit: "WS_CONNECTION_START";
  onOpen: "WS_CONNECTION_SUCCESS";
  onClose: "WS_CONNECTION_CLOSED";
  onError: "WS_CONNECTION_ERROR";
  onMessage: "WS_GET_MESSAGE";
}

export const wsActionTypes: IWsActionTypes = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

// типы экшенов:

type TWsConnectionStartAction = TActionTemplate<typeof WS_CONNECTION_START, string>;

type TWsConnectionSuccessAction = TActionTemplate<typeof WS_CONNECTION_SUCCESS>;

type TWsConnectionErrorAction = Required<TActionTemplate<
  typeof WS_CONNECTION_ERROR,
  Event
>>;

type TWsConnectionClosedAction = TActionTemplate<typeof WS_CONNECTION_CLOSED>;

type TWsGetMessageAction = Required<
  TActionTemplate<typeof WS_GET_MESSAGE, TWsOrdersSuccessPayload>
>;

export type TWsActions =
  | TWsConnectionStartAction
  | TWsConnectionSuccessAction
  | TWsConnectionErrorAction
  | TWsConnectionClosedAction
  | TWsGetMessageAction;
