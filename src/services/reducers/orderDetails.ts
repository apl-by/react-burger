import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLOSE_ORDER_DETAILS,
  TOrderDetailsActions,
} from "../actions";
import { IMenuItem } from "../../types/common";
import { TOrderSuccessPayload } from "../../types/services";

interface IOrderDetails {
  isModalOpen: boolean;
  orderList: IMenuItem[];
  orderRes: TOrderSuccessPayload | undefined;
  orderRequest: boolean;
  orderFailed: boolean;
  canSubmit: boolean;
}

const initialOrderDetails: IOrderDetails = {
  isModalOpen: false,
  orderList: [],
  orderRes: undefined,
  orderRequest: false,
  orderFailed: false,
  canSubmit: true,
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
