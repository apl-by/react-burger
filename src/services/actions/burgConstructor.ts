import { TActionTemplate } from "../../types/services";
import { IMenuItem } from "../../types/common";

export const ADD_BUN = "ADD_BUN";
export const REMOVE_BUN = "REMOVE_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

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