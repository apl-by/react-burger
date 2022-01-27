import { confirmationReducer } from "./сonfirmation";
import { SHOW_CONFIRM, HIDE_CONFIRM } from "../actions";

const initialState = {
  show: false,
  text: "",
};

describe("confirmation reducer", () => {
  it("should return the initial state", () => {
    expect(confirmationReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SHOW_CONFIRM", () => {
    const action = { type: SHOW_CONFIRM, payload: "error" };
    const state = initialState;
    const newState = { show: true, text: "error" };
    expect(confirmationReducer(state, action)).toEqual(newState);
  });

  it("should handle HIDE_CONFIRM", () => {
    const action = { type: HIDE_CONFIRM };
    const state = { show: true, text: "error" };
    const newState = initialState;
    expect(confirmationReducer(state, action)).toEqual(newState);
  });
});
