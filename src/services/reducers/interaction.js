import {
  ALERT_ERROR,
  CLEAR_ERROR,
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  SHOW_ALERT,
  HIDE_ALERT,
} from "../actions/interaction";

const initialErrState = {
  errors: [],
};

export const errorAlert = (state = initialErrState, action) => {
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

const initialAlertState = {
  message: "",
};

export const alert = (state = initialAlertState, action) => {
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

const initialConfirmState = {
  show: false,
  text: "",
};

export const confirmation = (state = initialConfirmState, action) => {
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
