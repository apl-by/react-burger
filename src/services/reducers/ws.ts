import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWsActions,
} from "../actions";
import { IWsResApi } from "../../types/common";

interface IResApiOrders {
  wsConnected: boolean;
  resAll: IWsResApi | undefined;
  resOwner: IWsResApi | undefined;
  error?: Event;
}

const initialOrders: IResApiOrders = {
  wsConnected: false,
  resAll: undefined,
  resOwner: undefined,
};

export const ordersReducer = (
  state = initialOrders,
  action: TWsActions
): IResApiOrders => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        resAll: action.payload.url.startsWith(
          "wss://norma.nomoreparties.space/orders/all"
        )
          ? { ...action.payload.resApi }
          : state.resAll,
        resOwner: action.payload.url.startsWith(
          "wss://norma.nomoreparties.space/orders?token"
        )
          ? { ...action.payload.resApi }
          : state.resOwner,
      };
    default:
      return state;
  }
};
