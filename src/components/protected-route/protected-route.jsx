import { useLocation, Navigate } from "react-router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, to }) => {
  let location = useLocation();
  const isAuthorized = useSelector(state => state.userData.isAuthorized);

  if (!isAuthorized) {
    return <Navigate to={to} state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  // children: PropTypes.element.isRequired,
  // PropTypes.node - временно, пока не существует всех страниц-компонентов
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
};