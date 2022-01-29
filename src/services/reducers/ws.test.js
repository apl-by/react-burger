import { ordersReducer } from "./ws";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions";

const initialState = {
  wsConnected: false,
  resAll: undefined,
  resOwner: undefined,
};

describe("orders reducer(ws)", () => {
  it("should return the initial state", () => {
    expect(ordersReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    const action = { type: WS_CONNECTION_SUCCESS };
    const state = initialState;
    const newState = {
      ...state,
      wsConnected: true,
    };
    expect(ordersReducer(state, action)).toEqual(newState);
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    const payload = { message: "Error" };
    const action = { type: WS_CONNECTION_ERROR, payload };
    const state = initialState;
    const newState = { ...state, error: action.payload, wsConnected: false };

    expect(ordersReducer(state, action)).toEqual(newState);
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    const action = { type: WS_CONNECTION_CLOSED };
    const state = { ...initialState, wsConnected: true };
    const newState = { ...state, error: undefined, wsConnected: false };

    expect(ordersReducer(state, action)).toEqual(newState);
  });

  it("should handle WS_GET_MESSAGE", () => {
    const payloadOne = {
      resApi: { orders: [{ number: 1 }, { number: 2 }, { number: 3 }] },
      url: "wss://norma.nomoreparties.space/orders?token=",
    };
    const payloadTwo = {
      resApi: { orders: [{ number: 3 }, { number: 2 }, { number: 1 }] },
      url: "wss://norma.nomoreparties.space/orders/all",
    };
    const actionOne = { type: WS_GET_MESSAGE, payload: payloadOne };
    const actionTwo = { type: WS_GET_MESSAGE, payload: payloadTwo };

    const state = { ...initialState, wsConnected: true };
    const newStateOne = {
      ...state,
      resOwner: {
        orders: [{ number: 3 }, { number: 2 }, { number: 1 }],
      },
      error: undefined,
    };
    const newStateTwo = {
      ...state,
      resAll: actionTwo.payload.resApi,
      error: undefined,
    };

    expect(ordersReducer(state, actionOne)).toEqual(newStateOne);
    expect(ordersReducer(state, actionTwo)).toEqual(newStateTwo);
  });
});
