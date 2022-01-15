import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import store from "../services/store/store";
import {
  TErrorAlertActions,
  TConfirmationActions,
  TAlertActions,
  TMenuActions,
  TBurgConstructorActions,
  TOrderDetailsActions,
  TRequestActions,
  TUserDataActions,
  TWsActions,
} from "../services/actions";
import { IWsResApi } from "./common";


export type TRootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions =
  | TErrorAlertActions
  | TConfirmationActions
  | TAlertActions
  | TMenuActions
  | TBurgConstructorActions
  | TOrderDetailsActions
  | TRequestActions
  | TUserDataActions
  | TWsActions;

// Типизация thunk'ов
export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;

// Типизация метода dispatch
export type TAppDispatch = Dispatch<TApplicationActions>;

// общие типы для services
export type TActionTemplate<Type, Payload = undefined> = {
  readonly type: Type;
  readonly payload?: Payload;
};

export type TErrorAlertPayload = {
  message: string;
  status?: number;
  [key: string]: unknown;
};

export type TOrderSuccessPayload = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TUserSuccessPayload = { email: string; name: string };

export type TWsOrdersSuccessPayload = {
  resApi: IWsResApi;
  url: string
};
