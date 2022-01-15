import styles from "./app-header.module.css";
import { memo, FC } from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Link } from "react-router-dom";

const setClassName = ({ isActive }: { isActive: boolean }): string =>
  `${styles.nav__link} ${
    isActive ? styles.nav__link_active : "text_color_inactive"
  }`;

const AppHeader: FC = memo(() => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.header__logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={`${styles.nav__item} mr-2 pt-4 pb-4 pr-5 pl-5`}>
            <NavLink to="/" className={setClassName}>
              <BurgerIcon type="primary" />
              <span
                className={`${styles.nav__text} ml-2 text text_type_main-default`}
              >
                Конструктор
              </span>
            </NavLink>
          </li>
          <li className={`${styles.nav__item} mr-2 pt-4 pb-4 pr-5 pl-5`}>
            <NavLink to="/feed" className={setClassName}>
              <ListIcon type="primary" />
              <span
                className={`${styles.nav__text} ml-2 text text_type_main-default`}
              >
                Лента заказов
              </span>
            </NavLink>
          </li>
          <li className={`${styles.nav__item} mr-2 pt-4 pb-4 pr-5 pl-5`}>
            <NavLink to="/profile" className={setClassName}>
              <ProfileIcon type="primary" />
              <span
                className={`${styles.nav__text} ml-2 text text_type_main-default`}
              >
                Личный кабинет
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default AppHeader;
