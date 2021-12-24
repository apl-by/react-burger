import { TActionTemplate, TOrderSuccessPayload } from "../../types/services";
import { IMenuItem } from "../../types/common";

export const MENU_REQUEST = "MENU_REQUEST";
export const MENU_SUCCESS = "MENU_SUCCESS";
export const MENU_ERROR = "MENU_ERROR";

export const ADD_BUN = "ADD_BUN";
export const REMOVE_BUN = "REMOVE_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";
export const CLOSE_ORDER_DETAILS = "CLOSE_ORDER_DETAILS";

// типы экшенов:

// для menuReducer
type TMenuRequestAction = TActionTemplate<typeof MENU_REQUEST>;

type TMenuSuccessAction = Required<
  TActionTemplate<typeof MENU_SUCCESS, IMenuItem[]>
>;

type TMenuErrorAction = TActionTemplate<typeof MENU_ERROR>;

export type TMenuActions =
  | TMenuRequestAction
  | TMenuSuccessAction
  | TMenuErrorAction;

// для burgConstructorReducer
type TAddBunAction = Required<TActionTemplate<typeof ADD_BUN, IMenuItem>>;

type TRemoveBunAction = TActionTemplate<typeof REMOVE_BUN>;

type TAddIngredientAction = Required<
  TActionTemplate<typeof ADD_INGREDIENT, IMenuItem>
>;

type TRemoveIngredientAction = Required<
  TActionTemplate<typeof REMOVE_INGREDIENT, number>
>;

type TMoveIngredientAction = Required<
  TActionTemplate<typeof MOVE_INGREDIENT, IMenuItem[]>
>;

type TClearConstructorAction = TActionTemplate<typeof CLEAR_CONSTRUCTOR>;

export type TBurgConstructorActions =
  | TAddBunAction
  | TRemoveBunAction
  | TAddIngredientAction
  | TRemoveIngredientAction
  | TMoveIngredientAction
  | TClearConstructorAction;

// для orderDetailsReducer
type TOrderRequestAction = Required<
  TActionTemplate<typeof ORDER_REQUEST, IMenuItem[]>
>;

type TOrderSuccessAction = Required<
  TActionTemplate<typeof ORDER_SUCCESS, TOrderSuccessPayload>
>;

type TOrderErrorAction = TActionTemplate<typeof ORDER_ERROR>;

type TCloseOrderDetailsAction = TActionTemplate<typeof CLOSE_ORDER_DETAILS>;

export type TOrderDetailsActions =
  | TOrderRequestAction
  | TOrderSuccessAction
  | TOrderErrorAction
  | TCloseOrderDetailsAction;
