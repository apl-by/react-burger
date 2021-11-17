import styles from "./profile-page.module.css";
import { useState } from "react";
import ProfileNav from "../../components/generic/profile-nav/profile-nav";
import TextInput from "../../components/generic/text-input/text-input";
import EmailInput from "../../components/generic/email-input/email-input";
import PasswordInput from "../../components/generic/password-input/password-input";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  hasEmptyInput,
  hasErrorInput,
  setErrInEmptyInput,
} from "../../utils/utils";

const ProfilePage = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setWasSubmit(true);
    if (hasEmptyInput(inputValue)) {
      // setWasSubmit(false);
      setError((prev) => ({
        ...prev,
        ...setErrInEmptyInput(inputValue),
      }));
      return;
    }
    if (/*wasSubmit || */ hasErrorInput(error)) {
      // return setWasSubmit(false);
    }

    console.log(777);
  };

  return (
    <div className={styles.container}>
      <ProfileNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <ul className={`${styles.form__list}`}>
          <li className={`${styles.form__input} mb-6`}>
            <TextInput
              onChange={onChange}
              value={inputValue.name}
              name={"name"}
              icon={"EditIcon"}
              disabled={true}
              error={error.name}
              setError={setError}
            />
          </li>
          <li className={`${styles.form__input} mb-6`}>
            <EmailInput
              onChange={onChange}
              value={inputValue.email}
              name={"email"}
              placeholder={"Логин"}
              icon={"EditIcon"}
              disabled={true}
              error={error.email}
              setError={setError}
            />
          </li>
          <li className={`${styles.form__input} mb-6`}>
            <PasswordInput
              onChange={onChange}
              value={inputValue.password}
              name={"password"}
              icon={"EditIcon"}
              disabled={true}
              error={error.password}
              setError={setError}
            />
          </li>
        </ul>
        <div className={styles.form__buttons}>
          <Button type="secondary" size="medium">
            "Отмена"
          </Button>
          <Button type="primary" size="medium">
            "Сохранить"
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
