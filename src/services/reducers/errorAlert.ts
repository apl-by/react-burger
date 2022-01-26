import { ALERT_ERROR, CLEAR_ERROR, TErrorAlertActions } from "../actions";
import { TErrorAlertPayload } from "../../types/services";

interface IErrState {
  errors: TErrorAlertPayload[];
}

const initialErrState: IErrState = {
  errors: [],
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
