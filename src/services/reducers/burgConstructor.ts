import {
  ADD_BUN,
  REMOVE_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  TBurgConstructorActions,
} from "../actions";
import { IMenuItem } from "../../types/common";

interface IConstructor {
  ingredients: IMenuItem[];
  bun: IMenuItem | null;
  empty: boolean;
  ingrCounter: { [key: string]: number | undefined };
}

const initialConstructor: IConstructor = {
  ingredients: [],
  bun: null,
  empty: true,
  ingrCounter: {},
};

export const burgConstructorReducer = (
  state = initialConstructor,
  action: TBurgConstructorActions
): IConstructor => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.payload,
        empty: false,
      };
    case REMOVE_BUN:
      return {
        ...state,
        bun: null,
        empty: state.ingredients.length === 0,
      };
    case ADD_INGREDIENT: {
      const ingrCounterKey = action.payload._id;
      const ingrCounterValue = state.ingrCounter[ingrCounterKey];
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        empty: false,
        ingrCounter: {
          ...state.ingrCounter,
          [ingrCounterKey]: ingrCounterValue ? ingrCounterValue + 1 : 1,
        },
      };
    }
    case REMOVE_INGREDIENT: {
      const newList = [...state.ingredients];
      const removedIngr = newList.splice(action.payload, 1);
      const ingrCounterKey = removedIngr[0]._id;
      const ingrCounterValue = state.ingrCounter[ingrCounterKey];
      return {
        ...state,
        ingredients: [...newList],
        empty: newList.length === 0 && !state.bun,
        ingrCounter: {
          ...state.ingrCounter,
          [ingrCounterKey]:
            (ingrCounterValue as number) > 1 && ingrCounterValue !== undefined
              ? ingrCounterValue - 1
              : undefined,
        },
      };
    }
    case MOVE_INGREDIENT:
      return {
        ...state,
        ingredients: action.payload,
      };
    case CLEAR_CONSTRUCTOR:
      return initialConstructor;
    default:
      return state;
  }
};
