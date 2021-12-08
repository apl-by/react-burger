import styles from "./profile-page.module.css";
import { useState, useEffect, useRef, FC } from "react";
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
import { ErrorSetter } from "../../types/common";

type TInputValue<T> = {
  name: T;
  email: T;
  password: T;
};

const ProfilePage: FC = () => {
  const refState = useRef<TInputValue<string> | null>(null);
  const dispatch = useDispatch();
  // используется any (до типизации useSelector)
  const { name, email } = useSelector((state: any) => state.userData.user);
  // используется any (до типизации useSelector)
  const userRequest = useSelector((state: any) => state.userData.userRequest);

  const [inputValue, setInputValue] = useState<TInputValue<string>>({
    name,
    email,
    password: "123456",
  });
  const [error, setError] = useState<TInputValue<boolean>>({
    name: false,
    email: false,
    password: false,
  });
  const setErr = setError as ErrorSetter;
  const [wasEdition, setWasEdition] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setInputValue({ ...inputValue, name, email }), [name, email]);

  useEffect(() => {
    let ref = refState.current;
    if (ref === null || name !== ref.name || email !== ref.email) {
      refState.current = inputValue;
    }
    setWasEdition(!isEqual(refState.current, inputValue));
  }, [inputValue, name, email]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const cancelInput = (e: React.SyntheticEvent) => {
    if (refState.current === null) return;
    e.preventDefault();
    setInputValue(refState.current);
    setErr({
      name: false,
      email: false,
      password: false,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
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
              setError={setErr}
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
              setError={setErr}
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
              setError={setErr}
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
