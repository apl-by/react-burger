import { useState } from "react";
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
import { apiRequests } from "../../utils/api-requests";
import { setCookie } from "../../utils/utils";
import { cookiesSettings } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/thunks/auth";
import { useLocation, Navigate } from "react-router";

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthorized, wasInitialRequest } = useSelector(
    (state) => state.userData
  );

  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: false, password: false });
  const [wasSubmit, setWasSubmit] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWasSubmit(true);
    if (hasEmptyInput(inputValue)) {
      setWasSubmit(false);
      setError((prev) => ({
        ...prev,
        ...setErrInEmptyInput(inputValue),
      }));
      return;
    }
    if (wasSubmit || hasErrorInput(error)) {
      return setWasSubmit(false);
    }

    apiRequests
      .login(inputValue)
      .then((res) => {
        if (res.success) {
          const { accessToken, refreshToken } = cookiesSettings;
          setCookie(
            accessToken.name,
            res.accessToken.replace("Bearer ", ""),
            accessToken.options
          );
          setCookie(refreshToken.name, res.refreshToken, refreshToken.options);
          dispatch(getUser());
        } else {
          throw new Error("Произошла ошибка");
        }
      })
      .catch((err) => alert(`Error ${err.status ?? ""}: ${err.message}`))
      .finally(() => setWasSubmit(false));
  };

  if (isAuthorized) {
    return <Navigate to={location.state ? location.state?.from : "/"} />;
  } else if (!wasInitialRequest) {
    return null;
  }

  return (
    <Container>
      <Form btnName="Войти" title="Вход" onSubmit={handleSubmit}>
        <EmailInput
          onChange={onChange}
          value={inputValue.email}
          name={"email"}
          error={error.email}
          setError={setError}
        />
        <PasswordInput
          onChange={onChange}
          value={inputValue.password}
          name={"password"}
          error={error.password}
          setError={setError}
        />
      </Form>
      <ParagraphLink link="Зарегистрироваться" to="/register" mod="mb-4">
        Вы — новый пользователь?
      </ParagraphLink>
      <ParagraphLink link="Восстановить пароль" to="/forgot-password">
        Забыли пароль?
      </ParagraphLink>
    </Container>
  );
};

export default LoginPage;
