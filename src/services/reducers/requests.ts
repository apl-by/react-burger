import {
  START_REQUEST,
  END_REQUEST,
  TRequestActions,
} from "../actions";

interface IState {
  isRequest: boolean;
}

const initialState: IState = {
  isRequest: false,
};

export const requestReducer = (
  state = initialState,
  action: TRequestActions
): IState => {
  switch (action.type) {
    case START_REQUEST:
      return {
        isRequest: true,
      };
    case END_REQUEST:
      return {
        isRequest: false,
      };
    default:
      return state;
  }
};
