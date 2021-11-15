import { useState, useRef } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PasswordInput from "../../components/generic/password-input/password-input";
import { findEmptyInput, findErrorInput } from "../../utils/utils";
import { apiRequests } from "../../utils/api-requests";

const ResetPasswordPage = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState({
    token: "",
    password: "",
  });
  const [isError, setIsError] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (findEmptyInput(inputValue) || findErrorInput(isError)) return;

    apiRequests
      .resetPassword(inputValue)
      .then((res) => {
        if (res.success) {
          alert("Пароль успешно изменён");
        } else {
          alert("Произошла ошибка");
        }
      })
      .catch((err) => console.log(err));
  };

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
          setIsError={setIsError}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={inputValue.token}
          name={"token"}
          ref={inputRef}
        />
      </Form>
      <ParagraphLink link="Войти" to="/login">
        Вспомнили пароль?
      </ParagraphLink>
    </Container>
  );
};

export default ResetPasswordPage;
