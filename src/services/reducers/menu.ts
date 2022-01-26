import {
  MENU_REQUEST,
  MENU_SUCCESS,
  MENU_ERROR,
  TMenuActions,
} from "../actions";
import { IMenuItem } from "../../types/common";

interface IMenu {
  menu: IMenuItem[];
  menuRequest: boolean;
  menuFailed: boolean;
}

const initialMenu: IMenu = {
  menu: [],
  menuRequest: false,
  menuFailed: false,
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
