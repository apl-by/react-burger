import { useLocation, Navigate, RouteProps } from "react-router";
import { useSelector, useDispatch } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions";
import { getCookie } from "../../utils/utils";

interface IProtectedRoute extends RouteProps {
  to: string;
}

const ProtectedRoute = ({ children, to }: IProtectedRoute) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.userData.isAuthorized);

  const isTrueWsPath = location.pathname.includes("/orders");

  useEffect(() => {
    if (!isAuthorized || !isTrueWsPath) return;
    dispatch({
      type: WS_CONNECTION_START,
      payload: `/orders?token=${getCookie("accessToken")}`,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [isAuthorized, isTrueWsPath, dispatch]);

  if (!isAuthorized) {
    return <Navigate to={to} state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
