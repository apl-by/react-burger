import { MENU_REQUEST, MENU_SUCCESS, MENU_ERROR } from "../actions";
import { apiRequests } from "../../utils/api-requests";
import { TAppThunk, TAppDispatch } from "../../types/services";
import { TErrorAlertPayload } from "../../types/services";

export const getMenu: TAppThunk = () => (dispatch: TAppDispatch) => {
  dispatch({ type: MENU_REQUEST });
  return apiRequests
    .getMenu()
    .then((res) => {
      if (res.success) {
        dispatch({ type: MENU_SUCCESS, payload: res.data });
      } else {
        throw new Error("Произошла ошибка");
      }
    })
    .catch((err: TErrorAlertPayload) => {
      dispatch({ type: MENU_ERROR });
      console.log(`Error ${err.status ?? ""}: ${err.message}`);
    });
};
