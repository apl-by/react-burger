import { SHOW_CONFIRM, HIDE_CONFIRM, TConfirmationActions } from "../actions";

interface IConfirmState {
  show: boolean;
  text: string;
}

const initialConfirmState: IConfirmState = {
  show: false,
  text: "",
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
