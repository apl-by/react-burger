import { useState, useRef } from "react";
import Container from "../../components/generic/container/container";
import Form from "../../components/generic/form/form";
import ParagraphLink from "../../components/generic/paragraph-link/paragraph-link";
import EmailInput from "../../components/generic/email-input/email-input";
import PasswordInput from "../../components/generic/password-input/password-input";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { findEmptyInput, findErrorInput } from "../../utils/utils";

const RegisterPage = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState({
    text: "",
    email: "",
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
  };

  return (
    <Container>
      <Form
        btnName="Зарегистрироваться"
        title="Регистрация"
        onSubmit={handleSubmit}
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={inputValue.text}
          name={"text"}
          ref={inputRef}
        />
        <EmailInput
          onChange={onChange}
          value={inputValue.email}
          name={"email"}
          setIsError={setIsError}
        />
        <PasswordInput
          onChange={onChange}
          value={inputValue.password}
          name={"password"}
          setIsError={setIsError}
        />
      </Form>
      <ParagraphLink link="Войти" to="/login">
        Уже зарегистрированы?
      </ParagraphLink>
    </Container>
  );
};

export default RegisterPage;
