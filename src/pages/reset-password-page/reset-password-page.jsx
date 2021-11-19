import { useState } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import PasswordInput from "../../components/generic/password-input/password-input";
import TextInput from "../../components/generic/text-input/text-input";
import {
  hasEmptyInput,
  hasErrorInput,
  setErrInEmptyInput,
} from "../../utils/utils";
import { apiRequests } from "../../utils/api-requests";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

const ResetPasswordPage = () => {
  const location = useLocation();
  const { isAuthorized, wasInitialRequest } = useSelector(
    (state) => state.userData
  );
  const [inputValue, setInputValue] = useState({
    token: "",
    password: "",
  });
  const [error, setError] = useState({
    password: false,
    token: false,
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
      .resetPassword(inputValue)
      .then((res) => {
        if (res.success) {
          setInputValue({
            token: "",
            password: "",
          });
          alert("Пароль успешно изменён");
        } else {
          throw new Error("Произошла ошибка");
        }
      })
      .catch((err) => alert(`Error ${err.status ?? ""}: ${err.message}`))
      .finally(() => setWasSubmit(false));
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  } else if (location.state?.from !== "/reset-password") {
    return <Navigate to={"/forgot-password"} />;
  } else if (!wasInitialRequest) {
    return null;
  }

  return (
    <Container>
      <Form
        btnName="Сохранить"
        title="Восстановление пароля"
        onSubmit={handleSubmit}
      >
        <PasswordInput
          onChange={onChange}
          value={inputValue.password}
          name={"password"}
          placeholder={"Введите новый пароль"}
          error={error.password}
          setError={setError}
        />
        <TextInput
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={inputValue.token}
          name={"token"}
          error={error.token}
          setError={setError}
        />
      </Form>
      <ParagraphLink link="Войти" to="/login">
        Вспомнили пароль?
      </ParagraphLink>
    </Container>
  );
};

export default ResetPasswordPage;
