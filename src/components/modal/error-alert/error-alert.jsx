import styles from "./error-alert.module.css";
import PropTypes from "prop-types";

const ErrorAlert = ({ error }) => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Ошибка {error.status ?? ""}
      </h1>
      <p className={`${styles.text} mt-20 mb-15 text text_type_main-large`}>
        {error.message}
      </p>
    </div>
  );
};

export default ErrorAlert;

ErrorAlert.propTypes = {
  error: PropTypes.object.isRequired,
};
