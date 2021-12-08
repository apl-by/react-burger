import { useLocation, Navigate, RouteProps } from "react-router";
import { useSelector } from "react-redux";

interface IProtectedRoute extends RouteProps {
  to: string;
}

const ProtectedRoute = ({ children, to }: IProtectedRoute) => {
  let location = useLocation();

  // используется any (до типизации useSelector)
  const isAuthorized = useSelector((state: any) => state.userData.isAuthorized);

  if (!isAuthorized) {
    return <Navigate to={to} state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
