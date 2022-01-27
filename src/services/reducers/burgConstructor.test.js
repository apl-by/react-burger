import { burgConstructorReducer } from "./burgConstructor";
import {
  ADD_BUN,
  REMOVE_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from "../actions";

const initialState = {
  ingredients: [],
  bun: null,
  empty: true,
  ingrCounter: {},
};

describe("burgConstructor reducer", () => {
  it("should return the initial state", () => {
    expect(burgConstructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_BUN", () => {
    const payloadOne = { _id: "1" };
    const payloadTwo = { _id: "2" };

    const actionOne = { type: ADD_BUN, payload: payloadOne };
    const actionTwo = { type: ADD_BUN, payload: payloadTwo };

    const state = initialState;
    const newStateOne = {
      ...state,
      bun: payloadOne,
      empty: false,
    };
    const newStateTwo = {
      ...newStateOne,
      bun: payloadTwo,
    };

    expect(burgConstructorReducer(state, actionOne)).toEqual(newStateOne);

    expect(burgConstructorReducer(newStateOne, actionTwo)).toEqual(newStateTwo);
  });

  it("should handle REMOVE_BUN", () => {
    const state = {
      ...initialState,
      bun: { _id: "1" },
      empty: false,
    };
    const newState = {
      ...state,
      bun: null,
      empty: state.ingredients.length === 0,
    };

    expect(
      burgConstructorReducer(state, {
        type: REMOVE_BUN,
      })
    ).toEqual(newState);
  });

  it("should handle ADD_INGREDIENT", () => {
    const payloadOne = { _id: "1" };
    const payloadTwo = { _id: "2" };

    const actionOne = { type: ADD_INGREDIENT, payload: payloadOne };
    const actionTwo = { type: ADD_INGREDIENT, payload: payloadTwo };

    const state = initialState;
    const newStateOne = {
      ...state,
      ingredients: [payloadOne],
      empty: false,
      ingrCounter: {
        [payloadOne._id]: 1,
      },
    };
    const newStateTwo = {
      ...newStateOne,
      ingredients: [payloadOne, payloadTwo],
      ingrCounter: {
        ...newStateOne.ingrCounter,
        [payloadTwo._id]: 1,
      },
    };
    const newStateThree = {
      ...newStateTwo,
      ingredients: [payloadOne, payloadTwo, payloadTwo],
      ingrCounter: {
        ...newStateTwo.ingrCounter,
        [payloadTwo._id]: 2,
      },
    };

    expect(burgConstructorReducer(state, actionOne)).toEqual(newStateOne);
    expect(burgConstructorReducer(newStateOne, actionTwo)).toEqual(newStateTwo);
    expect(burgConstructorReducer(newStateTwo, actionTwo)).toEqual(
      newStateThree
    );
  });

  it("should handle REMOVE_INGREDIENT", () => {
    const payloadOne = 2;
    const payloadTwo = 0;

    const actionOne = { type: REMOVE_INGREDIENT, payload: payloadOne };
    const actionTwo = { type: REMOVE_INGREDIENT, payload: payloadTwo };

    const state = {
      ...initialState,
      ingredients: [{ _id: "123" }, { _id: "321" }, { _id: "321" }],
      empty: false,
      ingrCounter: { 123: 1, 321: 2 },
    };
    const newStateOne = {
      ...state,
      ingredients: [{ _id: "123" }, { _id: "321" }],
      ingrCounter: { 123: 1, 321: 1 },
    };
    const newStateTwo = {
      ...newStateOne,
      ingredients: [{ _id: "321" }],
      ingrCounter: { 321: 1 },
    };
    const newStateThree = {
      ...newStateTwo,
      ingredients: [],
      empty: true,
      ingrCounter: {},
    };

    expect(burgConstructorReducer(state, actionOne)).toEqual(newStateOne);
    expect(burgConstructorReducer(newStateOne, actionTwo)).toEqual(newStateTwo);
    expect(burgConstructorReducer(newStateTwo, actionTwo)).toEqual(
      newStateThree
    );
  });

  it("should handle MOVE_INGREDIENT", () => {
    const payload = [{ _id: "321" }, { _id: "123" }, { _id: "321" }];
    const action = {
      type: MOVE_INGREDIENT,
      payload: payload,
    };

    const state = {
      ...initialState,
      ingredients: [{ _id: "123" }, { _id: "321" }, { _id: "321" }],
      empty: false,
      ingrCounter: { 123: 1, 321: 2 },
    };
    const newState = {
      ...state,
      ingredients: payload,
    };

    expect(burgConstructorReducer(state, action)).toEqual(newState);
  });

  it("should handle CLEAR_CONSTRUCTOR", () => {
    const action = { type: CLEAR_CONSTRUCTOR };

    const state = {
      ingredients: [{ _id: "123" }, { _id: "321" }, { _id: "321" }],
      bun: { _id: "1" },
      empty: false,
      ingrCounter: { 1: 1, 123: 1, 321: 2 },
    };

    expect(burgConstructorReducer(state, action)).toEqual(initialState);
  });
});
