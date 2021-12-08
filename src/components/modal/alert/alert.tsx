import { FC } from "react";
import styles from "./alert.module.css";

interface IAlert {
  title?: string;
  message: string;
}

const Alert: FC<IAlert> = ({ title, message }) => {
  return (
    <div className={styles.container}>
      {title && (
        <h2 className={`${styles.title} text text_type_main-large mb-15`}>
          {title}
        </h2>
      )}
      <p className={`${styles.text}  mb-15 text text_type_main-large`}>
        {message}
      </p>
    </div>
  );
};

export default Alert;
