import { errorAlertReducer } from "./errorAlert";
import { ALERT_ERROR, CLEAR_ERROR } from "../actions";

const initialState = {
  errors: [],
};

describe("errorAlert reducer", () => {
  const payloadOne = { message: "ErrorOne" };
  const payloadTwo = { message: "ErrorTwo" };

  it("should return the initial state", () => {
    expect(errorAlertReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ALERT_ERROR", () => {
    const actionOne = { type: ALERT_ERROR, payload: payloadOne };
    const actionTwo = { type: ALERT_ERROR, payload: payloadTwo };

    const state = initialState;
    const newStateOne = { errors: [payloadOne] };
    const newStateTwo = { errors: [...newStateOne.errors, payloadTwo] };

    expect(errorAlertReducer(state, actionOne)).toEqual(newStateOne);
    expect(errorAlertReducer(newStateOne, actionTwo)).toEqual(newStateTwo);
  });

  it("should handle CLEAR_ERROR", () => {
    const action = { type: CLEAR_ERROR };
    const state = { errors: [payloadOne, payloadTwo] };
    const newStateOne = { errors: [...state.errors.slice(1)] };
    const newStateTwo = initialState;

    expect(errorAlertReducer(state, action)).toEqual(newStateOne);
    expect(errorAlertReducer(newStateOne, action)).toEqual(newStateTwo);
  });
});
