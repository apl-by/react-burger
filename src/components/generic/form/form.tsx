import styles from "./form.module.css";
import { Children, FC, SyntheticEvent } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

interface IForm {
  onSubmit: (e: SyntheticEvent) => void;
  title: string;
  btnName?: string;
}

const Form: FC<IForm> = ({ children, onSubmit, title, btnName }) => {
  const childrenArr = Children.toArray(children) as React.ReactElement[];

  return (
    <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
      <h2 className={`${styles.form__title} text text_type_main-medium`}>
        {title}
      </h2>
      <ul className={`${styles.form__list} mt-6 mb-6`}>
        {childrenArr.map((child) => (
          <li
            className={`${styles.form__input} mb-6`}
            key={child.key}
          >
            {child}
          </li>
        ))}
      </ul>
      <Button type="primary" size="medium">
        {btnName}
      </Button>
    </form>
  );
};

export default Form;
