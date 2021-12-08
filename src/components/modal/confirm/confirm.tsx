import styles from "./confirm.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

interface IConfirm {
  text: string;
  btnTrue: string;
  btnFalse: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm: FC<IConfirm> = ({
  text,
  btnTrue,
  btnFalse,
  onConfirm,
  onCancel,
}) => {
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
