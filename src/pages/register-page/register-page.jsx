import { useState } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";
import PasswordInput from "../../components/generic/password-input/password-input";
import TextInput from "../../components/generic/text-input/text-input";
import {
  hasEmptyInput,
  hasErrorInput,
  setErrInEmptyInput,
} from "../../utils/utils";
import { apiRequests } from "../../utils/api-requests";
import { setCookie } from "../../utils/utils";
import { cookiesSettings } from "../../utils/data";
import { getUser } from "../../services/thunks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthorized, wasInitialRequest } = useSelector(
    (state) => state.userData
  );

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
      .register(inputValue)
      .then((res) => {
        if (res.success) {
          const { accessToken, refreshToken } = cookiesSettings;
          setCookie(
            accessToken.name,
            res.accessToken.replace("Bearer ", ""),
            accessToken.options
          );
          setCookie(refreshToken.name, res.refreshToken, refreshToken.options);
          if (window.confirm("Вы успешно зарегистрировались! Войти?")) {
            dispatch(getUser());
          }
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
      <Form
        btnName="Зарегистрироваться"
        title="Регистрация"
        onSubmit={handleSubmit}
      >
        <TextInput
          onChange={onChange}
          value={inputValue.name}
          name={"name"}
          error={error.name}
          setError={setError}
        />
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
      <ParagraphLink link="Войти" to="/login">
        Уже зарегистрированы?
      </ParagraphLink>
    </Container>
  );
};

export default RegisterPage;
