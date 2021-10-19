import styles from "./app-header.module.css";
import { memo } from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = memo(() => {

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.header__logo}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={`${styles.nav__item} mr-2 pt-4 pb-4 pr-5 pl-5`}>
            <a
              href="#top"
              className={styles.nav__link}
              target="_blank"
              rel="noreferrer"
            >
              <BurgerIcon type="primary" />
              <span
                className={`${styles.nav__text} ml-2 text text_type_main-default`}
              >
                Конструктор
              </span>
            </a>
          </li>
          <li className={`${styles.nav__item} mr-2 pt-4 pb-4 pr-5 pl-5`}>
            <a
              href="#top"
              className={styles.nav__link}
              target="_blank"
              rel="noreferrer"
            >
              <ListIcon type="primary" />
              <span
                className={`${styles.nav__text} ml-2 text text_type_main-default text_color_inactive`}
              >
                Лента заказа
              </span>
            </a>
          </li>
          <li className={`${styles.nav__item} mr-2 pt-4 pb-4 pr-5 pl-5`}>
            <a
              href="#top"
              className={styles.nav__link}
              target="_blank"
              rel="noreferrer"
            >
              <ProfileIcon type="primary" />
              <span
                className={`${styles.nav__text} ml-2 text text_type_main-default text_color_inactive`}
              >
                Личный кабинет
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default  AppHeader;
