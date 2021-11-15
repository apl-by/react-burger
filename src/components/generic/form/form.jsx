import styles from "./form.module.css";
import { Children } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Form = ({ children, onSubmit, title, btnName }) => {
  const childrenArr = Children.toArray(children);

  return (
    <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
      <h2 className={`${styles.form__title} text text_type_main-medium`}>
        {title}
      </h2>
      <ul className={`${styles.form__list} mt-6 mb-6`}>
        {childrenArr.map((child) => (
          <li className={`${styles.form__input} mb-6`} key={child.key}>
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

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
};
