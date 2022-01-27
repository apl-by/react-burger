import { alertReducer } from "./alert";
import { SHOW_ALERT, HIDE_ALERT } from "../actions";

const initialState = {
  message: "",
};

describe("alert reducer", () => {
  it("should return the initial state", () => {
    expect(alertReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SHOW_ALERT", () => {
    const action = { type: SHOW_ALERT, payload: "alert message" };
    const state = initialState;
    const newState = {
      message: "alert message",
    };
    expect(alertReducer(state, action)).toEqual(newState);
  });

  it("should handle HIDE_ALERT", () => {
    const action = { type: HIDE_ALERT };
    const state = {
      message: "alert message",
    };
    const newState = initialState;

    expect(alertReducer(state, action)).toEqual(newState);
  });
});
