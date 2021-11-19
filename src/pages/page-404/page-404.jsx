import styles from "./page-404.module.css";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className={styles.container}>
      <h1
        className={`${styles.title} text text_type_main-large text_color_inactive`}
      >
        Страница не найдена
      </h1>
      <p className={`${styles.text} text text_type_digits-large`}>404</p>
      <Link to="/" className={`${styles.link} text text_type_main-default`}>
        На главную &#10132;
      </Link>
    </div>
  );
};

export default Page404;
