import styles from "./profile-page.module.css";
import { useState, useEffect, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { patchUser } from "../../services/thunks/user";
import isEqual from "lodash/isEqual";

const ProfilePage = () => {
  const refState = useRef(null);
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.userData.user);
  const userRequest = useSelector((state) => state.userData.userRequest);

  const [inputValue, setInputValue] = useState({
    name,
    email,
    password: "123456",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [wasEdition, setWasEdition] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setInputValue({ ...inputValue, name, email }), [name, email]);

  useEffect(() => {
    let ref = refState.current;
    if (ref === null || name !== ref.name || email !== ref.email) {
      refState.current = inputValue;
    }
    setWasEdition(!isEqual(refState.current, inputValue));
  }, [inputValue, name, email]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const cancelInput = (e) => {
    e.preventDefault();
    setInputValue(refState.current);
    setError({
      name: false,
      email: false,
      password: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userRequest || hasErrorInput(error)) return;
    if (hasEmptyInput(inputValue)) {
      setError((prev) => ({
        ...prev,
        ...setErrInEmptyInput(inputValue),
      }));
      return;
    }
    dispatch(patchUser(inputValue));
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
        {wasEdition && (
          <div className={styles.form__buttons}>
            <Button type="secondary" size="medium" onClick={cancelInput}>
              "Отмена"
            </Button>
            <Button type="primary" size="medium">
              "Сохранить"
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
