import { menuReducer } from "./menu";
import { MENU_REQUEST, MENU_SUCCESS, MENU_ERROR } from "../actions";

const initialState = {
  menu: [],
  menuRequest: false,
  menuFailed: false,
};

describe("menu reducer", () => {
  it("should return the initial state", () => {
    expect(menuReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle MENU_REQUEST", () => {
    const action = { type: MENU_REQUEST };

    const state = initialState;
    const newState = {
      ...state,
      menuRequest: true,
      menuFailed: false,
    };

    expect(menuReducer(state, action)).toEqual(newState);
  });

  it("should handle MENU_SUCCESS", () => {
    const payload = [{ _id: "1" }, { _id: "2" }];
    const action = { type: MENU_SUCCESS, payload };
    const state = initialState;
    const newState = { ...state, menuRequest: false, menu: action.payload };

    expect(menuReducer(state, action)).toEqual(newState);
  });

  it("should handle MENU_ERROR", () => {
    const action = { type: MENU_ERROR };

    const state = initialState;
    const newState = {
      ...state,
      menuFailed: true,
    };

    expect(menuReducer(state, action)).toEqual(newState);
  });
});
