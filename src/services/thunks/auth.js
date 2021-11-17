import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from "../actions/auth";
import { apiRequests } from "../../utils/api-requests";
import { getCookie, setCookie } from "../../utils/utils";

export const getUser = () => (dispatch) => {
  console.log(2);
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  dispatch({ type: USER_REQUEST });
  return apiRequests
    .getUser(getCookie("accessToken"))
    .then((res) => {
      console.log(3, res);

      if (res.success) {
        dispatch({ type: USER_SUCCESS, payload: res.user });
      } else {
        dispatch({ type: USER_ERROR });
      }
    })
    .catch((err) => {
      console.log("4-err", err);
      console.log(refreshToken);

      if (err.message === "jwt expired") {
        return apiRequests
          .refreshToken(refreshToken)
          .then((res) => {
            console.log(res, refreshToken);
            setCookie("accessToken", res.accessToken.replace("Bearer ", ""));
            setCookie("refreshToken", res.refreshToken);
          })
          .catch(() => dispatch({ type: USER_ERROR }));
        
      }
      dispatch({ type: USER_ERROR });
    });
};
 