import { FC, useState } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";
import PasswordInput from "../../components/generic/password-input/password-input";
import {
  hasEmptyInput,
  hasErrorInput,
  setErrInEmptyInput,
} from "../../utils/utils";
import { useDispatch, useSelector } from "../../hooks/reduxHooks";
import { login } from "../../services/thunks/requests";
import { useLocation, Navigate } from "react-router";
import { ErrorSetter, IAllInputs } from "../../types/common";

type TInputValue<T> = Required<Pick<IAllInputs<T>, "email" | "password">>;

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthorized, wasInitialAuth } = useSelector(
    (state) => state.userData
  );
  const isRequest = useSelector((state) => state.request.isRequest);

  const [inputValue, setInputValue] = useState<TInputValue<string>>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<TInputValue<boolean>>({
    email: false,
    password: false,
  });
  const setErr = setError as ErrorSetter;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (hasEmptyInput(inputValue)) {
      setErr((prev) => ({
        ...prev,
        ...setErrInEmptyInput(inputValue),
      }));
      return;
    }
    if (isRequest || hasErrorInput(error)) return;

    dispatch(login(inputValue));
  };

  if (isAuthorized) {
    return <Navigate to={location.state ? location.state?.from : "/"} />;
  } else if (!wasInitialAuth) {
    return <>{null}</>;
  }

  return (
    <Container>
      <Form btnName="Войти" title="Вход" onSubmit={handleSubmit}>
        <EmailInput
          onChange={onChange}
          value={inputValue.email}
          name={"email"}
          error={error.email}
          setError={setErr}
        />
        <PasswordInput
          onChange={onChange}
          value={inputValue.password}
          name={"password"}
          error={error.password}
          setError={setErr}
        />
      </Form>
      <ParagraphLink link="Зарегистрироваться" to="/register" mod="mb-4">
        Вы — новый пользователь?
      </ParagraphLink>
      <ParagraphLink link="Восстановить пароль" to="/forgot-password">
        Забыли пароль?
      </ParagraphLink>
    </Container>
  );
};

export default LoginPage;
