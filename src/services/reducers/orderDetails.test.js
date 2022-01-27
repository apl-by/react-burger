import { orderDetailsReducer } from "./orderDetails";
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLOSE_ORDER_DETAILS,
} from "../actions";

const initialState = {
  isModalOpen: false,
  orderList: [],
  orderRes: undefined,
  orderRequest: false,
  orderFailed: false,
  canSubmit: true,
};

describe("orderDetails reducer", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ORDER_REQUEST", () => {
    const payload = [{ _id: "1" }, { _id: "2" }];
    const action = { type: ORDER_REQUEST, payload };

    const state = initialState;
    const newState = {
      ...state,
      orderList: action.payload,
      orderRequest: true,
      orderFailed: false,
      canSubmit: false,
    };

    expect(orderDetailsReducer(state, action)).toEqual(newState);
  });

  it("should handle ORDER_SUCCESS", () => {
    const payload = {
      name: "Name",
      order: { number: 777 },
      success: true,
    };
    const action = { type: ORDER_SUCCESS, payload };
    const state = {
      ...initialState,
      orderRequest: true,
      orderFailed: false,
      canSubmit: false,
    };
    const newState = {
      ...state,
      isModalOpen: true,
      orderRequest: false,
      orderRes: action.payload,
      canSubmit: true,
    };

    expect(orderDetailsReducer(state, action)).toEqual(newState);
  });

  it("should handle ORDER_ERROR", () => {
    const action = { type: ORDER_ERROR };

    const state = {
      ...initialState,
      orderRequest: true,
      orderFailed: false,
      canSubmit: false,
    };
    const newState = {
      ...initialState,
      orderFailed: true,
    };

    expect(orderDetailsReducer(state, action)).toEqual(newState);
  });

  it("should handle CLOSE_ORDER_DETAILS", () => {
    const action = { type: CLOSE_ORDER_DETAILS };

    const state = {
      ...initialState,
      isModalOpen: true,
    };
    const newState = {
      ...state,
      isModalOpen: false,
    };

    expect(orderDetailsReducer(state, action)).toEqual(newState);
  });
});
