import styles from "./confirm.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const Confirm = ({ text, btnTrue, btnFalse, onConfirm, onCancel }) => {
  return (
    <div className={styles.container}>
      <p className={`${styles.text} mb-15 text text_type_main-medium`}>
        {text}
      </p>
      <div className={styles.buttons}>
        <Button type="secondary" size="medium" onClick={onCancel}>
          {btnFalse}
        </Button>
        <Button type="primary" size="medium" onClick={onConfirm}>
          {btnTrue}
        </Button>
      </div>
    </div>
  );
};

export default Confirm;

Confirm.propTypes = {
  text: PropTypes.string.isRequired,
  btnTrue: PropTypes.string.isRequired,
  btnFalse: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
