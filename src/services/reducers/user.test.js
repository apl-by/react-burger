import { userDataReducer } from "./user";
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_REQUEST,
  LOGOUT,
} from "../actions";

const initialState = {
  user: { name: "", email: "" },
  isAuthorized: false,
  userRequest: false,
  userFailed: false,
  wasInitialAuth: false,
};

describe("userData reducer", () => {
  it("should return the initial state", () => {
    expect(userDataReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle USER_REQUEST", () => {
    const action = { type: USER_REQUEST };
    const state = initialState;
    const newState = {
      ...state,
      userRequest: true,
      userFailed: false,
    };

    expect(userDataReducer(state, action)).toEqual(newState);
  });

  it("should handle USER_SUCCESS", () => {
    const action = {
      type: USER_SUCCESS,
      payload: { name: "Test", email: "a@a.com" },
    };
    const state = { ...initialState, userRequest: true };
    const newState = {
      ...state,
      isAuthorized: true,
      userRequest: false,
      user: action.payload,
      wasInitialAuth: true,
    };

    expect(userDataReducer(state, action)).toEqual(newState);
  });

  it("should handle USER_ERROR", () => {
    const action = { type: USER_ERROR };
    const state = { ...initialState, userRequest: true };
    const newState = {
      ...state,
      isAuthorized: false,
      userFailed: true,
      wasInitialAuth: true,
      userRequest: false,
    };

    expect(userDataReducer(state, action)).toEqual(newState);
  });

  it("should handle UPDATE_USER_REQUEST", () => {
    const action = { type: UPDATE_USER_REQUEST };
    const state = {
      user: { name: "Test", email: "a@a.com" },
      isAuthorized: true,
      userRequest: false,
      userFailed: false,
      wasInitialAuth: true,
    };
    const newState = {
      ...state,
      userRequest: true,
      userFailed: false,
    };

    expect(userDataReducer(state, action)).toEqual(newState);
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    const action = {
      type: UPDATE_USER_SUCCESS,
      payload: { name: "Test_Upd", email: "b@b.com" },
    };
    const state = {
      user: { name: "Test", email: "a@a.com" },
      isAuthorized: true,
      userRequest: true,
      userFailed: false,
      wasInitialAuth: true,
    };
    const newState = {
      ...state,
      userRequest: false,
      user: { ...state.user, ...action.payload },
    };

    expect(userDataReducer(state, action)).toEqual(newState);
  });

  it("should handle UPDATE_USER_ERROR", () => {
    const action = { type: UPDATE_USER_ERROR };
    const state = {
      user: { name: "Test", email: "a@a.com" },
      isAuthorized: true,
      userRequest: true,
      userFailed: false,
      wasInitialAuth: true,
    };
    const newState = {
      ...state,
      userFailed: true,
      userRequest: false,
    };

    expect(userDataReducer(state, action)).toEqual(newState);
  });

  it("should handle LOGOUT_REQUEST", () => {
    const action = { type: LOGOUT_REQUEST };
    const state = {
      user: { name: "Test", email: "a@a.com" },
      isAuthorized: true,
      userRequest: false,
      userFailed: false,
      wasInitialAuth: true,
    };
    const newState = {
      ...state,
      userRequest: true,
      userFailed: false,
    };

    expect(userDataReducer(state, action)).toEqual(newState);
  });

  it("should handle LOGOUT", () => {
    const action = { type: LOGOUT };
    const state = {
      user: { name: "Test", email: "a@a.com" },
      isAuthorized: true,
      userRequest: true,
      userFailed: false,
      wasInitialAuth: true,
    };
    const newState = {
      ...initialState,
      wasInitialAuth: true,
    };

    expect(userDataReducer(state, action)).toEqual(newState);
  });
});
