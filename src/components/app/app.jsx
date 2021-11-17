import { useEffect, useRef } from "react";
import LayoutWithHeader from "../layout-with-header/layout-with-header";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import Page404 from "../../pages/page-404/page-404";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../services/thunks/main";
import { getUser } from "../../services/thunks/auth";
import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  // const ref = useRef();
  const dispatch = useDispatch();
  // const { isAuthorized, wasLogout } = useSelector((state) => state.user);
  // const navigate = useNavigate()

  // useEffect(() => ref.current = navigate, [])
  // console.log(123,navigate === ref.current)

  useEffect(() => {
    dispatch(getUser());
    dispatch(getMenu());
  }, [dispatch]);

  // useEffect(() => {
  //   if (isAuthorized) {
  //     navigate("/", {replace: true});
  //   }
  // }, [isAuthorized, wasLogout]);

  return (
    <Routes>
      <Route path="/" element={<LayoutWithHeader />}>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/orders" element={null} />
        <Route path="profile/orders/:id" element={null} />
        <Route path="ingredients/:id" element={null} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
