import { useLocation, Navigate, RouteProps } from "react-router";
import { useSelector } from "../../hooks/reduxHooks";

interface IProtectedRoute extends RouteProps {
  to: string;
}

const ProtectedRoute = ({ children, to }: IProtectedRoute) => {
  let location = useLocation();

  const isAuthorized = useSelector((state) => state.userData.isAuthorized);

  if (!isAuthorized) {
    return <Navigate to={to} state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
