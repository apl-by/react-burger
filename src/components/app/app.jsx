import { useEffect } from "react";
import LayoutWithHeader from "../layout-with-header/layout-with-header";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import Page404 from "../../pages/page-404/page-404";
import ProtectedRoute from "../protected-route/protected-route";
import { useDispatch } from "react-redux";
import { getMenu } from "../../services/thunks/main";
import { getUser } from "../../services/thunks/auth";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LayoutWithHeader />}>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute to="/login">
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/orders"
          element={<ProtectedRoute to="/login">{null}</ProtectedRoute>}
        />
        <Route
          path="profile/orders/:id"
          element={<ProtectedRoute to="/login">{null}</ProtectedRoute>}
        />
        <Route path="ingredients/:id" element={null} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
