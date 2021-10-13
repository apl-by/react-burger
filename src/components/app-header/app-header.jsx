import { Component } from "react";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

class AppHeader extends Component {
 
  render() {
    const cnHeader = cn(styles.header, "pt-4", "pb-4");
    const cnNavItem = cn(
      styles.nav__item,
      "mr-2",
      "pt-4",
      "pb-4",
      "pr-5",
      "pl-5"
    );
    const cnNavText = cn(
      styles.nav__text,
      "ml-2",
      "text",
      "text_type_main-default",
      { "text_color_inactive": true }
    );
    return (
      <header className={cnHeader}>
        <div className={styles.header__logo}>
          <Logo />
        </div>
        {/* TODO: выделить в компонент Nav с рендером через map */}
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={cnNavItem}>
              <a
                href="#top"
                className={styles.nav__link}
                target="_blank"
                rel="noreferrer"
              >
                <BurgerIcon type="primary" />
                <span className={cnNavText}>Конструктор</span>
              </a>
            </li>
            <li className={cnNavItem}>
              <a
                href="#top"
                className={styles.nav__link}
                target="_blank"
                rel="noreferrer"
              >
                <ListIcon type="primary" />
                <span className={cnNavText}>Лента заказа</span>
              </a>
            </li>
            <li className={cnNavItem}>
              <a
                href="#top"
                className={styles.nav__link}
                target="_blank"
                rel="noreferrer"
              >
                <ProfileIcon type="primary" />
                <span className={cnNavText}>Личный кабинет</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
