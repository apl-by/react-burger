import { ALERT_ERROR, CLEAR_ERROR } from "../actions/interaction";

const initialState = {
  errors: [],
};

export const errorAlert = (state = initialState, action) => {
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
