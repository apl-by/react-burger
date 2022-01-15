import type { Middleware, MiddlewareAPI } from "redux";
import { batch } from "react-redux";
import type {
  TApplicationActions,
  TAppDispatch,
  TRootState,
  TAppThunk,
} from "../../types/services";
import { IWsActionTypes } from "../actions";
import { apiRequests } from "../../utils/api-requests";
import { getCookie } from "../../utils/utils";
import { ORDER_ERROR } from "../actions";
import { getUser } from "../thunks/user";
import { ALERT_ERROR } from "../actions";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: IWsActionTypes
): Middleware => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;
    return (next) => (action: TApplicationActions) => {
      // const dispatch = store.dispatch as TAppDispatch | TAppThunk<void>;
      const dispatch = store.dispatch;
      const { type, payload } = action;
      const { wsInit, onMessage, onOpen, onClose, onError } = wsActions;
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (false) {
        dispatch(getUser());
      }
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (type === wsInit) {
        const url = payload ? wsUrl + payload : wsUrl;
        socket = new WebSocket(url);
      }
      if (type === onClose && socket?.readyState === 1) {
        socket.close();
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.success) {
            dispatch({
              type: onMessage,
              payload: { resApi: parsedData, url: socket?.url } as any,
            });
          }
          if (parsedData.message === "Invalid or missing token") {
            apiRequests.refreshToken(getCookie("refreshToken")).catch(err => {
               batch(() => {
                 dispatch({ type: ORDER_ERROR });
                 dispatch({ type: ALERT_ERROR, payload: err });
               });
            });
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose });
        };
      }
      next(action);
    };
  };
};
