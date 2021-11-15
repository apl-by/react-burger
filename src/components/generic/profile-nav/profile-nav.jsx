import styles from "./profile-nav.module.css";
import { NavLink } from "react-router-dom";
import { profileNavLinks } from "../../../utils/data";

const ProfileNav = () => {
  return (
    <nav className={styles[`profile-nav`]}>
      <ul className={styles.nav__list}>
        {profileNavLinks.map((i) => (
          <li className={styles.nav__item} key={i.id}>
            <NavLink
              to={i.to}
              className={({ isActive }) =>
                `${styles.nav__link} ${
                  isActive ? styles.nav__link_active : "text_color_inactive"
                } text text_type_main-medium`
              }
            >
              {i.link}
            </NavLink>
          </li>
        ))}
      </ul>
      <p
        className={`${styles.description} text_color_inactive text text_type_main-small mt-20`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};

export default ProfileNav;
