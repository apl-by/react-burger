import styles from "./profile-nav.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "../../../hooks/reduxHooks";
import { logout } from "../../../services/thunks/user";
import { FC, SyntheticEvent } from "react";

const setClassName = ({ isActive }: { isActive: boolean }): string =>
  `${styles.nav__link} ${
    isActive ? styles.nav__link_active : "text_color_inactive"
  } text text_type_main-medium`;

const ProfileNav: FC = () => {
  const dispatch = useDispatch();

  const handleLogout = (e: SyntheticEvent): void => {
    e.preventDefault();
    dispatch(logout());
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
