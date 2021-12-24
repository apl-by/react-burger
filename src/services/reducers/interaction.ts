import {
  ALERT_ERROR,
  CLEAR_ERROR,
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  SHOW_ALERT,
  HIDE_ALERT,
  TErrorAlertActions,
  TConfirmationActions,
  TAlertActions,
} from "../actions";
import { TErrorAlertPayload } from "../../types/services";

interface IErrState {
  errors: TErrorAlertPayload[];
}

interface IAlertState {
  message: string;
}

interface IConfirmState {
  show: boolean;
  text: string;
}

const initialErrState: IErrState = {
  errors: [],
};

const initialAlertState: IAlertState = {
  message: "",
};

const initialConfirmState: IConfirmState = {
  show: false,
  text: "",
};

export const errorAlertReducer = (
  state = initialErrState,
  action: TErrorAlertActions
): IErrState => {
  switch (action.type) {
    case ALERT_ERROR:
      return {
        errors: [...state.errors, action.payload],
      };
    case CLEAR_ERROR:
      return {
        errors: [...state.errors.slice(1)],
      };
    default:
      return state;
  }
};

export const alertReducer = (
  state = initialAlertState,
  action: TAlertActions
): IAlertState => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        message: action.payload,
      };
    case HIDE_ALERT:
      return {
        message: "",
      };
    default:
      return state;
  }
};

export const confirmationReducer = (
  state = initialConfirmState,
  action: TConfirmationActions
): IConfirmState => {
  switch (action.type) {
    case SHOW_CONFIRM:
      return {
        show: true,
        text: action.payload,
      };
    case HIDE_CONFIRM:
      return initialConfirmState;
    default:
      return state;
  }
};
