import styles from "./profile-nav.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiRequests } from "../../../utils/api-requests";
import { getCookie, deleteCookie } from "../../../utils/utils";
import { LOGOUT } from "../../../services/actions/auth";

const setClassName = ({ isActive }) =>
  `${styles.nav__link} ${
    isActive ? styles.nav__link_active : "text_color_inactive"
  } text text_type_main-medium`;

const ProfileNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    apiRequests
      .logout(getCookie("refreshToken"))
      .then((res) => {
        if (res.success) {
          console.log("Выход из аккаунта успешный");
        } else {
          throw new Error("Произошла ошибка");
        }
      })
      .catch((err) => {
        console.log(`Error ${err.status ?? ""}: ${err.message}`);
      })
      .finally(() => {
        deleteCookie("refreshToken", "accessToken");
        dispatch({ type: LOGOUT });
        navigate("/login", { replace: true });
      });
  };

  return (
    <nav className={styles[`profile-nav`]}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <NavLink to={"/profile"} className={setClassName}>
            Профиль
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink to={"/profile/orders"} className={setClassName}>
            История заказов
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to={"/login"}
            onClick={handleLogout}
            className={setClassName}
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <p
        className={`${styles.description} text_color_inactive text text_type_main-default mt-20`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};

export default ProfileNav;
