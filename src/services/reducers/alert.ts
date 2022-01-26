import { SHOW_ALERT, HIDE_ALERT, TAlertActions } from "../actions";

interface IAlertState {
  message: string;
}

const initialAlertState: IAlertState = {
  message: "",
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
