import {
  START_REQUEST,
  END_REQUEST,
} from "../actions/requests";

const initialState = {
  isRequest: false,
};

export const request = (state = initialState, action) => {
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