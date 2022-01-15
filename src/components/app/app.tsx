import { useEffect, FC } from "react";
import LayoutWithHeader from "../layout-with-header/layout-with-header";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import Page404 from "../../pages/page-404/page-404";
import ProtectedRoute from "../protected-route/protected-route";
import IngrDetailPage from "../../pages/ingr-detail-page/ingr-detail-page";
import ModalIngrDetailPage from "../../pages/modal-ingr-detail-page/modal-ingr-detail-page";
import ModalOrderInfoPage from "../../pages/modal-order-info-page/modal-order-info-page";
import LayoutFeed from "../layout-feed/layout-feed";
import FeedPage from "../../pages/feed-page/feed-page";
import ProfileOrdersPage from "../../pages/profile-orders-page/profile-orders-page";
import OrderInfoPage from "../../pages/order-info-page/order-info-page";
import { useDispatch } from "../../hooks/reduxHooks";
import { getMenu } from "../../services/thunks/main";
import { getUser } from "../../services/thunks/user";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  useNavigationType,
} from "react-router-dom";

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigationType = useNavigationType();
  const background = location.state?.background;
  const condition =
    (Boolean(background) && location.pathname.startsWith("/ingredients")) ||
    (Boolean(background) &&
      !location.pathname.startsWith("/ingredients") &&
      navigationType !== "POP");

  useEffect(() => {
    dispatch(getUser());
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <>
      <Routes location={condition ? background : location}>
        <Route path="/" element={<LayoutWithHeader />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="ingredients/:id" element={<IngrDetailPage />} />
          <Route path="feed" element={<LayoutFeed />}>
            <Route index element={<FeedPage />} />
            <Route path=":id" element={<OrderInfoPage />} />
          </Route>
          <Route
            path="profile"
            element={
              <ProtectedRoute to="/login">
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="orders" element={<ProfileOrdersPage />} />
            <Route path="orders/:id" element={<OrderInfoPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Routes location={condition ? location : "/"}>
        <Route path="ingredients/:id" element={<ModalIngrDetailPage />} />
        <Route path="profile/orders/:id" element={<ModalOrderInfoPage />} />
        <Route path="feed/:id" element={<ModalOrderInfoPage />} />
        <Route path="*" element={null} />
      </Routes>
    </>
  );
};

export default App;
