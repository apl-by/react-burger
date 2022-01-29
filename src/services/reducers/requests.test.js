import { requestReducer } from "./requests";
import { START_REQUEST, END_REQUEST } from "../actions";

const initialState = {
  isRequest: false,
};

const newState = {
  isRequest: true,
};

describe("request reducer", () => {
  it("should return the initial state", () => {
    expect(requestReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle START_REQUEST", () => {
    const action = { type: START_REQUEST };
    expect(requestReducer(initialState, action)).toEqual(newState);
  });

  it("should handle END_REQUEST", () => {
    const action = { type: END_REQUEST };

    expect(requestReducer(newState, action)).toEqual(initialState);
  });
});
