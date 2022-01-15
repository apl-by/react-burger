import {
  MENU_REQUEST,
  MENU_SUCCESS,
  MENU_ERROR,
  ADD_BUN,
  REMOVE_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLOSE_ORDER_DETAILS,
  TMenuActions,
  TBurgConstructorActions,
  TOrderDetailsActions,
} from "../actions";
import { IMenuItem } from "../../types/common";
import { TOrderSuccessPayload } from "../../types/services";

interface IMenu {
  menu: IMenuItem[];
  menuRequest: boolean;
  menuFailed: boolean;
}

interface IConstructor {
  ingredients: IMenuItem[];
  bun: IMenuItem | null;
  empty: boolean;
  ingrCounter: { [key: string]: number | undefined };
}

interface IOrderDetails {
  isModalOpen: boolean;
  orderList: IMenuItem[];
  orderRes: TOrderSuccessPayload | undefined;
  orderRequest: boolean;
  orderFailed: boolean;
  canSubmit: boolean;
}

const initialMenu: IMenu = {
  menu: [],
  menuRequest: false,
  menuFailed: false,
};

const initialConstructor: IConstructor = {
  ingredients: [],
  bun: null,
  empty: true,
  ingrCounter: {},
};

const initialOrderDetails: IOrderDetails = {
  isModalOpen: false,
  orderList: [],
  orderRes: undefined,
  orderRequest: false,
  orderFailed: false,
  canSubmit: true,
};

export const menuReducer = (
  state = initialMenu,
  action: TMenuActions
): IMenu => {
  switch (action.type) {
    case MENU_REQUEST:
      return {
        ...state,
        menuRequest: true,
        menuFailed: false,
      };
    case MENU_SUCCESS:
      return {
        ...state,
        menuRequest: false,
        menu: action.payload,
      };
    case MENU_ERROR:
      return {
        ...initialMenu,
        menuFailed: true,
      };
    default:
      return state;
  }
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
            ingrCounterValue as number > 1 && ingrCounterValue !== undefined
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

export const orderDetailsReducer = (
  state = initialOrderDetails,
  action: TOrderDetailsActions
): IOrderDetails => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...initialOrderDetails,
        orderList: action.payload,
        orderRequest: true,
        orderFailed: false,
        canSubmit: false,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        isModalOpen: true,
        orderRequest: false,
        orderRes: action.payload,
        canSubmit: true,
      };
    case ORDER_ERROR:
      return {
        ...initialOrderDetails,
        orderFailed: true,
      };
    case CLOSE_ORDER_DETAILS:
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return state;
  }
};
